import { SAVE_COUNTER, STOP_INTERVAL, DISABLE_BUTTON } from '../actions';

const INITIAL_STATE = {
  timer: 30,
  interval: 1000,
  btnDisable: false,
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
  default:
    return state;
  }
};

export default triviaReducer;
