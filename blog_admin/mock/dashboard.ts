import { Request, Response } from 'express';

export default {
  'GET /api/dashboard/': (req: Request, res: Response) => {
    res.send({
      draft: 42,
      text: 12,
      picture: 51,
      audio: 24,
    });
  },
};
