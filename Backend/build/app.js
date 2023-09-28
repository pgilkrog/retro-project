"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var db_1 = require("./config/db");
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var http = __importStar(require("http"));
var socketHander_1 = require("./middleware/socketHander");
// Load the enviroment variables from the .env file
dotenv_1.default.config({
    path: './.env'
});
var connection = new db_1.ConnectionDatabase;
connection.connectDB();
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
var corsOptions = {
    origin: process.env.APP_URL,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
// set up routes
app.use('/api/program', require('./routes/programRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/error', require('./routes/errorRoute'));
app.use('/api/files', require('./routes/fileRoute'));
app.use('/api/paint', require('./routes/paintRoute'));
// Folder for uploads
app.use('/api/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Get port from enviroment file or use 5000
var PORT = process.env.PORT || process.env.APP_PORT || 5000;
// Create the server
var server = http.createServer(app);
(0, socketHander_1.setupSocketIO)(server, app);
server.listen(PORT, function () { return console.log("Server started on port ".concat(PORT)); });
