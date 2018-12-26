import * as WebSocket from 'ws';
import { Game } from './game';
import { Player } from './player';
import { config } from './config';

// Create websocket server
const wss = new WebSocket.Server({
    port: 8080
});

// Create game instance
const game = new Game({ tickRate: config.tickrate });

// Send snapshots to all connected clients
setInterval(() => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(game.snapshot));
        }
    });
}, config.snapshotInterval);

// Websocket connection
let clientCount = 0;
wss.on('connection', (ws) => {

    // Register new player
    clientCount++;
    let clientId = clientCount;
    game.players.push(new Player(clientId));

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
        game.players = game.players.filter(player => player.id !== clientId);
    });
});