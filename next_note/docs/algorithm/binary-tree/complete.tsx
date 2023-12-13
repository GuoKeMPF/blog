import GGEditor, { Flow } from 'gg-editor';
import React, { useMemo } from 'react';

const PlotFlow = () => {
  const data = useMemo(
    () => ({
      nodes: [
        {
          type: 'node',
          size: '80*48',
          shape: 'flow-rect',
          color: '#1890FF',
          label: 'root',
          x: 260,
          y: 80,
          id: '89d7caa6',
          index: 0,
        },
        {
          type: 'node',
          size: '80*48',
          shape: 'flow-rect',
          color: '#1890FF',
          label: 'left',
          x: 150,
          y: 190,
          id: '2b8ac5b6',
          index: 1,
        },
        {
          type: 'node',
          size: '80*48',
          shape: 'flow-rect',
          color: '#1890FF',
          label: 'right',
          x: 369,
          y: 190,
          id: 'd97f39a4',
          index: 2,
        },
      ],
      edges: [
        {
          source: '89d7caa6',
          sourceAnchor: 2,
          target: '2b8ac5b6',
          targetAnchor: 0,
          id: '04ec4576',
          index: 3,
        },
        {
          source: '89d7caa6',
          sourceAnchor: 2,
          target: 'd97f39a4',
          targetAnchor: 0,
          id: '773e08a8',
          index: 4,
        },
      ],
    }),
    [],
  );
  return (
    <GGEditor>
      <Flow style={{ width: 500, height: 250 }} data={data} />
    </GGEditor>
  );
};

export default PlotFlow;
