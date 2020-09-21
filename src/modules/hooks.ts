import {
  removeClassFromElement,
  addClassToElement,
  isRelativeUrl,
  isMac,
} from './utils';
import { loadContent } from './load';
import { currentPath, setActiveLinksInMenu, closeMenu } from './navigation';
import { config } from './config';
import { elementReference } from './elements';

//
// On window load event (when all linked resources has been loaded)
// read path from window URL and load content corresponding to that
// also load nav content
const onLoad = () => {
  let contentToLoad: Promise<any>[] = [];

  if (currentPath() !== '/' || config.loadIndexContentOnLoad) {
    contentToLoad = [...contentToLoad, loadContent(currentPath(), false)];
  }

  Promise.all(contentToLoad).then(() => {
    setActiveLinksInMenu();
  });

  if (config.useServiceWorker && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js');
  }

  config.callbackOnLoad();
};

//
// Catch all click events that has and anchor as target
// and prevent all relative link paths from reloading the page.
// Load the new content in the #content container instead
const onClick = (event: MouseEvent) => {
  // Turn of keyboard navigation highlight
  if (event.clientX && event.clientY) {
    removeClassFromElement(
      elementReference.body,
      config.navigationUsingKeyboardClassName,
    );
  }

  if (event.target instanceof Element) {
    const clickedElement: Element = event.target;

    // Dont do anything if the clicked target is not an A-tag
    if (clickedElement.tagName.toLowerCase() !== 'a') {
      return;
    }

    // Check if the path is relative to this site
    const path = clickedElement.getAttribute('href');
    if (!!path && isRelativeUrl(path)) {
      // Check if the link target is intended to be opened in a new tab or window.
      const newTab = (isMac() && event.metaKey) || (!isMac() && event.ctrlKey);
      const newWindow = event.shiftKey;

      if (newTab || newWindow) {
        return;
      }

      // Load new content based on relative link path
      event.preventDefault();
      closeMenu();
      loadContent(path, true, true).then(() => setActiveLinksInMenu());
    }
  }
};

//
// When back button is clicked in browser update the content
// corresponding to the path
const onPopState = (event: PopStateEvent) => {
  event.preventDefault();
  closeMenu();
  loadContent(currentPath()).then(() => setActiveLinksInMenu());
};

const onKeyUp = (event: KeyboardEvent) => {
  // If using TAB key to navigate; enable keyboard navigation classname to body
  if (event.key === 'Tab') {
    addClassToElement(
      elementReference.body,
      config.navigationUsingKeyboardClassName,
    );
  }

  // Close the menu by pressing ESC if it is open
  if (event.key === 'Escape') {
    closeMenu();
  }
};

export { onLoad, onClick, onPopState, onKeyUp };
