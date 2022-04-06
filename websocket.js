const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

const clients = new Map();

   // On new connection
wss.on('connection', (ws) => {
    const id = uuidv4();
    const data = "Welcome to the chat!";
    let metadata = { id, data };

    clients.set(ws, metadata);

    // Triggered when a client send message to the server
    ws.on('message', (messageAsString) => {
      console.log('received: %s', messageAsString);
      const message = JSON.parse(messageAsString.toString());
      console.log(message);
      metadata = clients.get(ws);
  
      message.sender = metadata.id;
      message.data = metadata.data;
      const outbound = JSON.stringify(message);
  
      [...clients.keys()].forEach((client) => {
          client.send(outbound);
        });
    });

    // Wnen a client disconnects
    ws.on("close", () => {
      clients.delete(ws);
    });
});

// Required Functions
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
console.log("wss up");