import { config } from './config';

// Remove leading slash in string
export const stripLeadingSlash = (str: string) => str.replace(/^\/+/i, '');

export const log = (...args: any) => {
  if (config.useVerboseLogging) {
    console.log(args);
  }
};

export const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms > 0 ? ms : 0));

//
// Check if url is considered to be a relative path
export const isRelativeUrl = (url: string) =>
  url.indexOf('://') < 1 && url.indexOf('//') !== 0 && url.substr(0, 1) === '/';

//
// Check if is running on a Mac
export const isMac = () => window.navigator.appVersion.includes('Mac');

//
// Create full URL from path and append content folder and extension
export const createContentUrlFromPath = (path: string) => {
  let newPath = stripLeadingSlash(path);
  if (newPath === '') {
    newPath = config.pathToIndexContent;
  }
  return `${config.contentDirectory}/${newPath}.html`;
};

//
// Add class on all links that match current path
// and remove class on the others
export const setActiveLinks = (parent: Element, currentPath: string) => {
  if (!(parent instanceof Element)) {
    return;
  }

  const linkElements = parent.querySelectorAll('a');
  const links = [...Array.from(linkElements)];

  // Set inactive
  links.forEach((link) =>
    removeClassFromElement(link, config.navigationActiveLinkClassName),
  );

  // Set active
  links
    .filter(
      (link) =>
        !!link.getAttribute('href') &&
        stripLeadingSlash(link.getAttribute('href') || '') ===
          stripLeadingSlash(currentPath),
    )
    .forEach((link) =>
      addClassToElement(link, config.navigationActiveLinkClassName),
    );
};

export const removeClassFromElement = (
  element: Element | null,
  className: string,
) => {
  if (element instanceof Element && !!className) {
    element.classList.remove(className);
  }
};

export const addClassToElement = (
  element: Element | null,
  className: string,
) => {
  if (element instanceof Element && !!className) {
    element.classList.add(className);
  }
};

//
// Async fetch content from URL and return as text
export const getHtmlFromUrl = async (url: string) => {
  const response = await fetch(url);
  if (response.status >= 400 && response.status < 600) {
    throw new Error('File not found');
  }
  return await response.text();
};
