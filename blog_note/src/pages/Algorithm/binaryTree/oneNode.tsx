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
          x: 150,
          y: 150,
          id: '5ec1ab6c',
          index: 0,
        },
      ],
    }),
    [],
  );
  return (
    <GGEditor>
      <Flow style={{ width: 250, height: 250 }} data={data} />
    </GGEditor>
  );
};

export default PlotFlow;
