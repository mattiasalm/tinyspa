import { onLoad, onClick, onPopState, onKeyUp } from './modules/hooks';
import { setConfig, Config } from './modules/config';

export const init = (newConfig?: Partial<Config>) => {
  window.onload = onLoad;
  window.onclick = onClick;
  window.onpopstate = onPopState;
  window.onkeyup = onKeyUp;

  if (!!newConfig) {
    setConfig(newConfig);
  }
};
