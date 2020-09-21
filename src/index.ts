import { onLoad, onClick, onPopState, onKeyUp } from './modules/hooks';
import { setConfig, Config, config } from './modules/config';
import {
  log,
  addClassToElement,
  removeClassFromElement,
} from './modules/utils';
import { elementReference } from './modules/elements';

export const init = (newConfig?: Partial<Config>) => {
  if (!!newConfig) {
    setConfig(newConfig);
    log('New Config set', config);
  }
  window.onload = onLoad;
  window.onclick = onClick;
  window.onpopstate = onPopState;
  window.onkeyup = onKeyUp;
};

export const bodyElementClass = {
  add: (className: string) =>
    addClassToElement(elementReference.body, className),
  remove: (className: string) =>
    removeClassFromElement(elementReference.body, className),
};
