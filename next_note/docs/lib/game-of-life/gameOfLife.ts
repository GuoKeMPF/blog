const deepCloneMpa = (value: any[]) => {
  const v: any[][] = [];
  value.forEach((element: any) => {
    v.push([...element]);
  });
  return v;
};
const live = true;
const die = false;

const gameOfLife = (
  mapP: { xAxis: number; yAxis: number; width?: number; height?: number },
  listP: Map<string, { x: number; y: number }>
) => {
  const generationMap = (m: number, n: number) => {
    const map = [];
    for (let row = 0; row < m; row++) {
      const element = [];
      for (let col = 0; col < n; col++) {
        element.push(die);
      }
      map.push(element);
    }
    return map;
  };
  let arrs = generationMap(mapP.xAxis, mapP.yAxis);
  const initMap = (list: Map<string, { x: number; y: number }>) => {
    list.forEach((element: { x: number; y: number }) => {
      const { x, y } = element;
      arrs[x][y] = live;
    });
  };
  initMap(listP);
  const nextStep = () => {
    const newMap = deepCloneMpa(arrs);
    const lifeMap = new Map();
    for (let row = 0; row < mapP.xAxis; row++) {
      const currentRow = arrs[row];
      const topRow = arrs[row - 1] || [];
      const bottomRow = arrs[row + 1] || [];
      for (let col = 0; col < mapP.yAxis; col++) {
        const left = currentRow[col - 1] === live ? 1 : 0;
        const right = currentRow[col + 1] === live ? 1 : 0;
        const current = currentRow[col] === live ? 1 : 0;
        let tl = 0,
          tr = 0,
          bl = 0,
          br = 0,
          t = 0,
          b = 0;
        if (topRow) {
          tl = topRow[col - 1] && topRow[col - 1] === live ? 1 : 0;
          t = topRow[col] && topRow[col] === live ? 1 : 0;
          tr = topRow[col + 1] && topRow[col + 1] === live ? 1 : 0;
        }
        if (bottomRow) {
          bl = bottomRow[col - 1] && bottomRow[col - 1] === live ? 1 : 0;
          b = bottomRow[col] && bottomRow[col] === live ? 1 : 0;
          br = bottomRow[col + 1] && bottomRow[col + 1] === live ? 1 : 0;
        }
        const nextValue = left + right + tl + tr + bl + br + t + b;
        let nextStatus = die;
        if (current) {
          nextStatus = nextValue >= 2 && nextValue <= 3 ? live : die;
        } else {
          nextStatus = nextValue >= 3 ? live : die;
        }
        if (nextStatus) {
          const cell = {
            x: row,
            y: col,
          };
          lifeMap.set(`${row}-${col}`, cell);
        }
        newMap[row][col] = nextStatus;
      }
    }
    arrs = deepCloneMpa(newMap);
    return lifeMap;
  };
  return nextStep;
};

export default gameOfLife;