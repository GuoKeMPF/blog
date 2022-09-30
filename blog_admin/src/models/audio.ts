import { queryAudios, queryAudioByID, addAudio, addAudios, deleteAudio } from '@/services/audio';

import { ifResponseSuccess } from '@/utils/ifResponseSuccess';
import type { ResponseType } from '@/utils/ifResponseSuccess';

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
      const response: ResponseType = yield call(queryAudios, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      if (body) {
        yield put({
          type: 'update',
          payload: {
            audios: [...body.data],
            total: body.count,
          },
        });
        return body.data;
      }
    },
    *addAudio({ payload }, { put, call }) {
      const response: ResponseType = yield call(addAudio, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
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
    },
    *addAudios({ payload }, { put, call }) {
      const response: ResponseType = yield call(addAudios, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
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
    },

    *queryAudioByID({ payload }, { call }) {
      const response: ResponseType = yield call(queryAudioByID, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      const { body } = response;
      return body.data;
    },
    *deleteAudio({ payload }, { put, call }) {
      const response: ResponseType = yield call(deleteAudio, payload);
      if (!ifResponseSuccess(response)) {
        return;
      }
      yield put({
        type: 'queryAudios',
        payload,
      });
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
