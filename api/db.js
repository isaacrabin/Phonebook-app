const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your JSON data file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router); // Prefix all routes with /api
server.listen(3000, () => {
  console.log('JSON Server is running');
});
