import { WebSocketServer } from 'ws'; // yarn add ws
// import ws from 'ws'; yarn add ws@7
// const WebSocketServer = ws.Server;
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './schema';
 
const server = new WebSocketServer({
  port: 4000,
  path: '/graphql',
});
 
useServer({ schema }, server);
 
console.log('Listening to port 4000');