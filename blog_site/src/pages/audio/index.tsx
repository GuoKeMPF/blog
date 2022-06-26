import React, { useState, useEffect, Fragment } from 'react';
import type { FC } from 'react';
import { connect } from 'umi';
import type { AudioStateType, Dispatch } from 'umi';

import Visualization from './Visualization';
import Spin from '@/components/Spin';

interface PageProps {
  dispatch: Dispatch;
  loadingAudios: boolean;
  audios: AudioStateType.AudiosType;
}
const Audio: FC<PageProps> = ({ dispatch, loadingAudios, audios }) => {
  const [audio, setAudio] = useState<any>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await dispatch({
      type: 'audio/queryAudios',
    });
    console.log(res);

    setAudio(res[0]);
  };

  const swithcAudio = (step: number) => {
    const index = audios.findIndex((a) => a.id === audio.id);
    let nextIndex = index + step;
    if (index === audios.length - 1) {
      nextIndex = 0;
    }
    if (index < 0) {
      nextIndex = audios.length - 1;
    }
    const nextAudio = audios[nextIndex];
    setAudio(nextAudio);
  };

  return (
    <Spin loading={loadingAudios}>
      {audio && <Visualization swithcAudio={swithcAudio} config={audio} />}
    </Spin>
  );
};

const ConnectAudio = connect(
  ({ loading, audio }: { loading: any; audio: AudioStateType }) => ({
    loadingAudios: !!loading.effects['audio/queryAudios'],
    audios: audio.audios,
  }),
)(Audio);

export default ConnectAudio;
