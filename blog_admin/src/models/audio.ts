import { queryAudios, queryAudioByID } from '@/services/audio';
import { Effect, Reducer } from 'umi';
export namespace AudioStateType {
  export type AudioType = {
    id: string;
    src: string;
    create_time?: string;
    name: string;
    description: string;
    unique_name: string;
  };
  export type AudiosType = AudioType[];
}

export interface AudioStateType {
  audios: AudioStateType.AudiosType;
}

export interface ModelType {
  namespace: string;
  state: AudioStateType;
  effects: {
    queryAudios: Effect;
    queryAudioByID: Effect;
  };
  reducers: {
    update: Reducer<AudioStateType>;
    reset: Reducer<AudioStateType>;
  };
}
const initState: AudioStateType = {
  audios: [],
};

const Audio: ModelType = {
  namespace: 'audio',
  state: initState,
  effects: {
    *queryAudios({ payload }, { put, call }) {
      console.log('effect');
      const response: { data: AudioStateType.AudiosType; count: number } = yield call(
        queryAudios,
        payload,
      );
      if (response) {
        yield put({
          type: 'update',
          payload: {
            audios: [...response.data],
            total: response.count,
          },
        });
        return response.data;
      }
    },
    *queryAudioByID({ payload }, { call }) {
      const response: { data: AudioStateType.AudiosType } = yield call(queryAudioByID, payload);
      if (response) {
        return response.data;
      }
    },
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset() {
      return initState;
    },
  },
};
export default Audio;
