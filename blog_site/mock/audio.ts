import { Request, Response } from 'express';
import path from "path";

const mp3s: any[] = [
  {
    src: path.join('./mock_static/audios/daybreak.mp3'),
    name: 'daybreak.mp3',
  },
  {
    src: path.join('./mock_static/audios/M18.mp3'),
    name: 'M18.mp3',
  },
  {
    src: path.join('./mock_static/audios/error.mp3'),
    name: 'error.mp3',
  },
]

const mockAudio = () => {
  return mp3s[Math.floor(Math.random() * mp3s.length)];
};

const audios: any[] = Array(10).fill({
  create_time: '2021-12-10 11:54:29',
}).map((p: any, index: number) => ({
  ...p,
  id: index,
  ...mockAudio(),
}))


export default {
  'GET /api/audio': (req: Request, res: Response) => {
    let size: number, page: number;
    size = Number(req?.query?.size) || 10;
    page = Number(req?.query?.page) || 1;
    const data = audios.slice((page - 1) * size, page * size);
    setTimeout(() => {
      res.send({ data, size, page, count: audios.length });
    }, 500);
  },

  'GET /mock_static/audios/*': (req: Request, res: Response) => {
    const { url } = req
    setTimeout(() => {
      res.sendFile(path.join(__dirname, url));
    }, 500);
  },
};
