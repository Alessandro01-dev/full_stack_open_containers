# Full Stack Open - Part 12: Containers

This repository contains my solutions for **Part 12** of the Full Stack Open course from the University of Helsinki.

### 🛠️ Projects & Exercises:

- **[todo-app](./todo-app)**
  _The course-provided todo application, containerized for both development (hot-reload via bind mounts, Nginx reverse proxy) and production (multi-stage builds, GitHub Actions CI running Playwright end-to-end tests)._

- **[library-app](./library-app)**
  _A containerized development and production environment (frontend + backend + Nginx reverse proxy) for the GraphQL library application built in Part 8._

---

_Built with Docker, Docker Compose, Nginx, Node.js, Express, MongoDB, Redis, React, Vite, and Playwright._

---

### ⚠️ Note on the library-app exercise:

The `library-app` exercise containerizes an existing full stack application built during Part 8 of the course. The original source code lives in my main course repository:

[full_stack_open - Part 8: GraphQL](https://github.com/Alessandro01-dev/full_stack_open/tree/main/part_08/fs-graphql)
