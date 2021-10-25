import {
  SAVE_COUNTER,
  STOP_INTERVAL,
  DISABLE_BUTTON,
  RESTART_TIMER,
  NEXT_QUESTION,
} from '../actions';

const INITIAL_STATE = {
  timer: 30,
  interval: 1000,
  btnDisable: false,
  globalController: 0,
  score: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_COUNTER:
    return {
      ...state,
      timer: action.data.timer + 1,
    };
  case STOP_INTERVAL:
    return {
      ...state,
      interval: 0,
    };
  case DISABLE_BUTTON:
    return {
      ...state,
      btnDisable: true,
    };
  case RESTART_TIMER:
    return {
      ...state,
      timer: 30,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      globalController: state.globalController + 1,
      score: action.data.data,
    };
  default:
    return state;
  }
};

export default triviaReducer;
