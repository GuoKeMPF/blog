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
  'GET /api/picture': (req: Request, res: Response) => {
    res.send({ data: pictures });
  },

  'POST /api/picture': (req: Request, res: Response) => {
    const picture = { ...req.body, id: pictures.length };
    pictures.unshift(picture);
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
