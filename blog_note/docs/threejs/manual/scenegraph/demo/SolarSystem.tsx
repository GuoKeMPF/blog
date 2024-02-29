import React, { useEffect, useRef, type FC } from "react";


export const SolarSystem: FC = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {

    function resizeCanvasToDisplaySize(canvas, multiplier) {
      multiplier = multiplier || 1;
      const width = canvas.clientWidth * multiplier | 0;
      const height = canvas.clientHeight * multiplier | 0;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }
    function duplicate(src) {
      const d = new window.DOMMatrix();
      d.a = src.a;
      d.b = src.b;
      d.c = src.c;
      d.d = src.d;
      d.e = src.e;
      d.f = src.f;
      return d;
    }
    function patchCurrentTransform(ctx) {
      if (ctx.currentTransform) {
        return ctx;
      }
      const stack = [];
      ctx.scale = function (scale) {
        return function (x, y) {
          ctx.currentTransform.scaleSelf(x, y);
          scale(x, y);
        };
      }(ctx.scale.bind(ctx));
      ctx.rotate = function (rotate) {
        return function (r) {
          ctx.currentTransform.rotateSelf(r * 180 / Math.PI);
          rotate(r);
        };
      }(ctx.rotate.bind(ctx));
      ctx.translate = function (translate) {
        return function (x, y) {
          ctx.currentTransform.translateSelf(x, y);
          translate(x, y);
        };
      }(ctx.translate.bind(ctx));
      ctx.save = function (save) {
        return function () {
          stack.push(duplicate(ctx.currentTransform));
          save();
        };
      }(ctx.save.bind(ctx));
      ctx.restore = function (restore) {
        return function () {
          if (stack.length) {
            ctx.currentTransform = stack.pop();
          } else {
            throw new Error('"transform stack empty!');
          }
          restore();
        };
      }(ctx.restore.bind(ctx));
      ctx.transform = function (transform) {
        return function (m11, m12, m21, m22, dx, dy) {
          const m = new DOMMatrix();
          m.a = m11;
          m.b = m12;
          m.c = m21;
          m.d = m22;
          m.e = dx;
          m.f = dy;
          ctx.currentTransform.multiplySelf(m);
          transform(m11, m12, m21, m22, dx, dy);
        };
      }(ctx.transform.bind(ctx));
      ctx.setTransform = function (setTransform) {
        return function (m11, m12, m21, m22, dx, dy) {
          const d = ctx.currentTransform;
          d.a = m11;
          d.b = m12;
          d.c = m21;
          d.d = m22;
          d.e = dx;
          d.f = dy;
          setTransform(m11, m12, m21, m22, dx, dy);
        };
      }(ctx.setTransform.bind(ctx));
      ctx.currentTransform = new DOMMatrix();
      ctx.validateTransformStack = function () {
        if (stack.length !== 0) {
          throw new Error('transform stack not 0');
        }
      };
      return ctx;
    }

    function wrapCanvasRenderingContext2D(ctx) {
      //patchDOMMatrix();
      return patchCurrentTransform(ctx);
    }

    function main() {
      const root = {
        name: 'sun',
        translation: [0, 0],
        color: 'yellow',
        radius: 30,
        speed: 1,
        children: [
          {
            name: 'earth',
            translation: [-5, 1],
            color: 'blue',
            radius: 10,
            speed: 2,
            children: [
              {
                name: 'moon',
                translation: [-1, 1],
                color: 'gray',
                drawOrbit: true,
                radius: 5,
                speed: 36.13,
                children: [
                ],
              },
            ],
          },
        ],
      };

      const canvas = canvasRef.current
      const ctx = wrapCanvasRenderingContext2D(canvas.getContext('2d'));
      const orbitCanvas = orbitRef.current;
      const orbitCtx = orbitCanvas.getContext('2d');
      canvas.width = Math.floor(containerRef.current?.scrollWidth)
      orbitCanvas.width = Math.floor(containerRef.current?.scrollWidth)
      canvas.height = containerRef.current?.clientHeight
      orbitCanvas.height = containerRef.current?.clientHeight

      const spread = 16;
      function updateTranslation(node) {
        node.translation[0] *= spread;
        node.translation[1] *= spread;
        node.rotation = 0;
        node.children.forEach(updateTranslation);
      }
      updateTranslation(root);

      let clock = 0;
      const maxHistory = 400;
      let curHistory = 0;
      const history = [];

      function drawTrail(ctx, pos, radius) {
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], radius, 0, Math.PI * 2, false);
        ctx.fill();
      }

      function drawNode(node) {
        ctx.save();
        ctx.rotate(node.speed * clock);
        ctx.translate(node.translation[0], node.translation[1]);
        ctx.fillStyle = node.color;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(0, 0, node.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        if (node.drawOrbit) {
          const mat = ctx.currentTransform;
          const point = [mat.e, mat.f];
          const old = history[curHistory];
          if (old) {
            orbitCtx.save();
            orbitCtx.globalCompositeOperation = 'destination-out';
            orbitCtx.fillStyle = 'rgba(255,255,255,1)';
            drawTrail(orbitCtx, old, 2);
            orbitCtx.restore();
          }
          history[curHistory] = point;
          curHistory = (curHistory + 1) % maxHistory;
          orbitCtx.fillStyle = 'rgba(255, 0, 0, 1)';
          drawTrail(orbitCtx, point, 1);
        }
        node.children.forEach(drawNode);
        ctx.restore();
      }

      function drawScene() {
        resizeCanvasToDisplaySize(ctx.canvas);
        resizeCanvasToDisplaySize(orbitCtx.canvas);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        drawNode(root);
        ctx.restore();
      }

      function render() {
        clock += 1 / 60 * 0.25;
        drawScene();
        requestAnimationFrame(render, canvas);
      }
      requestAnimationFrame(render, canvas);
    }
    main();



    return () => {
    }
  }, [])


  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "400px", position: 'relative' }}>
    <canvas ref={orbitRef} style={{ position: 'absolute' }}></canvas>
    <canvas ref={canvasRef}></canvas>
  </div>;
};


export default SolarSystem
