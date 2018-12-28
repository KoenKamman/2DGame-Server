import * as WebSocket from 'ws';
import { Game } from './game';
import { Player } from './entities/player';
import { config } from './config';
import { SnapshotMessage, MessageType, DisconnectMessage, ConnectMessage, ServerInfoMessage } from './message';

// Create websocket server
const wss = new WebSocket.Server({
    port: config.port
});

// Create game instance
const game = new Game({ tickRate: config.tickrate });

// Send snapshots to all connected clients
setInterval(() => {
    let message: SnapshotMessage = { type: MessageType.SNAPSHOT, data: game.snapshot() }
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}, 1000 / config.snapshotRate);

// Websocket connection
let clientCount = 0;
wss.on('connection', (ws) => {

    // Register new player
    clientCount++;
    let clientId = clientCount;
    let newPlayer = new Player(clientId);
    game.players.push(newPlayer);

    // Send message back with server info
    let infoMessage: ServerInfoMessage = {
        type: MessageType.SERVER_INFO,
        data: {
            players: game.players.filter(player => player.id !== clientId),
            player: newPlayer,
            snapshotRate: config.snapshotRate
        }
    };
    ws.send(JSON.stringify(infoMessage));

    // Let other players know someone joined
    let connectMessage: ConnectMessage = { type: MessageType.CONNECT, data: newPlayer }
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(connectMessage));
        }
    });

    // Handle user input
    ws.onmessage = (message) => {
        if (message.data && message.data !== "undefined") {
            let data = JSON.parse(message.data.toString());
            let player = game.players.find(player => player.id == clientId);
            if (player) {
                player.rotation = Math.atan2(data.y - player.y, data.x - player.x);
            }
        }
    };

    // Remove player on disconnect
    ws.on('close', () => {
        let player = game.players.find(player => player.id === clientId);
        if (!player) return;

        game.players = game.players.filter(player => player.id !== clientId);
        let message: DisconnectMessage = { type: MessageType.DISCONNECT, data: player }
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });
});