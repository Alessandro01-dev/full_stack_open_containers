const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");

const express = require("express");
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const JWT_SECRET = process.env.JWT_SECRET;

const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        let currentUser = null;
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.startsWith("Bearer ")) {
          try {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            currentUser = await User.findById(decodedToken.id);
          } catch (error) {}
        }

        return { currentUser };
      },
    }),
  );

  httpServer.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
};

module.exports = startServer;
