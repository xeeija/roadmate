# Roadmate

<!-- ﻿<p align="center">
  <a href="#" rel="noopener"><img src="img/Roadmate_Logo.svg" alt="Roadmate logo" height=200></a>
</p>

<h1 align="center">Roadmate</h1> -->

## 📋 Table of Contents

<!--
- [📋 Table of Contents](#-table-of-contents)
- [🏁 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🎈 Usage](#-usage)
  - [Building the project](#building-the-project)
  - [Migrations](#migrations)
- [⛏️ Built Using](#️-built-using)
- [✍️ Authors](#️-authors)
-->

## 🏁 Getting Started<a name="getting-started"></a>

### Prerequisites

The following needs to be installed:

- Docker and WSL2
- IDE (Visual Studio, Visual Studio Code, or preferred IDE)
- NodeJS 20


### Installation

1. First, clone the project with

    ```
    git clone https://github.com/fhj-aim22/wherebear-backend.git
    ```

1. Run the docker-compose file, which will create a network with the API, a local Postgres database and DBeaver (Cloudbeaver) to access it.

    ```
    docker-compose up -d
    ```

#### Backend

Run the following commands in the `backend` directory.

1. Install the Dotnet Tools in the backend

    ```
    dotnet tool restore
    ```

    Alternatively, the EF Core CLI tools can be installed globally.

    ```bash
    # Alternative (not needed)
    dotnet tool install --global dotnet-ef
    ```

1. Connect to the database

    Connect either using Cloudbeaver, which should run on `localhost:8090` or with your preferred database editor.

1. Configure Cloudbeaver (optional)

    When Cloudbeaver is first started, create an admin account with your own username/password. Then add a Postgres
    connection with the following settings:

    - Host: `postgres`
    - Port: `5432`
    - Authentication: Database native, username and password see [docker-compose](docker-compose.yaml)
    - Enable "**Show all databases**"

    Test the connection and save it.

1. Migrations Setup

    Migrations are handled with the dotnet CLI. The EF Core tools are already installed in the root folder and can be used
    in all projects. Restore them with

    ```
    dotnet tool restore
    ```

    Alternatively, the EF Core CLI tools can be installed globally.

    ```bash
    # Alternative (not needed)
    dotnet tool install --global dotnet-ef
    ```

#### Frontend

Run the following commands in the `frontend` directory.

1. Install NPM packages

   ```
   npm install
   ```

2. Install the Ionic CLI tools

   ```
   npm install -g @ionic/cli
   ```

## 🎈 Usage<a name="usage"></a>

### Building the project

During development, the project can be built locally with hot reloading (automatically rebuild on changes).

```bash
cd backend/API
dotnet watch
```

```sh
cd frontend/
ionic serve
```

### Migrations

Migrations are stored in the `backend/DAL` project, so commands should be executed in that directory.
Migration names should be short and meaningful in PascalCase.

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

## ⛏️ Built Using<a name="built-using"></a>

The project is built with the following technologies:

**Frontend**
- [React](https://react.dev)
- [Ionic](https://ionicframework.com/)

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
