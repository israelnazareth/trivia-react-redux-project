import {
  SAVE_COUNTER,
  STOP_INTERVAL,
  DISABLE_BUTTON,
  NEXT_QUESTION,
  RESET_GAME,
} from '../actions';

const INITIAL_STATE = {
  timer: 30,
  counterStoped: false,
  btnDisable: false,
  globalController: 0,
  score: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_COUNTER:
    return {
      ...state,
      timer: action.data.timer,
    };
  case STOP_INTERVAL:
    return {
      ...state,
      counterStoped: true,
    };
  case DISABLE_BUTTON:
    return {
      ...state,
      btnDisable: true,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      globalController: state.globalController + 1,
      score: action.data.data,
      timer: 30,
      counterStoped: false,
    };
  case RESET_GAME:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default triviaReducer;
