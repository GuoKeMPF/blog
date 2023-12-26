/* eslint-disable @typescript-eslint/no-unused-vars */
function fun(params: string | number): string {
  return `input ${params}`;
}

fun(11111);

const fun1 = (params: string | number): string => {
  return `input ${params}`;
};

const fun2 = (params: number): Promise<number> => {
  const p = new Promise<number>((res, rej) => {
    res(params);
  });
  return p;
};

declare function fun3(params: string | number): string;

function fun3(params) {
  return typeof params === 'string';
}

export default {};
