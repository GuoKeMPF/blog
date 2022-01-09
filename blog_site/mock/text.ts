import { Request, Response } from 'express';
import { setTimeOut } from './mockHelper';
import mockjs,{Random} from 'mockjs';

const text: [] = mockjs.mock({
  'text|100': [
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
