"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var errorSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});
var Error = mongoose_1.default.model('Error', errorSchema);
exports.Error = Error;
