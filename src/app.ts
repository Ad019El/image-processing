import express, { NextFunction, Request, Response } from "express";
import imageRouter from "./routes/images";

const app = express();

// Add in logging to record when images are processed or accessed.
app.use((req: Request, _: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.path} filename:${req.query.filename} width:${req.query.width} height:${req.query.height}`
  );
  next();
});

app.use("/api/images", imageRouter);

app.use("*", (_: Request, res: Response) => {
  res.status(404).send(`
   
  `);
});

export default app;
