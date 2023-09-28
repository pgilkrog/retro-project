"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var programSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        reguired: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false,
        default: 'dark'
    },
    sortOrder: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});
var Program = mongoose_1.default.model('Program', programSchema);
exports.Program = Program;
