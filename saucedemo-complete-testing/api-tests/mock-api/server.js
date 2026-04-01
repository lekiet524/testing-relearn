const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

//  AUTH
server.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username input" });
  }

  if (!password) {
    return res.status(400).json({ error: "Missing password input" });
  }

  const user = router.db.get('users')
    .find({ username, password })
    .value();

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (user.locked) {
    return res.status(403).json({ error: "User is locked" });
  }

  res.json({ token: user.token, user_id: user.id });
});

//Middleware check token
server.use('/api', (req, res, next) => {
  if (req.path === '/login') return next();

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

// PRODUCTS
server.get('/api/products', (req, res) => {
  res.json(router.db.get('products').value());
});

server.get('/api/products/:id', (req, res) => {
  const product = router.db.get('products')
    .find({ id: Number(req.params.id) })
    .value();

  if (!product) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(product);
});

// CART
server.post('/api/cart', (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || quantity <= 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const item = {
    id: Date.now(),
    product_id,
    quantity
  };

  router.db.get('cart').push(item).write();
  res.status(201).json(item);
});

server.get('/api/cart', (req, res) => {
  res.json(router.db.get('cart').value());
});

server.delete('/api/cart/:id', (req, res) => {
  router.db.get('cart')
    .remove({ id: Number(req.params.id) })
    .write();

  res.status(204).send();
});

// ORDERS
server.post('/api/orders', (req, res) => {
  const { first_name, last_name, postal_code } = req.body;

  if (!first_name || !last_name || !postal_code) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const order = {
    id: Date.now(),
    items: router.db.get('cart').value(),
    total: 100
  };

  router.db.get('orders').push(order).write();
  res.status(201).json(order);
});

server.get('/api/orders/:id', (req, res) => {
  const order = router.db.get('orders')
    .find({ id: Number(req.params.id) })
    .value();

  if (!order) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(order);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});