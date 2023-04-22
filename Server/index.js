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
  createProduct(input: ProductInput!): Product!
  addProduct(title: String!, description: String!, categories: [CategoryInput!]!, price: Float!, rent: Float!, rentInterval: String!, isDeleted: Boolean!, ownerId: String!): Product
}

input ProductInput {
  title: String!
  description: String!
  categories: [ID!]!
  price: Float!
  rent: Float!
  rentInterval: String!
  ownerId: String!
}

input CategoryInput {
  id: ID!
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
  products:   [Product]
  purchases:  [Purchase]
  rentals:    [Rental]
}

type Product {
  id: ID!
  title: String!
  description: String!
  categories: [Category]
  price: Float!
  rent: Float!
  rentInterval: String!
  isDeleted: Boolean!
  createdAt: String!
  updatedAt: String!
  ownerId: ID!
  owner: User!
  purchases: [Purchase]
  rentals: [Rental]
}

type Category {
  id: ID!
  name: String!
  Product: Product
  productId: ID
}


type Purchase {
  id: ID!
  userId: ID!
  user: User!
  productId: ID!
  product: Product!
  createdAt: String!
}

type Rental {
  id: ID!
  userId: ID!
  user: User!
  productId: ID!
  product: Product!
  startDate: String!
  endDate: String!
  createdAt: String!
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
  addProduct: async (args) => {
    // console.log(args)
    let arr = []
    for (i = 0; i < args.categories.length; i++) {
      arr.push(parseInt(args.categories[i].id))
    }
    console.log(arr)
    const newProduct = await prisma.product.create({
      data: {
        title: args.title,
        description: args.description,
        categories: {
          connect: arr.map((categoryId) => ({ id: categoryId })),
        },
        price: args.price,
        rent: args.rent,
        rentInterval: args.rentInterval,
        isDeleted: args.isDeleted,
        ownerId: args.ownerId
      },
    });
    return newProduct;
  },
  createProduct: async (_, { input }, { prisma }) => {
    const { title, categories, price, rent, rentInterval, productId, ownerId } = input;

    const createdProduct = await prisma.product.create({
      data: {
        title,
        price,
        rent,
        rentInterval,
        productId,
        ownerId,
        categories: {
          connect: categories.map((categoryId) => ({ id: categoryId })),
        },
      },
      include: {
        categories: true,
        owner: true,
        purchases: true,
        rentals: true,
      },
    });

    return createdProduct;
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
  // console.log(await prisma.user.findMany())
  // console.log(await prisma.category.createMany({
  //   data: [
  //     { name: "Electronics" },
  //     { name: "FURNITURE" },
  //     { name: "HOME APPLIANCES" },
  //     { name: "SPORTING GOODS" },
  //     { name: "OUTDOOR" },
  //     { name: "TOYS" }
  //   ],
  //   skipDuplicates: true
  // }))
  // console.log(await prisma.category.findMany())

  let testProduct = {
    title: "test",
    description: "test description",
    categories: [1, 2],
    price: 10,
    rent: 20,
    rentInterval: 'daily',
    isDeleted: false,
    ownerId: "a119942a-a419-4c34-80e9-0194a6636a1c"
  }

  // console.log(await prisma.product.create({
  //   data: {
  //     title: testProduct.title,
  //     description: testProduct.description,
  //     categories: {
  //       connect: testProduct.categories.map((categoryId) => ({ id: categoryId })),
  //     },
  //     price: testProduct.price,
  //     rent: testProduct.rent,
  //     rentInterval: testProduct.rentInterval,
  //     isDeleted: testProduct.isDeleted,
  //     ownerId: testProduct.ownerId
  //   }
  // }))
  console.log(await prisma.product.findMany())
  console.log(await prisma.category.findMany())
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })