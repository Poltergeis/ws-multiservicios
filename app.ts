import amqplib from "amqplib";
import http from "http";
import dotenv from "dotenv";
import signale from "signale";

import { WebSocketsSetup } from "./WebSocketsSetup";

dotenv.config();

const server = http.createServer();

const wss = new WebSocketsSetup(server);
wss.start();

const PORT = process.env.PORT;

server.listen(8080, function () {
    signale.success('api websockets encendida'); 
});