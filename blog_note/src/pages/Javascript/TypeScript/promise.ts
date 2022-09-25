type ProResType = {
  token: string;
  id: 111;
};
type PrRejType = {
  message: string;
};

const p1 = new Promise<ProResType | PrRejType>(
  (resolve: (res: ProResType) => void, reject: (rej: PrRejType) => void) => {
    // to something
    // resolve({
    //   id: 111,
    //   token: 'sss',
    // });
    reject({
      message: 'error',
    });
  },
);

export default {}
