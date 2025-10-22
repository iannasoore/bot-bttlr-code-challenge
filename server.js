import pkg from 'json-server'
import cors from 'cors'

const { create, router: _router, defaults } = pkg
const server = create()
const router = _router('db.json')
const middlewares = defaults()
const port = process.env.PORT || 3000

// Configure CORS specifically for your Netlify domain
server.use(cors({
  origin: ['https://phase2codechallenge.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

server.use(middlewares);
server.use(router);

server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server is running on port ${port}`);
});