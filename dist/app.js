"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
// Add in logging to record when images are processed or accessed.
app.use((req, _, next) => {
    console.log(`${req.method} ${req.path} filename:${req.query.filename} width:${req.query.width} height:${req.query.height}`);
    next();
});
app.use("/api/images", images_1.default);
app.use("*", (_, res) => {
    res.status(404).send(`
   
  `);
});
exports.default = app;
