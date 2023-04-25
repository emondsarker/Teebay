# Teebay - An online marketplace

Teebay is a full-stack web-app. The repository is divided into two folders: `ClientApp` and `Server`. The `ClientApp` folder contains a Next.js project, while the `Server` folder contains an Express.js, Prisma, and GraphQL project. The documentation for Teebay is available in `Documentation.md`

## Table of Contents


- [Teebay - An online marketplace](#teebay---an-online-marketplace)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installing Dependencies](#installing-dependencies)
  - [Connecting Database](#connecting-database)
  - [Running the App and Server](#running-the-app-and-server)

## Prerequisites

Before you begin, please ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional)
- [PostgreSQL](https://www.postgresql.org/)

## Cloning the Repository

First, you need to clone the repository from GitHub. To do this, open your terminal or command prompt and run the following command:

```
git clone https://github.com/emondsarker/Teebay.git
```

## Installing Dependencies

Now, you need to install the dependencies for both `ClientApp` and `Server`.

Navigate to the `ClientApp` folder and run the command:
```
npm install
```
or
```
yarn
```

Navigate to the `Server` folder and run the command:
```
npm install
```
or
```
yarn
```

## Connecting Database

Install PostgreSQL in your machine and create a server. Afterwards navigate to `/Server/prisma/schema.prisma` and provide the server url. Create a `.env` file in the `/Server` folder and enter your URL. (Below is a dummy URL)
```
DATABASE_URL="postgresql://postgres:stuff@localhost:5432/Teebay?schema=public"
```
This will be read by the `schema.prisma` file
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

After the database is connected, you need to migrate the Prisma ORM model by running

```
npx prisma migrate dev
```


## Running the App and Server

To run the Next.js app, navigate to `ClientApp` and run the command
```
npm run dev
```

To start the server, navigate to `Server` and run the command
```
node index.js
```