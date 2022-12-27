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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const convertImage_1 = require("../../utils/convertImage");
const imageRouter = (0, express_1.Router)();
imageRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    if (!filename || !width || !height) {
        return res.status(400).json({
            message: "width & height parameter is required",
        });
    }
    const files = (yield fs_1.promises.readdir(__dirname + "/../../../images/full")).map((file) => file.split(".")[0]);
    if (!files.includes(filename)) {
        return res.status(400).send(`
      <p>Invalid filename</p>
      
    `);
    }
    try {
        const image = yield (0, convertImage_1.convertImage)({
            filename,
            width,
            height,
        });
        res.sendFile(image);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
exports.default = imageRouter;
