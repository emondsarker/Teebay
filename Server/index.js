const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { PrismaClient } = require('@prisma/client');
// const dotenv = require('dotenv');
const cors = require('cors');

// dotenv.config();

const prisma = new PrismaClient();

const schema = buildSchema(`
type Query {
  loginUser(email: String!, password: String!): User
  products: [Product]
}

type Mutation {
  signUpUser(firstName: String!, lastName: String!, email: String!, address: String!, phone: String!, password: String!, activation: Boolean!): User
  createProduct(title: String!, categoryId: Int!, price: Float!, rent: Float!, rentInterval: String!, ownerId: Int!): Product
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  address: String!
  phone: String!
  password: String!
  activation: Boolean!
  createdAt: String!
  updatedAt: String!
}

type Product {
  id: ID!
  title: String!
  categories: [Category!]!
  price: Float!
  rent: Float!
  rentInterval: String!
  productId: String!
  isDeleted: Boolean!
  createdAt: String!
  updatedAt: String!
  ownerId: Int!
  owner: User!
}

type Category {
  id: ID!
  name: String!
}
`);

const root = {
  signUpUser: async (args) => {
    const newUser = await prisma.user.create({
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        address: args.address,
        phone: args.phone,
        password: args.password,
        activation: args.activation,
      },
    });
    return newUser;
  },
  loginUser: async (args) => {
    const user = await prisma.user.findUnique({ where: { email: args.email } });

    if (!user) {
      throw new Error('User not found');
    }

    // use bcrypt in a real application
    if (user.password !== args.password) {
      throw new Error('Invalid password');
    }

    return user;
  },
  createProduct: async (args) => {
    const newProduct = await prisma.product.create({
      data: {
        title: args.title,
        price: args.price,
        rent: args.rent,
        rentInterval: args.rentInterval,
        ownerId: args.ownerId,
        categories: {
          connect: { id: args.categoryId },
        },
      },
      include: {
        categories: true,
        owner: true,
      },
    });
    return newProduct;
  },
  products: async () => {
    const products = await prisma.product.findMany({
      where: { isDeleted: false },
      include: {
        categories: true,
        owner: true,
      },
    });
    return products;
  },
};

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));



async function main() {
  // const user = await prisma.user.deleteMany();
  // console.log(user)
  console.log(await prisma.user.findMany())

}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
