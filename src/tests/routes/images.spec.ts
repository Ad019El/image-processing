import { existsSync } from "fs";
import request from "supertest";
import app from "../../app";
import { convertImage } from "../../utils/convertImage";

describe("GET /images", () => {
  it("return a resized image", async () => {
    const response = await request(app).get(
      "/api/images?filename=fjord&width=200&height=200"
    );

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toEqual("image/jpeg");
  });

  it("throw an error if required query parameter is not provided", async () => {
    const response = await request(app).get(
      "/api/images?filename=fjord&width=200"
    );

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      "filename, width and height query parameter is required"
    );
  });
});

describe("convertImage util", () => {
  it("return a resized image", async () => {
    const image = await convertImage({
      filename: "fjord",
      width: 200,
      height: 200,
    });

    expect(existsSync(image)).toEqual(true);
    expect(image).toContain("fjord-200x200.jpg");
  });

  it("throw an error if file does not exist", async () => {
    await expectAsync(
      convertImage({
        filename: "notFound",
        width: 200,
        height: 200,
      })
    ).toBeRejected();
  });
});
