import { Request, Response, Router } from "express";
import { promises as fs } from "fs";
import { convertImage } from "../../utils/convertImage";

const imageRouter = Router();

imageRouter.get("/", async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (!filename || !width || !height) {
    return res.status(400).json({
      message: "filename, width and height query parameter is required",
    });
  }

  const files = (await fs.readdir(__dirname + "/../../../images/full")).map(
    (file) => file.split(".")[0]
  );

  if (!files.includes(filename)) {
    return res.status(400).send(`
      <p>Invalid filename</p>
    `);
  }

  try {
    const image = await convertImage({
      filename,
      width,
      height,
    });

    res.sendFile(image);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default imageRouter;
