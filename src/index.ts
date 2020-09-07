import { onLoad, onClick, onPopState, onKeyUp } from './modules/hooks';
import { setConfig, Config } from './modules/config';

export const init = (newConfig?: Partial<Config>) => {
  if (!!newConfig) {
    setConfig(newConfig);
  }
  window.onload = onLoad;
  window.onclick = onClick;
  window.onpopstate = onPopState;
  window.onkeyup = onKeyUp;
};
