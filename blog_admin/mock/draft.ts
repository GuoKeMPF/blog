import { Request, Response } from 'express';

import mockjs from 'mockjs';

const drafts: any[] = mockjs.mock({
  'drafts|100': [
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
}).drafts;

export default {
  'GET /api/draft': (req: Request, res: Response) => {
    let size: number, page: number;
    size = Number(req?.query?.size) || 10;
    page = Number(req?.query?.page) || 1;
    const data = drafts.slice((page - 1) * size, page * size);
    res.send({ data, size, page, count: drafts.length });
  },
  'GET /api/draft/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const response = drafts.find((item) => item.id + '' === id + '');
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
  'POST /api/draft': (req: Request, res: Response) => {
    const draft = { ...req.body, id: drafts.length };
    drafts.unshift(draft);
    res.status(200).send(draft);
  },
  'PATCH /api/draft/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = drafts.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      drafts[index] = req.body;
      res.status(200).send(drafts);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
  'PUT /api/draft/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = drafts.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      drafts[index] = req.body;
      res.status(200).send(drafts[index]);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
  'DELETE /api/draft/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = drafts.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      drafts.splice(index, 1);
      res.status(200).send(drafts);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
};
