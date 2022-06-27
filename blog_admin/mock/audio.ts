import { Request, Response } from 'express';
import path from 'path';

const mp3s: any[] = [
  {
    src: path.join('./mock_static/audios/daybreak.mp3'),
    name: 'daybreak.mp3',
    create_time: '2022-04-24 13:46:26',
    description: 'daybreak.mp3',
    unique_name: 'daybreak.mp3 2022-04-24 13:46:26',
  },
  {
    src: path.join('./mock_static/audios/M18.mp3'),
    name: 'M18.mp3',
    create_time: '2022-04-24 13:46:26',
    description: 'M18.mp3',
    unique_name: 'M18.mp3 2022-04-24 13:46:26',
  },
  {
    src: path.join('./mock_static/audios/My Sunset.mp3'),
    name: 'My Sunset.mp3',
    create_time: '2022-04-24 13:46:26',
    description: 'My Sunset.mp3',
    unique_name: 'My Sunset.mp3 2022-04-24 13:46:26',
  },
  {
    src: path.join('./mock_static/audios/Vagrant.mp3'),
    name: 'Vagrant.mp3',
    create_time: '2022-04-24 13:46:26',
    description: 'Vagrant.mp3',
    unique_name: 'Vagrant.mp3 2022-04-24 13:46:26',
  },
];

const mockAudio = () => {
  return mp3s[Math.floor(Math.random() * mp3s.length)];
};

const audios: any[] = mp3s.map((p: any, index: number) => ({
  ...p,
  id: index,
}));

export default {
  'GET /api/audio': (req: Request, res: Response) => {
    let size: number, page: number;
    const data = audios;
    setTimeout(() => {
      res.send({ data, size, page, count: audios.length });
    }, 500);
  },
  'POST /api/audio': (req: Request, res: Response) => {
    const audio = {
      ...req.body,
      ...mockAudio(),
      id: audios.length + Math.random().toString(36).substring(2),
    };
    audios.unshift(audio);
    res.status(200).send(audio);
  },
  'POST /api/audios': (req: Request, res: Response) => {
    const audio = {
      ...req.body,
      ...mockAudio(),
      id: audios.length + Math.random().toString(36).substring(2),
    };
    audios.unshift(audio);
    res.status(200).send(audio);
  },

  'GET /mock_static/audios/*': (req: Request, res: Response) => {
    const { url } = req;
    const prepath = decodeURIComponent(url);

    setTimeout(() => {
      res.sendFile(path.join(__dirname, prepath));
    }, 500);
  },

  'DELETE /api/audio/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = audios.findIndex((item) => item.id + '' === id + '');
    if (index >= 0) {
      audios.splice(index, 1);
      res.status(200).send(audios);
    } else {
      res.status(404).send('Sorry, cant find that');
    }
  },
};
