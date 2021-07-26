"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./config/config"));
mongoose_1.connect(config_1.default.DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose_1.connection.once('open', () => {
    console.log('MongoDB Connection Stablished');
});
mongoose_1.connection.once('error', error => {
    console.log(error);
    process.exit(0);
});
