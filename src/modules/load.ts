import {
  addClassToElement,
  removeClassFromElement,
  createContentUrlFromPath,
  getHtmlFromUrl,
  wait,
  log,
} from './utils';
import { setNewPath } from './navigation';
import { config } from './config';
import { elementReference } from './elements';
import { replaceNodesFromHtmlString } from './nodes';

//
// Fetch new content based on path and mount it in the DOM #content container
export const loadContent = async (
  path: string,
  useCallback = true,
  navigationDelay = false,
): Promise<void> => {
  const navigationDelayStart = navigationDelay ? performance.now() : 0;
  const url = createContentUrlFromPath(path);
  let html: string | null = null;
  try {
    html = await getHtmlFromUrl(url);
  } catch (err) {
    // TODO: Error control
    if (path !== config.pathFileNotFound) {
      return loadContent(config.pathFileNotFound);
    }
  }

  if (!!html && elementReference.content) {
    addClassToElement(elementReference.body, config.pageTransitionClassName);
    if (config.pageTransitionDuration > 0 && !!config.pageTransitionClassName) {
      log('Wait for page transition', config.pageTransitionDuration);
      await wait(config.pageTransitionDuration);
    }

    if (navigationDelay) {
      const delay =
        config.navigationPageLoadDelay -
        (performance.now() - navigationDelayStart);
      if (delay > 0) {
        log('Wait for navigation delay', delay);
        await wait(delay);
      }
    }
    replaceNodesFromHtmlString(elementReference.content, html);
    setNewPath(path);
    removeClassFromElement(
      elementReference.body,
      config.pageTransitionClassName,
    );
    if (useCallback) {
      config.callbackOnPageChange();
    }
  }
};
