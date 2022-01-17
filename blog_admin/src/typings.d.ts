declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

type ResponseDateType = {
  code: number;
  data: any;
  message?: string;
};

type StorageMock = {
  get: (key: string) => Promise;
};

declare interface Window {
  cookieStore: StorageMock;
  serverPort: string;
}
