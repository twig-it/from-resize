import { createButton } from './button/button';

export const addTopButtonAndChildDiv = (controlsElement: HTMLElement, chartsContainer: HTMLElement) => {
  createButton(controlsElement, 'Add Top Div').subscribe(button => {
    let topChildElement = document.querySelector('.top-child');
    const contentRowElement = chartsContainer.querySelector('.row')!;

    if (topChildElement) {
      chartsContainer.removeChild(topChildElement);
      button.innerText = 'Add Top Div';
    } else {
      topChildElement = document.createElement('div');
      topChildElement.className = 'top-child';
      chartsContainer.insertBefore(topChildElement, contentRowElement);
      button.innerText = 'Remove Top Div';
    }
  });
};

export const addLeftButtonAndChildDiv = (controlsElement: HTMLElement, chartsContainer: HTMLElement, chartParentElement: HTMLElement) => {
  createButton(controlsElement, 'Add Left Div').subscribe(button => {
    let leftChildElement = document.querySelector('.left-child');
    const contentRowElement = chartsContainer.querySelector('.row');

    if (leftChildElement) {
      contentRowElement?.removeChild(leftChildElement);
      button.innerText = 'Add Left Div';
    } else {
      leftChildElement = document.createElement('div');
      leftChildElement.className = 'left-child';
      contentRowElement?.insertBefore(leftChildElement, chartParentElement);
      button.innerText = 'Remove Left Div';
    }
  });
};
