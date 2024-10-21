import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello from express");
});
const httpServer = app.listen(port, () => {
  console.log("server is listening on", port);
});

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log("user count", ++userCount);
  ws.send("Hello! Message From Server!!");
});
