import ws, { WebSocketServer } from "ws";
import http from "http";
import signale from "signale";
import MailerService from "./mailerService";

export class WebSocketsSetup {
    private wss: WebSocketServer;
    private sockets: MySocket[];
    private mailerService = new MailerService();
    
    constructor(server:http.Server) {
        this.wss = new WebSocketServer({ server });
        this.sockets = [];
    }
    
    public getSockets() {
        return this.sockets;
    }

    public start() {
        signale.info('inicializando servidor de websockets');
        this.wss.on('connection', (socket: MySocket) => {
            this.sockets.push(socket);
            signale.info('nuevo usuario de websockets conectado ' + socket);

            socket.on('message', (event) => {
                const data = JSON.parse(event.toString());
                switch (data.eventName) {
                    case "example":
                        signale.info('funcion de ejemplo');
                        break;
                    case "setBridge":
                        socket.idUsuario = data.idUsuario;
                        socket.idPerro = data.idPerro;
                        break;
                    case "SensorData":
                        this.sockets.forEach((client) => {
                            if (data.idUsuario === client.idUsuario) {
                                data['fechaRegistro'] = new Date().toLocaleDateString("es-ES", {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: '2-digit'
                                });
                                client.send(JSON.stringify(data));
                                return;
                            }
                        });    
                        break;
                }
            });

            socket.on('close', (code, listener) => {
                signale.info(`sesion del usuario: ${socket.idUsuario} terminada. ${code}`);
                this.sockets = this.sockets.filter(s => s.idUsuario !== socket.idUsuario);
            });

            socket.on('error', (err: Error) => {
                signale.error(`ha ocurrido un error con el usuario ${socket.idUsuario}, cerrando la conexion`);
                socket.close(500);
                this.sockets = this.sockets.filter(s => s.idUsuario !== socket.idUsuario);
            });
        });
    }
}

export interface MySocket extends ws.WebSocket {
    idUsuario: string;
    idPerro: string;
}