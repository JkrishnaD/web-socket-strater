"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const port = 8080;
app.get("/", (req, res) => {
    res.send("hello from express");
});
const httpServer = app.listen(port, () => {
    console.log("server is listening on", port);
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
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
