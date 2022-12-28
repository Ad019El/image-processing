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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImage = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const convertImage = ({ filename, width, height, }) => __awaiter(void 0, void 0, void 0, function* () {
    const filepath = path_1.default.join(__dirname, '..', '..', 'images/full', `${filename}.jpg`);
    const savePath = path_1.default.join(__dirname, '..', '..', 'images/thumb', `${filename}-${width}x${height}.jpg`);
    // Check if the image already exists
    if ((0, fs_1.existsSync)(savePath)) {
        return savePath;
    }
    yield (0, sharp_1.default)(filepath)
        .resize({
        width: Number(width),
        height: Number(height),
    })
        .toFile(savePath);
    return savePath;
});
exports.convertImage = convertImage;
