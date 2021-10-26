export const SAVE_USER = 'SAVE_USER';
export const SAVE_COUNTER = 'SAVE_COUNTER';
export const STOP_INTERVAL = 'STOP_INTERVAL';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const RESET_GAME = 'RESET_GAME';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const saveUser = (data) => ({ type: SAVE_USER, data });

export const saveCounter = (data) => ({ type: SAVE_COUNTER, data });

export const stopInterval = () => ({ type: STOP_INTERVAL });

export const disableButton = (data) => ({ type: DISABLE_BUTTON, data });

export const resetGame = () => ({ type: RESET_GAME });

export const nextQuestion = (data) => ({ type: NEXT_QUESTION, data });
