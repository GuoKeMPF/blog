import { Request, Response } from 'express';

export default {
  'POST /api/login/': (req: Request, res: Response) => {
    res.cookie('csrftoken', 'csrftoken', { maxAge: 60 * 1000 });
    res.status(200).send({
      code: 1,
      data: 'admin',
      message: 'login success',
    });
  },
  'POST /api/logout/': (req: Request, res: Response) => {
    res.status(200).send({
      code: 1,
      message: 'logout success',
    });
  },
};
