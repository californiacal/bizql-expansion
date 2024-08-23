const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const sql = require('mssql');

// Define your GraphQL schema
const typeDefs = gql`
  type Item {
    ItemNo: String
    State: String
    Price: Float
    Count: Int
    Total: Float
  }

  type Query {
    getItemsFromTexas: [Item]
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    getItemsFromTexas: async () => {
      try {
        // Establish a connection to the SQL Server
        const pool = await sql.connect({
          user: 'Sam',
          password: 'figuri',
          server: 'localhost', // e.g., 'localhost' or 'your-server.database.windows.net'
          database: 'Sales',
          options: {
            encrypt: true, // Set to true if you're using Azure SQL, otherwise false
            trustServerCertificate: true, // Set to true if using self-signed certificates
          },
          port: 1433 // Default port
        });

        // Execute the query
        const result = await pool.request().query(`
          SELECT 
            s.ItemNo,
            [State],
            [Price],
            CAST(ROUND(SUM(Total)/ISNULL(NULLIF(SUM(Price), 0.00), 0.0001), 0) AS INT) AS [Count],
            SUM(Total) AS Total
          FROM Sales s
          JOIN ItemPrices p ON p.ItemNo = s.ItemNo
          WHERE [State] = 'TX'
          GROUP BY s.ItemNo, [State], [Price]
          ORDER BY SUM(Total) DESC, 
                   CAST(ROUND(SUM(Total)/ISNULL(NULLIF(SUM(Price), 0.00), 0.0001), 0) AS INT) DESC
        `);

        // Return the result set
        return result.recordset;

      } catch (err) {
        console.error('SQL error', err);
        throw new Error('Failed to fetch data from SQL Server');
      }
    },
  },
};

// Start the Apollo Server
const startServer = async () => {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();