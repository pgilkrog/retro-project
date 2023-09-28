"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'user'
    },
    installedPrograms: {
        type: [],
        required: false
    },
    settings: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserSettings'
    }
});
var User = mongoose_1.default.model('User', userSchema);
exports.User = User;
