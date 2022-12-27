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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const convertImage_1 = require("../../utils/convertImage");
describe("GET /images", () => {
    it("return a resized image", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/images?filename=fjord&width=200&height=200");
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toEqual("image/jpeg");
    }));
    it("throw an error if required query parameter given", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/images?filename=fjord&width=200");
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("filename, width and height query parameter is required");
    }));
});
describe("convertImage util", () => {
    // it("return a resized image", async () => {
    //   const image = await convertImage({
    //     filename: "fjord",
    //     width: 200,
    //     height: 200,
    //   });
    //   expect(existsSync(image)).toEqual(true);
    //   expect(image).toContain("fjord-200x200.jpg");
    // });
    it("throw an error if file does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, convertImage_1.convertImage)({
            filename: "notFound",
            width: 200,
            height: 200,
        })).toBeRejected();
    }));
});
