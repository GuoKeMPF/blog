import { Request, Response } from 'express';
import { setTimeOut } from './mockHelper';
import mockjs, { Random } from 'mockjs';

import { BASE_URL } from '../config/baseUrl';

const text: [] = mockjs.mock({
  'text|50': [
    {
      author: '@title()',
      'ifPublic|1': '@boolean()',
      'id|+1': 0,
      create_time: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      title: '@title()',
      content: '@cparagraph()',
      description: '@cparagraph()',
    },
  ],
}).text;

export default {
  [`GET ${BASE_URL}/api/text`]: async (req: Request, res: Response) => {
    let size: number, page: number;
    size = Number(req?.query?.size) || 10;
    page = Number(req?.query?.page) || 1;
    const data = text.slice((page - 1) * size, page * size);
    res.send({ data, size, page, count: text.length });
  },
  [`GET ${BASE_URL}/text/:id`]: (req: Request, res: Response) => {
    const { id } = req.params;
    const response = text.find((item: any) => item.id + '' === id + '');
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
};
