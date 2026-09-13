# Full Stack Open - Part 12: Containers

This repository contains my solutions for **Part 12** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is Docker: containerizing a Node/Express backend and a React frontend, orchestrating multi-service environments with Docker Compose, setting up an Nginx reverse proxy, and building both development (hot-reload) and production configurations, including an automated CI pipeline running end-to-end tests against the production build.

### 📚 Learning Objectives:

- **Introduction to Containers**: Understanding what containers and images are, and running/inspecting containers with the Docker CLI.
- **Building and configuring environments**: Writing Dockerfiles, using Docker Compose to orchestrate a Node backend alongside MongoDB and Redis, and persisting data with volumes.
- **Basics of Container Orchestration**: Containerizing a React frontend with multi-stage builds, running tests during the image build, setting up a full development environment (frontend + backend + Nginx reverse proxy) with hot-reload via bind mounts, and building a production `docker-compose.yml` with optimized images and a single Nginx entry point.

### 🛠️ Projects & Exercises:

- **[todo-app](./todo-app)**
  _The course-provided todo application (Express + MongoDB + Redis backend, React + Vite frontend), used to work through every exercise in the part._
  - **Backend**: _Containerized with both a production `Dockerfile` and a `dev.Dockerfile` (hot-reload via `nodemon` and a bind mount). Added a `/statistics` endpoint backed by Redis to count created todos._
  - **Frontend**: _Containerized with a multi-stage production `Dockerfile` (Vite build served by Nginx, with tests run during the build) and a `dev.Dockerfile` for local development._
  - **Reverse proxy**: _Nginx configured to serve the frontend and proxy `/api` requests to the backend, both in development (`nginx.dev.conf`) and production (`nginx.conf`), with no ports exposed on the host other than Nginx's._
  - **CI**: _A GitHub Actions workflow (`.github/workflows/e2e-tests.yml`) builds the production images, starts the stack with Docker Compose, and runs the Playwright suite from `todo-tests` against it._

- **[library-app](./library-app)**
  _A containerized development environment (frontend + backend + Nginx reverse proxy) for the GraphQL library application built in Part 8, applying the same patterns learned in this part to a different stack (Apollo Server/Client, WebSocket subscriptions, MongoDB Atlas)._

---

_Built with Docker, Docker Compose, Nginx, Node.js, Express, MongoDB, Redis, React, Vite, and Playwright._

---

### ⚠️ Note on the library-app exercise:

The `library-app` exercise containerizes the development environment of an existing full stack application built during Part 8 of the course. The original source code lives in my main course repository:

[full_stack_open - Part 8: GraphQL](https://github.com/Alessandro01-dev/full_stack_open/tree/main/part_08/fs-graphql)
