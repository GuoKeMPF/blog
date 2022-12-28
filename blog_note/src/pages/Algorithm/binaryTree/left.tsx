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
            x: 200,
            y: 50,
            id: 'a7515cc9',
            index: 0,
          },
          {
            type: 'node',
            size: '80*48',
            shape: 'flow-rect',
            color: '#1890FF',
            label: 'right',
            x: 50,
            y: 160,
            id: 'e141626e',
            index: 1,
          },
        ],
        edges: [
          {
            source: 'a7515cc9',
            sourceAnchor: 2,
            target: 'e141626e',
            targetAnchor: 0,
            id: '841cf9b4',
            index: 2,
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
