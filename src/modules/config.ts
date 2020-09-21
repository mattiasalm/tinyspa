const defaultConfig = {
  // tslint:disable-next-line
  callbackOnLoad: () => {},
  // tslint:disable-next-line
  callbackOnPageChange: () => {},
  contentDirectory: 'content',
  domSelectorBody: 'body',
  domSelectorContent: 'main',
  domSelectorMenuToggle: '#menu',
  domSelectorNavigation: 'nav',
  loadIndexContentOnLoad: false,
  navigationActiveLinkClassName: 'active-link',
  navigationUsingKeyboardClassName: 'keyboard-nav',
  navigationPageLoadDelay: 0,
  pageTransitionClassName: '',
  pageTransitionDuration: 0,
  pathFileNotFound: '/404',
  pathToIndexContent: '/index',
  useServiceWorker: true,
  useVerboseLogging: false,
};

export type Config = typeof defaultConfig;

export let config: Config = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Partial<Config>): Config =>
  (config = Object.assign(config, newConfig));
