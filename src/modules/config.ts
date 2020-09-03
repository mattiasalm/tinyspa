const defaultConfig = {
  classNameActiveLinkInNavigation: 'active-link',
  classNameKeyboardNavigationActive: 'keyboard-nav',
  classNamePageTransition: '',
  classNameRemovalDelayPageTransition: 0,
  classNameRemovalDelaySplashLoading: 0,
  classNameSplashLoading: '',
  directoryContent: 'content',
  domSelectorBody: 'body',
  domSelectorContent: '#content',
  domSelectorNavigation: '#nav',
  loadIndexContentOnLoad: false,
  pathFileNotFound: '/404',
  pathToIndexContent: '/index', // the content to use for path '/'
  pathToNavigationContent: '', // empty to not load anything dynamically
  useServiceWorker: true,
};

export type Config = typeof defaultConfig;

export let config: Config = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Partial<Config>): Config =>
  (config = Object.assign(config, newConfig));
