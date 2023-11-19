import type { Request, Response } from 'express';

const createColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16);

const createId = () =>
  Math.floor(Math.random() * 9999999999999999999).toString(16);

const createHeight = () => Math.random() * 200 + 100;

const data = (length: number) => {
  const response = [];
  for (let index = 0; index < length; index++) {
    const id = createId();
    response.push({
      context: `${id} - text`,
      id: id,
      height: createHeight(),
      // height: 50,
      color: createColor(),
    });
  }
  return response;
};

export default {
  'GET /api/list': (req: Request, res: Response) => {
    const size = req?.query?.size * 1;
    setTimeout(() => {
      res.send({ data: data(size) });
    }, 500);
  },
};
