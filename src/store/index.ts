import { createStore } from 'vuex';

interface AppState {
  prompt: string;
  music: string;
//   image: File | null;
}

export default createStore({
  state: {
    prompt: '',
    music: '',
  } as AppState,
  mutations: {
    setPrompt(state, value) {
      state.prompt = value;
    },
    setMusic(state, value) {
      state.music = value;
    },
    // setImage(state, value) {
    //     state.image = value;
    //   },
  },
});