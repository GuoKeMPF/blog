import { useState, useRef, useEffect } from "react";

import styles from "./index.less";
import RequestAnimation from "@/utils/requestAnimation";

const config = {
  width: 600,
  height: 600,
};

const canvasW = 600,
  density = 20,
  range = 10,
  speed = 200,
  megane = 200,
  jimble = 2,
  stroke_megane = 25,
  drow_round = {
    circles: 200,
    r: 24,
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

  const canvas = useRef<HTMLCanvasElement>(null);
  const bg = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    init();
    createBG();
    return () => {
      destroy();
    };
  }, []);

  useEffect(() => {
    if (image) {
      loadImage();
      setupParticles();
    }
  }, [image]);

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
      const { width, height } = config;
      const { current } = bg;
      current.height = height;
      current.width = width;
      const ctx = current.getContext("2d");
      if (ctx) {
        const grd2 = ctx.createLinearGradient(0, 0, 0, height);
        grd2.addColorStop(0, "black");
        grd2.addColorStop(0.3, "magenta");
        grd2.addColorStop(0.5, "blue");
        grd2.addColorStop(0.6, "green");
        grd2.addColorStop(0.8, "yellow");
        grd2.addColorStop(1, "red");
        ctx.fillStyle = grd2;
        ctx.fillRect(0, 0, width, height);
      }
      setImage(current);
    }
  };

  const init = async () => {
    windoW = window.innerWidth;
    window.addEventListener("mousemove", mousemove);
  };

  const destroy = () => {
    window.removeEventListener("mousemove", mousemove);
    requestAnimation?.stop();
  };

  const loadImage = () => {
    const { width, height } = config;
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
    const ctx = current.getContext("2d");
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
              r: d[(e + a * canvasW) * 4 - 4],
              g: d[(e + a * canvasW) * 4 - 3],
              b: d[(e + a * canvasW) * 4 - 2],
              a: d[(e + a * canvasW) * 4 - 1],
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
      const { width, height } = config;
      const current: any = canvas.current;
      const ctx = current.getContext("2d");

      const ctxP = current?.getClientRects()[0];
      var x = mouseX - ctxP.x;
      var y = mouseY - ctxP.y;
      ctx.drawImage(image, 0, 0, imageW, imageH, 0, 0, canvasW, canvasH);
      var grd = ctx.createRadialGradient(x, y, 0, x, y, drow_round.circles);
      grd.addColorStop(0, "#ffffffff");
      grd.addColorStop(1, "transparent");
      ctx.fill();
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    }
  };

  const animFrame = () => {
    const current: any = canvas.current;
    const ctx = current?.getContext("2d");
    if (windoW > 400 && ctx && image) {
      ctx.clearRect(0, 0, canvasW, canvasH);
      draw_bg();
      draw_line();
    }
  };

  const draw_line = () => {
    const current: any = canvas.current;
    const ctx = current.getContext("2d");
    if (!current) {
      return;
    }
    ctx.globalCompositeOperation = "destination-out";

    const ctxP = current.getClientRects()[0];
    var x = mouseX - ctxP.x;
    var y = mouseY - ctxP.y;
    ctx.globalCompositeOperation = "source-over";
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
            ctx.lineWidth = 1;
            var gradient = ctx.createLinearGradient(d.x, d.y, f.x, f.y);

            const sColor = `rgba(${d.r},${d.g},${d.b},${d.a / 255})`;
            const eColor = `rgba(${f.r},${f.g},${f.b},${f.a / 255})`;
            console.log(eColor);
            
            gradient.addColorStop(0, sColor);
            gradient.addColorStop(1, eColor);
            ctx.strokeStyle = gradient;
            ctx.lineTo(
              d.x + (Math.random() * jimble - jimble / 2),
              d.y + (Math.random() * jimble - jimble / 2)
            );
            ctx.lineTo(
              f.x + (Math.random() * jimble - jimble / 2),
              f.y + (Math.random() * jimble - jimble / 2)
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
      <canvas className={styles.canvas} id='canvas' ref={canvas} />
    </div>
  );
};

export default Background;
