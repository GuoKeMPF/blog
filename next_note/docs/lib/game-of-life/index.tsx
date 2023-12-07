import { Button, Form, InputNumber, message, Space } from "antd";
import type { FC } from "react";
import React from "react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import gameOfLife from "./gameOfLife";

namespace GameOfLifeStates {
  export interface MapConfig {
    xAxis: number;
    yAxis: number;
  }
  export interface MapSize {
    width: number;
    height: number;
  }
  export interface Cell {
    x: number;
    y: number;
  }
  export type InitValues = Array<Cell>;
  export type InitSet = Map<string, Cell>;
  export type currentStatus = "running" | "stoped";
}

const padding = 20,
  lineWeight = 1;

const initVal: Array<GameOfLifeStates.Cell> = [];
const initConfig = {
  xAxis: 30,
  yAxis: 20,
};

const GameOfLife: FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const intervalId = useRef<number | Timeout>(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [mapConfig, setMapConfig] =
    useState<GameOfLifeStates.MapConfig>(initConfig);

  const [mapSize, setMapSize] = useState<
    undefined | GameOfLifeStates.MapSize
  >();

  const [initMap, setInitMap] = useState<GameOfLifeStates.InitSet>(
    (): GameOfLifeStates.InitSet => {
      const map: GameOfLifeStates.InitSet = new Map();
      initVal.forEach((i) => {
        const { x, y } = i;
        map.set(`${x}-${y}`, i);
      });
      return map;
    }
  );

  const [status, setStatus] =
    useState<GameOfLifeStates.currentStatus>("stoped");

  const [cell, setCell] = useState<number>(0);

  useEffect(() => {
    if (container.current && canvas.current) {
      const size = container.current.getBoundingClientRect();
      const { width: w } = size;
      const c = Math.floor((w - 2 * padding - lineWeight) / mapConfig.xAxis);
      const height = c * mapConfig.yAxis + 2 * padding;
      const width = c * mapConfig.xAxis + 2 * padding + lineWeight;
      canvas.current.width = width + lineWeight;
      canvas.current.height = height + lineWeight;
      setMapConfig({
        ...mapConfig,
      });
    }
  }, []);
  useEffect(() => {
    if (container.current && canvas.current) {
      const size = container.current.getBoundingClientRect();
      const { width: w } = size;
      const c = Math.floor((w - 2 * padding - lineWeight) / mapConfig.xAxis);
      const height = c * mapConfig.yAxis + 2 * padding;
      const width = c * mapConfig.xAxis + 2 * padding + lineWeight;
      canvas.current.width = width + lineWeight;
      canvas.current.height = height + lineWeight;
      setMapSize({ width, height });
      setCell(c);
    }
  }, [mapConfig]);

  const drawMap = useCallback(() => {
    const { current } = canvas;
    const ctx = current?.getContext("2d");
    if (ctx && mapSize) {
      /**
       * bg
       */
      ctx.clearRect(0, 0, mapSize.width, mapSize.height);
      const innerW = mapSize.width - padding,
        innerH = mapSize.height - padding;
      /**
       * line
       */
      for (let r = 0; r <= mapConfig.yAxis; r += 1) {
        ctx.moveTo(padding, cell * r + padding);
        ctx.lineTo(innerW, cell * r + padding);
      }
      for (let c = 0; c <= mapConfig.xAxis; c += 1) {
        ctx.moveTo(cell * c + padding, padding);
        ctx.lineTo(cell * c + padding, innerH);
      }
      ctx.strokeStyle = "#0f000";
      ctx.stroke();

      initMap.forEach((i) => {
        const { x, y } = i;
        ctx.fillStyle = "#000";
        ctx.fillRect(x * cell + padding, y * cell + padding, cell, cell);
      });
    }
  }, [mapSize, cell, initMap]);

  useEffect(() => {
    drawMap();
  }, [drawMap, cell, initMap]);

  const start = () => {
    setStatus("running");
    form
      .validateFields()
      .then((values) => {
        setMapConfig({
          ...values,
        });
        // 需要判断是否有超出地图的值
        const filtered: GameOfLifeStates.InitSet = new Map();
        initMap.forEach((value, key) => {
          if (value.x <= values.xAxis && value.y <= values.yAxis) {
            filtered.set(key, value);
          }
        });
        const generationNext = gameOfLife(values, filtered);
        const id = setInterval(() => {
          const nextValues = generationNext();
          if (nextValues.size === 0) {
            messageApi.open({
              type: "error",
              content: "没有任何细胞生存",
            });
            stop();
            return;
          }
          setInitMap(nextValues);
        }, 1000);
        intervalId.current = id;
      })
      .catch((errorInfo) => { });
  };

  const stop = () => {
    setStatus("stoped");
    clearInterval(intervalId.current);
  };

  const setCurrentCell = (e: {
    [x: string]: any;
    movementX: any;
    movementY: any;
  }) => {
    if (status === "running") {
      return;
    }
    const x = e.clientX - e.target.offsetTop - padding,
      y = e.clientY - e.target.offsetLeft - padding;
    const col = Math.floor(x / cell),
      row = Math.floor(y / cell);

    if (
      row < 0 ||
      col >= mapConfig.xAxis ||
      col < 0 ||
      row >= mapConfig.yAxis
    ) {
      return;
    }
    const nextMpa = new Map(initMap);
    const key = `${col}-${row}`;
    if (nextMpa.has(key)) {
      nextMpa.delete(key);
    } else {
      nextMpa.set(key, { x: col, y: row });
    }
    setInitMap(nextMpa);
    if (nextMpa.size === 0) {
      messageApi.open({
        type: "error",
        content: "没有任何细胞生存",
      });
      stop();
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <div ref={container}>
        <canvas onClick={setCurrentCell} ref={canvas}></canvas>
      </div>
      <Form layout="inline" form={form} initialValues={initConfig}>
        <Form.Item
          required
          rules={[{ min: 1, type: "number", max: 120, required: true }]}
          name={["yAxis"]}
          label="行"
        >
          <InputNumber min={1} max={120} />
        </Form.Item>
        <Form.Item
          rules={[{ min: 1, type: "number", max: 120, required: true }]}
          required
          name={["xAxis"]}
          label="列"
        >
          <InputNumber min={1} max={80} />
        </Form.Item>
        <Form.Item>
          <Space wrap>
            <Button htmlType="submit" type="primary" onClick={start}>
              开始
            </Button>
            <Button onClick={stop}>暂停</Button>
          </Space>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default GameOfLife;
