import { SAVE_COUNTER } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_COUNTER:
    return {
      timer: action.data.timer + 1,
    };
  default:
    return state;
  }
};

export default triviaReducer;
