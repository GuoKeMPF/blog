import mockjs, { Random } from "mockjs";
import type { Request, Response } from "express";
import { BASE_URL_DEV } from "../config";
import express from "express";
const text = express.Router();

const texts: [] = mockjs.mock({
  "text|50": [
    {
      author: "@title()",
      "ifPublic|1": "@boolean()",
      "id|+1": 0,
      create_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
      title: "@title()",
      content: "@cparagraph()",
      description: "@cparagraph()",
    },
  ],
}).text;

text.get(`${BASE_URL_DEV}/text`, (req: Request, res: Response) => {
  let size: number, page: number;
  size = Number(req?.query?.size) || 10;
  page = Number(req?.query?.page) || 1;
  const data = texts.slice((page - 1) * size, page * size);
  res.send({ data, size, page, count: texts.length });
});

text.get(`${BASE_URL_DEV}/text/:id`, (req: Request, res: Response) => {
  const { id } = req.params;
  const response = texts.find((item: any) => item.id + "" === id + "");
  if (response) {
    res.status(200).send(response);
  } else {
    res.status(404).send("Sorry, cant find that");
  }
});

export default text;
