<p align="center"><a rel="noopener"><img src="./frontend/src/resources/logo/logo_roadmate.svg" alt="RoadMate Logo" height="144px"></a></p>

<!-- # RoadMate -->
<h1 align="center">RoadMate</h1>

[![frontend](https://github.com/xeeija/roadmate/actions/workflows/frontend.yaml/badge.svg)](https://github.com/xeeija/roadmate/actions/workflows/frontend.yaml)
[![backend](https://github.com/xeeija/roadmate/actions/workflows/backend.yaml/badge.svg)](https://github.com/xeeija/roadmate/actions/workflows/backend.yaml)

Gemeinsam Sicher Unterwegs.

Your best mate on the road! RoadMate is a companion for all bike lovers which informs you about potential dangers on your routes. With live notifications, a forum to ask your biking questions, saved routes and much more!

## 📋 Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Building the project](#building-the-project)
  - [Code Style](#code-style)
  - [Migrations](#migrations)
- [Deployment](#deployment)
  - [Build docker images](#build-docker-images)
  - [Deploy in production](#deploy-in-production)
- [Tech Stack](#️tech-stack)
- [Authors](#️authors)

## 🏁 Getting Started<a name="getting-started"></a>

### Prerequisites

The following needs to be installed:

- Docker and WSL2
- IDE (Visual Studio, Visual Studio Code, or preferred IDE)
- NodeJS 20


### Installation

1. First, clone the project with

    ```
    git clone https://github.com/xeeija/roadmate.git
    ```

2. Run the docker-compose file, which will create a network with the frontend, backend API and a local Postgres database (optionally with DBeaver (Cloudbeaver) to access it).

    ```
    docker-compose up -d
    ```

#### Backend

Run the following commands in the `backend` directory.

1. Install the Dotnet Tools in the backend

    ```
    dotnet tool restore
    ```

1. Connect to the database

    Connect either using your preferred database editor, or alternatively using Cloudbeaver (depending on the setup, it should run on `localhost:8978` or `localhost:8090`).

2. Configure Cloudbeaver (optional)

    When Cloudbeaver is first started, create an admin account with your own username/password. Then add a Postgres
    connection with the following settings:

    - Host: `postgres`
    - Port: `5432`
    - Authentication: Database native, username and password see [docker-compose](docker-compose.yaml)
    - Enable "**Show all databases**"

    Test the connection and save it.

3. Migrations Setup

    Migrations are handled with the dotnet CLI.
    The EF Core tools are already installed in the root folder and can be used in all projects.

    Apply all pending migrations to local database initially (run in `backend/DAL`):

    ```
    dotnet ef database update -s ..\API
    ```

    Alternatively, the EF Core CLI tools can be installed globally.

    ```bash
    # Alternative (not needed)
    dotnet tool install --global dotnet-ef
    ```

4. Secrets Setup

    Credentials like API keys are loaded from the config file `credentials.json` in the `backend/API` project.
    Copy the file `credentials.json.example` and name it `credentials.json`. Enter you API key for Geoapify.

#### Frontend

Run the following commands in the `frontend` directory.

1. Install npm packages

   ```
   npm install
   ```

2. Install the Ionic CLI tools

   ```
   npm install -g @ionic/cli
   ```

3. Copy the `.env.example` file and name it `.env`.

   By default, the backend runs on `localhost:5211`. If you run the backend in a container, make sure to update the URL to the exposed port of the container.

**For VS Code:**

4. Install the Prettier and ESLint extensions, either from workspace  recommendations or via the extensions tab in VS Code. Files should be autoformatted on save with the correct settings now.

**For WebStorm (and IntelliJ IDEs):**

4. Activate ESLint: Go to Languages & Frameworks > JavaScript > Code Quality Tools > ESLint, and select the Automatic ESLint configuration option.

5. Install the Prettier plugin from the marketplace.

## 💻 Usage<a name="usage"></a>

### Building the project

During development, the project can be built locally with hot reloading (automatically rebuild on changes).

```bash
cd backend/API
dotnet watch
```

```bash
cd frontend/
npm run dev
```

### Code Style

Code inspection, Linting and Tests run automatically on every push.
Pull requests should only be merged after review and successful pipelines.

#### Frontend

ESLint and Prettier are used for code style, linting and formatting. Prettier is formatting files automatically when `formatOnSave` is enabled and Prettier is set as formatter.

Run ESLint directly:
```bash
# Lint the complete project
npm run lint .

# Lint individual files or folders
# You can also pass multiple files/folders and wildcards
npm run lint Tab1.tsx Tab2.tsx src/pages/*
```

Run prettier directly and format specified files. Use `format:check` if you only want to check the style without formatting.
```bash
# Format the complete project
npm run format .

# format individual files or folders
# You can also pass multiple files/folders and wildcards
npm run format Tab1.tsx Tab2.tsx src/pages/*
```

#### Backend
Resharper is used for code style and linting.

Run code cleanup and format using the following command.
```bash
dotnet jb cleanupcode roadmate.sln --verbosity=WARN
```

Inspect code using the following command. You can change the severity with the `-e` flag.
```bash
dotnet jb inspectcode roadmate.sln -o=logs/inspect.xml -e=WARNING --verbosity=WARN
```

### Migrations

Migrations are stored in the `backend/DAL` project, so commands should be executed in that directory.
Migration names should be short and meaningful in PascalCase.
Make sure that dotnet is not running before working with migrations.

**Alwayys inspect the created migration before applying!**
eg. a column is dropped and recreated instead of renamed.

#### Create a new migration, without applying it

```
dotnet ef migrations add <MigrationName> -s ..\API
```

#### Apply pending migrations to local database

```
dotnet ef database update -s ..\API
```

This way of upating is suitable for development, but less so for running in production.

For additional information consult
the [Migration docs](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations).

## 🚀 Deployment<a name="deployment"></a>

In order to deploy the application, you will need a working Docker runtime (or something similar like Kubernetes).

The backend is published using the `dotnet publish` command of Dotnet. The frontend is bundled as a static build of Vite with `npm run build`.

### Build docker images

The frontend and backend images are built using the following commands (in the respective `frontend` or `backend` folder):

```
docker build -t xeeija/roadmate-frontend:<tag> .
docker build -t xeeija/roadmate-backend:<tag> .
```

Tags are in the format `MAJOR.MINOR.PATCH`, e.g. `1.0.2`.

### Deploy in production

RoadMate is deployed using Docker and consists of 3 containers:

  - Postgres container
  - Backend container
  - Frontend container

The frontend container is the only container that needs to be (and should be) visible externally. All requests to the frontend container that start with `/api/` are proxied to the backend using an nginx webserver (included in the frontend image). This is configurable in the [`nginx.conf`](./frontend/nginx.conf) file, and env of the backend, respectively.

For a reference of required configuration and environment variables, see [`docker-compose-prod.yaml`](./docker-compose-prod.yaml).


## ⛏️ Tech Stack<a name="tech-stack"></a>

The project is built with the following technologies:

**Frontend**
- [React](https://react.dev)
- [Ionic](https://ionicframework.com/)
- [Vite](https://vitejs.dev)

**Backend**
- [.Net Core](https://dotnet.microsoft.com/en-us/download)
- [PostgreSQL](https://www.postgresql.org/)

## ✍️ Authors<a name="authors"></a>

- [@MichaelKohlmeier](https://github.com/MichaelKohlmeier) - Michael Kohlmeier
- [@paulkunisch](https://github.com/paulkunisch) - Paul Kunisch
- [@xeeija](https://github.com/xeeija) - Bastian Lang
- [@Maggy-MM](https://github.com/Maggy-MM) - Magdalena Mandl
- [@felix-sailer](https://github.com/felix-sailer) - Felix Sailer
- [@DavidSeb2020](https://github.com/DavidSeb2020) - David Sebernegg
