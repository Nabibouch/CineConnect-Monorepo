// src/index.ts
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { setupWebSocket } from './ws/handler.js';
import ENV from './config/ENV.js';
import app from './app.js';

const server = createServer(app);
const wss = new WebSocketServer({ server });

setupWebSocket(wss);

const PORT = ENV.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});