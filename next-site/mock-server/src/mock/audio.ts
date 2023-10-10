import type { Request, Response } from "express";
import { BASE_URL_DEV } from "../config";
import path from "path";

import express from "express";
const audio = express.Router();

const mp3s: any[] = [
  {
    src: path.join("./mock_static/audios/daybreak.mp3"),
    name: "daybreak.mp3",
    create_time: "2022-04-24 13:46:26",
    description: "daybreak.mp3",
    unique_name: "daybreak.mp3 2022-04-24 13:46:26",
  },
  {
    src: path.join("./mock_static/audios/M18.mp3"),
    name: "M18.mp3",
    create_time: "2022-04-24 13:46:26",
    description: "M18.mp3",
    unique_name: "M18.mp3 2022-04-24 13:46:26",
  },
  {
    src: path.join("./mock_static/audios/My Sunset.mp3"),
    name: "My Sunset.mp3",
    create_time: "2022-04-24 13:46:26",
    description: "My Sunset.mp3",
    unique_name: "My Sunset.mp3 2022-04-24 13:46:26",
  },
  {
    src: path.join("./mock_static/audios/Vagrant.mp3"),
    name: "Vagrant.mp3",
    create_time: "2022-04-24 13:46:26",
    description: "Vagrant.mp3",
    unique_name: "Vagrant.mp3 2022-04-24 13:46:26",
  },
];

const mockAudio = () => {
  return mp3s[Math.floor(Math.random() * mp3s.length)];
};

const audios: any[] = mp3s.map((p: any, index: number) => ({
  ...p,
  id: index,
}));

audio.get(`${BASE_URL_DEV}/audio`, (req: Request, res: Response) => {
  let size: number, page: number;
  const data = audios;
  setTimeout(() => {
    res.send({ data, size, page, count: audios.length });
  }, 500);
});

audio.get(`/mock_static/audios/*`, (req: Request, res: Response) => {
  const { url } = req;
  const prepath = decodeURIComponent(url);

  setTimeout(() => {
    res.sendFile(path.join(__dirname, prepath));
  }, 500);
});

export default audio;
