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

export default {};
