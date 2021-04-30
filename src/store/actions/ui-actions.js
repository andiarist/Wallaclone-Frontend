import { UI_RESET, UI_SET_ALERT } from '../constants/action-types';

/** UI ACTIONS */
// TODO: crear acciones relacionadas con la interfaz de usuario
export const uiReset = () => ({
  type: UI_RESET,
});
export const uiSetAlert = alert => ({
  type: UI_SET_ALERT,
  payload: alert,
});

export const showFlashAlert = (alert, timeout = 2000) => dispatch => {
  dispatch(uiSetAlert(alert));

  setTimeout(() => {
    dispatch(uiReset());
  }, timeout);
};
