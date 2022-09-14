import { Request, Response } from 'express';

import mockjs, { Random } from 'mockjs';

const pictures: any[] = mockjs.mock({
  'picture|50': [
    {
      'id|+1': 0,
      src: Random.image('200x100', '#FF6600'),
      create_time: '2021-12-10 11:54:29',
      name: 'mock picture.png',
    },
  ],
}).picture;

export default {
  'GET /api/picture/': (req: Request, res: Response) => {
    let size: number, page: number;
    size = Number(req?.query?.size) || 10;
    page = Number(req?.query?.page) || 1;
    const data = pictures.slice((page - 1) * size, page * size);
    res.send({ data, size, page, count: pictures.length });
  },

  'POST /api/picture/': (req: Request, res: Response) => {
    const picture = { ...req.body, id: pictures.length };
    pictures.unshift({
      id: pictures.length,
      src: Random.image('200x100', '#FF6600'),
      create_time: '2021-12-10 11:54:29',
      name: 'mock picture.png',
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
