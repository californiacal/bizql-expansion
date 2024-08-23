// // resolvers.js
// const sql = require('mssql');

// const config = {
//     server: 'localhost\\SQLEXPRESS',
//     database: 'SalesPortaldb',
//     options: {
//         encrypt: false, // Set to true if using SSL/TLS
//         trustServerCertificate: true
//     },
//     authentication: {
//         type: 'default' // Use default authentication for Windows Auth
//     }
// };

// sql.connect(config)
//     .then(pool => {
//         if (pool.connected) {
//             console.log('Connected to SQL Server');
//         }
//     })
//     .catch(err => {
//         console.error('Connection failed:', err);
//     });

//   const resolvers = {
//     Query: {
//         sales: async () => {
//             try {
//                 await sql.connect(config);
//                 const result = await sql.query('SELECT * FROM Sales');
//                 return result.recordset;
//             } catch (err) {
//                 console.error('Error fetching sales:', err);
//                 throw new Error('Failed to fetch sales');
//             }
//         },
//         sale: async (_, { ItemNo }) => {
//             try {
//                 await sql.connect(config);
//                 const result = await sql.query`SELECT * FROM Sales WHERE ItemNo = ${ItemNo}`;
//                 return result.recordset[0];
//             } catch (err) {
//                 console.error('Error fetching sale:', err);
//                 throw new Error('Failed to fetch sale');
//             }
//         },
//     },
//     Mutation: {
//         addSale: async (_, { ItemNo, Date, State, Total }) => {
//             try {
//                 await sql.connect(config);
//                 const result = await sql.query`INSERT INTO Sales (ItemNo, Date, State, Total) VALUES (${ItemNo}, ${Date}, ${State}, ${Total}); SELECT * FROM Sales WHERE ItemNo = ${ItemNo}`;
//                 return result.recordset[0];
//             } catch (err) {
//                 console.error('Error adding sale:', err);
//                 throw new Error('Failed to add sale');
//             }
//         },
//         updateSale: async (_, { ItemNo, Date, State, Total }) => {
//             try {
//                 await sql.connect(config);
//                 const updateQuery = `
//                     UPDATE Sales
//                     SET Date = ${Date || 'Date'},
//                         State = ${State || 'State'},
//                         Total = ${Total || 'Total'}
//                     WHERE ItemNo = ${ItemNo};
//                     SELECT * FROM Sales WHERE ItemNo = ${ItemNo}`;
//                 const result = await sql.query(updateQuery);
//                 return result.recordset[0];
//             } catch (err) {
//                 console.error('Error updating sale:', err);
//                 throw new Error('Failed to update sale');
//             }
//         },
//         deleteSale: async (_, { ItemNo }) => {
//             try {
//                 await sql.connect(config);
//                 const result = await sql.query`SELECT * FROM Sales WHERE ItemNo = ${ItemNo}; DELETE FROM Sales WHERE ItemNo = ${ItemNo}`;
//                 return result.recordset[0];
//             } catch (err) {
//                 console.error('Error deleting sale:', err);
//                 throw new Error('Failed to delete sale');
//             }
//         },
//     },
// };


// module.exports = resolvers;