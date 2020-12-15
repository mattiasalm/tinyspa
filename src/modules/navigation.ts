import { elementReference } from './elements';
import { setActiveLinks } from './utils';

export const currentPath = () => window.location.pathname;

export const setNewPath = (newPath: string) =>
  currentPath() === newPath
    ? undefined
    : history.pushState('', newPath, newPath);

export const closeMenu = () => {
  if (!!elementReference.menuToggle) {
    // Change this to use direct reference to input instead and check if it is a checkbox
    const inputElem = elementReference.menuToggle.querySelector('input');
    if (!!inputElem && inputElem.checked) {
      inputElem.checked = false;
    }
  }
};

export const setActiveLinksInMenu = () => {
  if (!!elementReference.navigation) {
    setActiveLinks(elementReference.navigation, currentPath());
  }
};
