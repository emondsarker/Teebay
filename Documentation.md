# Teebay Technical Documentation

## Table of Contents

- [Teebay Technical Documentation](#teebay-technical-documentation)
  - [Table of Contents](#table-of-contents)
  - [1. Overview](#1-overview)
  - [2. System Architecture](#2-system-architecture)
  - [3. Frontend](#3-frontend)
    - [3.1 User Interface Design \& Routing](#31-user-interface-design--routing)
    - [3.2 Next.js Components](#32-nextjs-components)
    - [3.3 MUI (Material-UI) Integration](#33-mui-material-ui-integration)
  - [4. Backend](#4-backend)
    - [4.1 Express.js](#41-expressjs)
    - [4.2 PostgreSQL Database](#42-postgresql-database)
    - [4.3 Prisma ORM](#43-prisma-orm)
    - [4.4 GraphQL API](#44-graphql-api)
  - [5. Deployment](#5-deployment)
  - [6. Testing](#6-testing)
  - [7. Known Issues](#7-known-issues)
  - [8. Future Work](#8-future-work)

## 1. Overview

This document provides technical details for the Teebay. A full-stack web-app which is designed to allow users to manage products, purchases, and rentals. The frontend is built using Next.js and MUI (Material-UI), while the backend uses GraphQL, Prisma ORM, PostgreSQL, and Express.js.

## 2. System Architecture

The system follows a three-tier architecture, including:

1. Client Tier: Next.js web application.
2. Server Tier: GraphQL with Express.js.
3. Data Tier: PostgreSQL database.

## 3. Frontend

### 3.1 User Interface Design & Routing

The web app has the following main sections:

1. User Sign Up `/sign-up`
2. User Sign In `/sign-in`
3. All-Products `/all-products`
4. My-Products `/my-products`
5. Transaction
   - Bought `/transaction?category=bought`
   - Sold `/transaction?category=sold`
   - Borrowed `/transaction?category=borrowed`
   - Lent `/transaction?category=lent`
6. Product (Detailed View) `/product/[id]/`
7. My Product (Detailed View) `/my-product/[id]/`
8. Add product `/add-product?step=...`

### 3.2 Next.js Components

The web app uses functional components with React hooks. The main components include:

1. `_app`: The main entry point of the application.
2. `MyProductCard`: Used to display user's products listing. On-click leads to `/my-product/[id]/`where user can update info. Has a delete functionality.
3. `ProductCard`: Used to display products available for purchase/rent. On-click leads to `product/[id]` where user can purchase/rent product.
4. `navbar`: Handles and indicates navigation. Allows user to see their info and log-out.

### 3.3 MUI (Material-UI) Integration

MUI (Material-UI) is used as the primary UI framework to implement a consistent, responsive, and accessible design across the application. The main components used include. Material-Icons is the primary icon library used. No themes were created. Slight visual changes were implemented using `sx={{ ... }}` prop.

## 4. Backend

### 4.1 Express.js

Express.js is used as the server framework for hosting the GraphQL API.

### 4.2 PostgreSQL Database

The PostgreSQL database has the following tables:

1. `User`: Stores user data.
2. `Product`: Stores product data.
3. `Category`: Stores category data.
4. `Purchase`: Stores purchase data.
5. `Rental`: Stores rental data.

### 4.3 Prisma ORM

Prisma ORM is used to interact with the PostgreSQL database. The Prisma schema file defines the following models- shown along with the fields:

1. **User**
   - id (id, uuid)
   - firstName
   - lastName
   - email (unique)
   - address
   - phone
   - password
   - activation
   - createdAt
   - updatedAt
   - products (relation)
   - purchases (relation)
   - rentals (relation)
2. **Product**
   - id (id, uuid)
   - title
   - description
   - categories
   - price
   - rent
   - rentInterval
   - isDeleted
   - createdAt
   - updatedAt
   - ownerId 
   - owner (relation)
   - purchases (relation)
   - rentals (relation)
3. **Category**
   - id (id, auto-increment)
   - name
   - ProductId
   - Product (relation)
4. `**Purchase**
   - id (id, uuid)
   - userId
   - user (relation)
   - productId
   - product (relation)
   - createdAt
5. **Rental**
   - id (id, uuid)
   - userId
   - user (relation)
   - productId
   - product (relation)
   - startDate
   - endDate
   - createdAt

### 4.4 GraphQL API

The backend exposes a GraphQL API with the following **Queries**:

| Query                   | Explanation                                             | Input           | Output             |
| ----------------------- | ------------------------------------------------------- | --------------- | ------------------ |
| loginUser               | Handles user log-in/sign-in                             | email, password | Auth Token         |
| product                 | Returns all products available                          | -               | List of products   |
| products                | Returns all products available for the user to buy/rent | -               | List of products   |
| myProducts              | Returns products owned by user                          | user id         | List of products   |
| categories              | Returns all categories                                  | -               | List of categories |
| productsPurchasedByUser | Fetches purchase transaction data                       | user id         | List of products   |
| productsSoldByUser      | Fetches sold transaction data                           | user id         | List of products   |
| productsRentedByUser    | Fetches rented transaction data                         | user id         | List of products   |
| productsLentByUser      | Fetches lent transaction data                           | user id         | List of products   |

And the following **Mutations**:

| Mutation      | Explanation                            | Input                        | Output       |
| ------------- | -------------------------------------- | ---------------------------- | ------------ |
| signUpUser    | Adds a user who has signed up          | user info                    | confirmation |
| createProduct | Adds a new product to database         | product info                 | confirmation |
| addProduct    | Not used                               | N/A                          | N/A          |
| updateProduct | Updates existing product               | new product info and user id | confirmation |
| deleteProduct | hides product that was deleted by user | user id and product id       | confirmation |
| buyProduct    | assigns bought product to user         | user id and product id       | confirmation |
| rentProduct   | assigns rented product to user         | user id and product id       | confirmation |


## 5. Deployment

The web app is deployed in localhost. For production it should be containerized using Docker.

## 6. Testing

Unit tests and integration tests should be implemented using Jest. 

End-to-end tests should be implemented using Cypress.

## 7. Known Issues

- User authentication is string-matching. This is unsafe. Use bcrypt and JWT with secret keys to improve security
- Server-side validation is missing. Currently validation is implemented on front-end only. Which is a security and business risk.
- Rent duration has multiple issues. Rent duration can overlap. If monthly payment selected, user needs to rent for at least a month but it is not enforced.
- InMemoryCache not utilized. Needs a persistent cache implementation.

## 8. Future Work

Some potential areas for future work include:

1. Implementing additional features, such as advanced filtering and sorting options for products, purchases,
