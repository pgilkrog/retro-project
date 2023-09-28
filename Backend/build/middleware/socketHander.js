"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = void 0;
var socket_io_1 = require("socket.io");
var onlineUsers = [];
function setupSocketIO(httpServer, app) {
    var _this = this;
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.APP_URL,
            methods: ['GET', 'POST', 'PUT'],
        },
    });
    io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            socket.on('authendicate', handleAuthendication(socket));
            socket.on('joinRoom', handleJoinRoom(socket, io));
            socket.on('chatMessage', handleChatMessage(socket, io));
            socket.on('chatDisconnect', handleDisconnect(socket));
            return [2 /*return*/];
        });
    }); });
    // API endpoint to get the list of online users
    app.get('/api/online-users', function (req, res) {
        var onlineUserEmails = onlineUsers.map(function (user) { return user.email; });
        res.json(onlineUserEmails);
    });
}
exports.setupSocketIO = setupSocketIO;
var handleAuthendication = function (socket) { return function (email) {
    // Create a user object with socketid and email
    var userInfo = {
        email: email,
        socketId: socket.id
    };
    // Check if the user is already in the onlineUsers array
    var userIndex = onlineUsers.find(function (user) { return user.email === email; });
    if (!userIndex) {
        // If user does not already exist add it to the array
        onlineUsers.push(userInfo);
        // Emit that the specified user is online
        socket.broadcast.emit('userOnline', onlineUsers.map(function (user) { return user.email; }));
    }
}; };
var handleJoinRoom = function (socket, io) { return function (roomUsers) {
    // check the array of users online from roomUsers
    var usersOnline = roomUsers.every(function (user) { return onlineUsers.some(function (onlineUser) { return onlineUser.email === user; }); });
    // If usersOnline is not undefined or null
    if (usersOnline) {
        // create the room for the two users 
        socket.join(roomUsers.join('-'));
        io.to(roomUsers.join('-')).emit('chatMessage', {
            id: -1,
            text: "Room created with ".concat(roomUsers.join(' and ')),
            sender: 'System',
        });
    }
}; };
var handleChatMessage = function (socket, io) { return function (data) {
    // Get the roomName from the data
    var roomName = data.roomName;
    if (data !== undefined)
        // emit the chat message to the users inside the given roomName
        io.to(roomName.join('-')).emit('chatMessage', data);
}; };
var handleDisconnect = function (socket) { return function (email) {
    // Get the index of 
    console.log("DISCONNECT HIT");
    var userIndex = onlineUsers.findIndex(function (user) { return user.email === email; });
    console.log(userIndex);
    if (userIndex !== -1) {
        var disconnectedUser = onlineUsers[userIndex];
        onlineUsers.splice(userIndex, 1);
        socket.broadcast.emit('userOffline', disconnectedUser.email);
    }
}; };
