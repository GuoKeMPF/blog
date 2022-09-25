import { queryAudios, queryAudioByID, addAudio, addAudios, deleteAudio } from '@/services/audio';
import type { Effect, Reducer } from 'umi';
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
      const response: { data: AudioStateType.AudiosType; count: number } = yield call(
        queryAudios,
        payload,
      );
      const { data } = response;
      if (data) {
        yield put({
          type: 'update',
          payload: {
            audios: [...data],
            total: data.count,
          },
        });
        return response.data;
      }
    },
    *addAudio({ payload }, { put, call }) {
      const response: ResponseDateType = yield call(addAudio, payload);
      const { data } = response;
      if (data) {
        yield put({
          type: 'queryAudios',
          payload,
        });
        yield put({
          type: 'setVisiable',
          payload: {
            visiable: false,
          },
        });
      }
    },
    *addAudios({ payload }, { put, call }) {
      const response: ResponseDateType = yield call(addAudios, payload);
      const { data } = response;
      if (data) {
        yield put({
          type: 'queryAudios',
          payload,
        });
        yield put({
          type: 'setVisiable',
          payload: {
            visiable: false,
          },
        });
      }
    },

    *queryAudioByID({ payload }, { call }) {
      const response: { data: { data: AudioStateType.AudiosType } } = yield call(
        queryAudioByID,
        payload,
      );

      const { data } = response;
      if (data) {
        return data.data;
      }
    },
    *deleteAudio({ payload }, { put, call }) {
      console.log('deleteAudio');

      const response: ResponseDateType = yield call(deleteAudio, payload);

      const { data } = response;

      if (!data) {
        return;
      }
      if (data) {
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
