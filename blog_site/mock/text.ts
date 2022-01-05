import { Request, Response } from 'express';
import { setTimeOut } from './mockHelper';
import mockjs from 'mockjs';

const text: [] = mockjs.mock({
  'text|100': [
    {
      author: {
        name: '@title()',
        'avatar|+1': [
          'https://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1602167530&t=77eb09635da0e74f5fbcb2e7b1a34ab9',
          '',
        ],
      },
      'ifPublic|1': '@boolean()',
      'id|+1': 0,
      title: '@title()',
      content: '@cparagraph()',
      description: '@cparagraph()',
    },
  ],
}).text;

export default {
  'GET /api/text': async (req: Request, res: Response) => {
    const response = await setTimeOut(text, 1000);
    res.send({data:response});
  },
  'GET /api/text/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const response = text.find((item: any) => item.id + '' === id + '');
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
};
