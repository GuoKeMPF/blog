import { Effect, Reducer } from 'umi';
export interface IndexModelState {
  file: object;
}
export interface ModelType {
  namespace: string;
  state: IndexModelState;
  effects: {};
  reducers: {
    save: Reducer<IndexModelState>;
  };
}
const Music: ModelType = {
  namespace: 'music',
  state: {
    file: {},
  },
  effects: {},
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default Music;
