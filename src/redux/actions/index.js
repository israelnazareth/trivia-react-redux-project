export const SAVE_USER = 'SAVE_USER';
export const SAVE_COUNTER = 'SAVE_COUNTER';

export const saveUser = (data) => ({ type: SAVE_USER, data });

export const saveCounter = (data) => ({ type: SAVE_COUNTER, data });
