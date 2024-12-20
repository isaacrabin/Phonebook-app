// api/db.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // path to your db.json file
const middlewares = jsonServer.defaults();

// Set up middlewares (logging, CORS, etc.)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Use the router for the mock API
server.use('/api', router); // Your API will be accessible at /api
server.listen(3000, () => {
  console.log('JSON Server is running');
});
