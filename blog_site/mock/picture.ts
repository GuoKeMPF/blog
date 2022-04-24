import { Request, Response } from 'express';

import mockjs, { Random } from 'mockjs';



const mockImgW = 300 + Math.random() * 100;
const mockImgH = 300 + Math.random() * 100;
const mockColor = () => Random.color()
const mockImg = () => Random.image(`${mockImgW}x${mockImgH}'`, mockColor())
const pictures: any[] = mockjs.mock({
  'picture|30': [
    {
      'id|+1': 0,
      src: function () {
        return mockImg()
      },
      create_time: '2021-12-10 11:54:29',
      name: 'mock picture.png',
      width: mockImgW,
      height: mockImgH
    },
  ],
}).picture;


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

  'POST /api/picture': (req: Request, res: Response) => {
    const picture = { ...req.body, id: pictures.length };
    pictures.push({
      id: pictures.length,
      src: mockImg(),
      create_time: '2021-12-10 11:54:29',
      name: 'mock picture.png',
      width: mockImgW,
      height: mockImgH
    });
    res.status(200).send(picture);
  },

  'DELETE /api/picture/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = pictures.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      pictures.splice(index, 1);
      res.status(200).send(pictures);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
};
