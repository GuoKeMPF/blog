import { Request, Response } from 'express';

import mockjs from 'mockjs';

const texts: any[] = mockjs.mock({
  'texts|100': [
    {
      author: '@title()',
      'id|+1': 0,
      title: '@title()',
      content: '@cparagraph()',
      description: '@cparagraph()',
      create_time: '2021-12-10 11:54:29',
      update_time: '2021-12-10 11:54:29',
    },
  ],
}).texts;

export default {
  'GET /api/text/': (req: Request, res: Response) => {
    let size: number, page: number;
    size = Number(req?.query?.size) || 10;
    page = Number(req?.query?.page) || 1;
    const data = texts.slice((page - 1) * size, page * size);
    res.send({ data, size, page, count: texts.length });
  },
  'GET /api/text/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const response = texts.find((item) => item.id + '' === id + '');
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
  'POST /api/text/': (req: Request, res: Response) => {
    texts.unshift({ ...req.body, id: texts.length });
    res.status(200).send(texts);
  },
  'PATCH /api/text/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = texts.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      texts[index] = req.body;
      res.status(200).send(texts);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
  'PUT /api/text/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = texts.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      texts[index] = req.body;
      res.status(200).send(texts);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
  'DELETE /api/text/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = texts.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      texts.splice(index, 1);
      res.status(200).send(texts);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
};
