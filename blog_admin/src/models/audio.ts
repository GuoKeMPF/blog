import { queryAudios, queryAudioByID, addAudio, addAudios, deleteAudio } from '@/services/audio';
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
  visiable: boolean;
}

export interface ModelType {
  namespace: string;
  state: AudioStateType;
  effects: {
    queryAudios: Effect;
    queryAudioByID: Effect;
    addAudio: Effect;
    addAudios: Effect;
    deleteAudio: Effect;
  };
  reducers: {
    update: Reducer<AudioStateType>;
    reset: Reducer<AudioStateType>;
    setVisiable: Reducer<AudioStateType>;
  };
}
const initState: AudioStateType = {
  audios: [],
  visiable: false,
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
    *addAudio({ payload }: any, { put, call }: any) {
      const response: ResponseDateType = yield call(addAudio, payload);
      if (response) {
        yield put({
          type: 'queryAudios',
          payload,
        });
      }
    },
    *addAudios({ payload }: any, { put, call }: any) {
      const response: ResponseDateType = yield call(addAudios, payload);
      if (response) {
        yield put({
          type: 'queryAudios',
          payload,
        });
      }
    },

    *queryAudioByID({ payload }, { call }) {
      const response: { data: AudioStateType.AudiosType } = yield call(queryAudioByID, payload);
      if (response) {
        return response.data;
      }
    },
    *deleteAudio({ payload }: any, { put, call }: any) {
      const response: ResponseDateType = yield call(deleteAudio, payload);
      if (!response) {
        return;
      }
      if (response) {
        yield put({
          type: 'queryAudios',
          payload,
        });
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
    setVisiable(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Audio;
