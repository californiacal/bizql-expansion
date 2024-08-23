// const { gql } = require('apollo-server');

// const typeDefs = gql`
//   type Query {
//     sales: [Sale]
//     sale(ItemNo: ID!): Sale
//     products: [Product]
//     product(id: ID!): Product
//   }

//   type Mutation {
//     addSale(ItemNo: ID!, Date: String!, State: String!, Total: Float!): Sale
//     updateSale(ItemNo: ID!, Date: String, State: String, Total: Float): Sale
//     deleteSale(ItemNo: ID!): Sale
//     signup(username: String!, email: String!, password: String!): AuthPayload
//     login(email: String!, password: String!): AuthPayload
//   }

//   type Sale {
//     ItemNo: ID
//     Date: String
//     State: String
//     Total: Float
//   }

//   type Product {
//     id: ID
//     name: String
//     price: Float
//   }

//   input ProductInput {
//     name: String
//     price: Float
//   }

//   type User {
//     id: ID
//     username: String
//     email: String
//   }

//   type AuthPayload {
//     token: String
//     user: User
//   }
// `;

// module.exports = typeDefs;

