import { fromResize } from '@twig-it/from-resize';
import { ResizeDirection } from '@twig-it/from-resize';
import './styles.css';

const containerDiv = document.getElementById('app-content');
const rowDiv = document.getElementById('row');

// Add contents
const child1: HTMLElement = document.createElement('div')!;
child1.className = 'child-1';
child1.appendChild(document.createElement('span'));

const child2: HTMLElement = document.createElement('div')!;
child2.className = 'child-2';
child2.appendChild(document.createElement('span'));

const child3: HTMLElement = document.createElement('div')!;
child3.className = 'child-3';
child3.appendChild(document.createElement('span'));

rowDiv!.appendChild(child1);
rowDiv!.appendChild(child2);
rowDiv!.appendChild(child3);

// First Child - ALL
fromResize(child1, { direction: ResizeDirection.All, emitOnStart: false }).subscribe(
  (dimension: ClientRect) =>
    (child1.children[0].innerHTML = `From Resize: direction ${ResizeDirection.All} -> Updated dimension ${dimension.width} height: ${dimension.height}`)
);

// Second Child - Horizontal
fromResize(child2, { direction: ResizeDirection.Horizontal, emitOnStart: false }).subscribe(
  (dimension: ClientRect) =>
    (child2.children[0].innerHTML = `From Resize: direction ${ResizeDirection.Horizontal} -> Updated width: ${dimension.width} height: ${dimension.height}`)
);

// Third Child - Horizontal
fromResize(child3, { direction: ResizeDirection.Vertical, emitOnStart: false }).subscribe(
  (dimension: ClientRect) =>
    (child3.children[0].innerHTML = `From Resize: direction ${ResizeDirection.Vertical} -> -> Updated width: ${dimension.width} height: ${dimension.height}`)
);

// Remove Button
const rowChildRemoveButton = document.createElement('button');
rowChildRemoveButton.innerText = child1.parentElement === rowDiv ? 'Remove Child 1' : 'Add Child 1';
rowChildRemoveButton.className = 'button';
rowChildRemoveButton.onclick = () => {
  if (child1.parentElement === rowDiv) {
    rowDiv?.removeChild(child1);
    rowChildRemoveButton.innerText = 'Add Child 1';
  } else {
    rowDiv?.insertBefore(child1, child2);
    rowChildRemoveButton.innerText = 'Remove Child 1';
  }
};
containerDiv?.appendChild(rowChildRemoveButton);
