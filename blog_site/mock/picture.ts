import { Request, Response } from 'express';
import path from "path";

const images = [
  {
    src: path.join('./static/images/img1.png'),
    width: 1200,
    height: 784,
  },
  {
    src: path.join('./static/images/img2.png'),
    width: 1004,
    height: 986,
  },
  {
    src: path.join('./static/images/img3.png'),
    width: 1000,
    height: 800,
  },
]

const mockImg = () => {
  return images[Math.floor(Math.random() * 3)];
};

const pictures: any[] = Array(10).fill({
  create_time: '2021-12-10 11:54:29',
  name: 'mock picture.png',
}).map((p: any, index: number) => ({
  ...p,
  id: index,
  ...mockImg(),
}))


export default {
  'GET /api/picture': (req: Request, res: Response) => {
    let size: number, page: number;
    size = Number(req?.query?.size) || 10;
    page = Number(req?.query?.page) || 1;
    const data = pictures.slice((page - 1) * size, page * size);
    setTimeout(() => {
      res.send({ data, size, page, count: pictures.length });
    }, 500);
  },

  'GET /static/images/*': (req: Request, res: Response) => {
    const { url } = req
    setTimeout(() => {
      res.sendFile(path.join(__dirname, url));
    }, 500);
  },
};
