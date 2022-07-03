import { useState, useRef, useEffect } from 'react';

import styles from './index.less';
import textConfig from '@/utils/textConfig';
import { getLocale } from 'umi';
import RequestAnimation from '@/utils/requestAnimation';

const canvasW = 600,
  density = 10,
  range = 10,
  speed = 100,
  megane = 130,
  jimble = 2,
  stroke_megane = 25,
  drow_round = {
    circles: 20,
    r: 12,
  };

let imageW: number = 0,
  imageH: number = 0,
  canvasH: number = 0,
  windoW = 0,
  mouseX: number = 0,
  mouseY: number = 0;

const Background = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const [requestAnimation, setRequestAnimation] = useState<
    RequestAnimation | undefined
  >();

  const [image, setImage] = useState<HTMLCanvasElement | null>();
  const locale = getLocale();

  const canvas = useRef<HTMLCanvasElement>(null);
  const bg = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    init();
    return () => {
      destroy();
    };
  }, []);

  useEffect(() => {
    setImage(null);
    createBG();
  }, [locale]);

  useEffect(() => {
    if (image) {
      loadImage();
      setupParticles();
    }
  }, [image, locale]);

  useEffect(() => {
    if (particles && particles.length > 0 && animFrame) {
      const r = new RequestAnimation({
        callback: animFrame,
      });
      setRequestAnimation(r);
      r.start();
      return () => {
        r.stop();
      };
    }
  }, [particles]);

  const createBG = () => {
    if (bg.current) {
      const { width, height, texts } = textConfig;
      const { zh, en } = texts;
      const ifenglish = getLocale().includes('en');
      const info = ifenglish ? en : zh;
      const { current } = bg;
      current.height = height;
      current.width = width;
      const ctx = current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        info.forEach((item) => {
          ctx.font = item.font;
          ctx.fillText(item.text, item.x, item.y, item.width);
        });
      }
      setImage(current);
    }
  };

  const init = async () => {
    windoW = window.innerWidth;
    window.addEventListener('mousemove', mousemove);
  };

  const destroy = () => {
    window.removeEventListener('mousemove', mousemove);
    requestAnimation?.stop();
  };

  const loadImage = () => {
    const { width, height } = textConfig;
    imageW = width;
    imageH = height;
    if (canvas && canvas.current) {
      const current: any = canvas.current;
      current.width = canvasW;
      const cH = (imageH * canvasW) / imageW;
      current.height = cH;
      canvasH = cH;
      draw_bg();
    }
  };

  const setupParticles = () => {
    const current: any = canvas.current;
    const ctx = current.getContext('2d');
    if (ctx && image) {
      const particles = [];
      let f, d, b;
      f = ctx.getImageData(0, 0, canvasW, canvasH);
      d = f.data;
      for (let e = 0; e <= canvasW; e += density * 1) {
        for (let a = 0; a <= canvasH; a += density * 1) {
          b = d[(e + a * canvasW) * 4 - 1];
          if (b == 255) {
            particles.push({
              x: e,
              y: a,
              x0: e,
              y0: a,
            });
          }
        }
      }
      setParticles(particles);
    }
  };

  const mousemove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const draw_bg = () => {
    if (image) {
      const current: any = canvas.current;
      const ctx = current.getContext('2d');
      ctx.drawImage(image, 0, 0, imageW, imageH, 0, 0, canvasW, canvasH);
    }
  };

  const animFrame = () => {
    const current: any = canvas.current;
    const ctx = current?.getContext('2d');
    if (windoW > 400 && ctx && image) {
      ctx.clearRect(0, 0, canvasW, canvasH);
      draw_bg();
      draw_roundy();
      draw_line();
    }
  };

  const draw_roundy = () => {
    const current: any = canvas.current;
    const ctx = current.getContext('2d');
    if (windoW > 400 && current) {
      const ctxP = current?.getClientRects()[0];
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
      for (var b = 0; b <= drow_round.circles; b++) {
        var d = drow_round.r + (drow_round.r * b) / 10;
        var x = mouseX - ctxP.x;
        var y = mouseY - ctxP.y;
        if (x > 0 && x < canvasW && y > 0 && y < canvasH) {
          ctx.beginPath();
          ctx.arc(x, y, d, 0, Math.PI * 2, true);
          ctx.stroke();
          ctx.fill();
        }
      }
    }
  };

  const draw_line = () => {
    const current: any = canvas.current;
    const ctx = current.getContext('2d');
    if (!current) {
      return;
    }
    ctx.globalCompositeOperation = 'destination-out';

    const ctxP = current.getClientRects()[0];
    var x = mouseX - ctxP.x;
    var y = mouseY - ctxP.y;
    for (var g = 0; g <= 10; g++) {
      var j = 1 - g / 10;
      var b = 80 + g * 3;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + j + ')';
      ctx.arc(x, y, b, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    for (var g = 0, l = particles.length; g < l; ++g) {
      var d = particles[g],
        dx = x - d.x,
        dy = y - d.y,
        distance = Math.sqrt(dx * dx + dy * dy);
      d.x =
        d.x - (dx / distance) * (range / distance) * speed - (d.x - d.x0) / 2;
      d.y =
        d.y - (dy / distance) * (range / distance) * speed - (d.y - d.y0) / 2;
      var o = d.x - x;
      var m = d.y - y;
      var q = Math.sqrt(Math.pow(o, 2) + Math.pow(m, 2));
      if (q < megane) {
        for (var e = 1; e < particles.length; e++) {
          var f = particles[e];
          var k = d.x - f.x;
          var h = d.y - f.y;
          var a = Math.sqrt(Math.pow(k, 2) + Math.pow(h, 2));
          if (a < stroke_megane) {
            ctx.beginPath();
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = 'rgba(255,255,255,1)';
            ctx.lineTo(
              d.x + (Math.random() * jimble - jimble / 2),
              d.y + (Math.random() * jimble - jimble / 2),
            );
            ctx.lineTo(
              f.x + (Math.random() * jimble - jimble / 2),
              f.y + (Math.random() * jimble - jimble / 2),
            );
            ctx.lineTo(d.x0, d.y0);
            ctx.lineTo(f.x0, f.y0);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <canvas className={styles.bg} ref={bg} />
      <canvas className={styles.canvas} id="canvas" ref={canvas} />
    </div>
  );
};

export default Background;
