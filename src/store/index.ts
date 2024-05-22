import { createStore } from 'vuex';

interface AppState {
  prompt: string;
  music: string;
  video: string;
  mode: string;
  ImgURL: string;
}

export default createStore({
  state: {
    prompt: '',
    music: '',
    video: '',
    mode: '',
    ImgURL: '',
  } as AppState,
  mutations: {
    setPrompt(state, value) {
      state.prompt = value;
    },
    setMusic(state, value) {
      state.music = value;
    },
    setMode(state, value) {
      state.mode = value;
    },
    setImage(state, value) {
      state.ImgURL = value;
    },
    setVideo(state,value) {
      state.video = value;
    }
  },
});