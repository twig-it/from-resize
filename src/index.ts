import { filter, takeUntil } from 'rxjs/operators';
import { fromResize } from '@twig-it/from-resize';
import { ResizeDirection } from '@twig-it/from-resize';
import { chartJsOptions } from './charts-js-example/chart-js';
import './styles.css';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';

const chartsContainerDiv = document.getElementById('charts-container');

const chartParentElement: HTMLElement = document.getElementById('chart-parent')!;
const chartElement: HTMLCanvasElement = document.getElementById('canvas-chart')! as HTMLCanvasElement;

// Use Resize Checkbox
const useResizeCheckbox = document.getElementById('use-resize')! as HTMLInputElement;
useResizeCheckbox.checked = false;

// Resize Watch Direction
const resizeWatchRadios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="direction"]')!);
resizeWatchRadios[0].checked = true;
resizeWatchRadios.forEach(radio => {
  radio.onclick = () => {
    const selectedDirection = resizeWatchRadios.filter(radio => radio.checked).map(radio => radio.value)[0] as ResizeDirection;
    addResize(selectedDirection);
  };
});

// Remove Button
const rowChildRemoveButton = document.getElementById('remove-child')!;
const child1: HTMLElement = document.getElementById('child-1')!;
rowChildRemoveButton.onclick = () => {
  if (child1.parentElement === chartsContainerDiv) {
    chartsContainerDiv?.removeChild(child1);
    rowChildRemoveButton.innerText = 'Add Child 1';
  } else {
    chartsContainerDiv?.insertBefore(child1, chartParentElement);
    rowChildRemoveButton.innerText = 'Remove Child 1';
  }
};

// Add chart
const chartContext = chartElement.getContext('2d')!;
const chartObject = new Chart(chartContext, chartJsOptions);

// User Resize
const destroyed$ = new Subject();
const addResize = (direction: ResizeDirection) => {
  // Unsubscribe previous
  destroyed$.next();

  fromResize(chartParentElement, { direction: direction, emitOnStart: false })
    .pipe(
      filter(() => useResizeCheckbox.checked), // Only when useResize checkbox is selected
      takeUntil(destroyed$)
    )
    .subscribe((dimension: ClientRect) => {
      chartObject.resize(dimension.width, dimension.height);
      console.log(
        `From Resize: direction ${ResizeDirection.All} -> Updated dimension ${dimension.width} height: ${dimension.height} ${chartObject.aspectRatio}`
      );
    });
};

addResize(ResizeDirection.All);
