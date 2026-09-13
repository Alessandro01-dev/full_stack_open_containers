FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_GRAPHQL_HTTP_URL=http://localhost:8080/api/graphql
ENV VITE_GRAPHQL_WS_URL=ws://localhost:8080/api/graphql

RUN npm ci

RUN npm run build

FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
