"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettings = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSettingsSchema = new mongoose_1.default.Schema({
    backgroundColour: {
        type: String,
        required: false,
        default: "#435452"
    },
    backgroundImage: {
        type: String,
        required: false,
        default: ""
    },
    useBackground: {
        type: Boolean,
        required: false,
        default: false
    },
    theme: {
        type: String,
        required: false,
        default: 'standard'
    },
    displayOption: {
        type: String,
        required: false,
        default: 'stretch'
    }
});
var UserSettings = mongoose_1.default.model('UserSettings', userSettingsSchema);
exports.UserSettings = UserSettings;
