import { createStore } from 'vuex';

interface AppState {
  prompt: string;
  music: string;
  ImgURL: string;
}

export default createStore({
  state: {
    prompt: '',
    music: '',
    ImgURL: '',
  } as AppState,
  mutations: {
    setPrompt(state, value) {
      state.prompt = value;
    },
    setMusic(state, value) {
      state.music = value;
    },
    setImage(state, value) {
      state.ImgURL = value;
    },
  },
});