import { switchMap, tap } from 'rxjs/operators';
import { fromResize } from '@twig-it/from-resize';
import { ResizeDirection } from '@twig-it/from-resize';
import { chartJsOptions } from './charts-options/chart-js';
import './styles.css';
import { Chart } from 'chart.js';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { createCheckbox } from './checkbox/checkbox';
import { createRadios } from './radio/radio';
import { addLeftButtonAndChildDiv, addTopButtonAndChildDiv } from './builder';

// Controls
const controlsElement: HTMLElement = document.querySelector('.controls')!;
const useResizeElement: HTMLElement = document.querySelector('.resize')!;
const watchDirectionElement: HTMLElement = document.querySelector('.watch-direction')!;

// Charts
const chartsContainerDiv: HTMLElement = document.querySelector('.charts-container')!;
const chartParentElement: HTMLElement = document.querySelector('.chart-parent')!;
const chartCanvasElement: HTMLCanvasElement = document.querySelector('.canvas-chart')! as HTMLCanvasElement;

// Use Resize Checkbox
const useResizeClicked$ = createCheckbox(useResizeElement, 'Enable From-Resize', false);
const directionClicked$ = createRadios(
  watchDirectionElement,
  'Watch Direction',
  [ResizeDirection.All, ResizeDirection.Horizontal, ResizeDirection.Vertical],
  ResizeDirection.All
) as Observable<ResizeDirection>;

// Add Buttons and Divs
addTopButtonAndChildDiv(controlsElement, chartsContainerDiv);
addLeftButtonAndChildDiv(controlsElement, chartsContainerDiv, chartParentElement);

// Add chart
const chartContext = chartCanvasElement.getContext('2d')!;
const chartObject = new Chart(chartContext, chartJsOptions);

// User Resize

combineLatest([useResizeClicked$, directionClicked$])
  .pipe(
    tap(([useResize]) => {
      !useResize ? watchDirectionElement.classList.add('hidden') : watchDirectionElement.classList.remove('hidden');
    }),
    switchMap(([useResize, direction]) =>
      useResize ? fromResize(chartParentElement, { direction: direction, emitOnStart: false }) : EMPTY
    )
  )
  .subscribe((dimension: ClientRect) => {
    chartObject.resize(dimension.width, dimension.height);
    console.log(`From Resize: -> Updated dimension ${dimension.width} height: ${dimension.height}`);
  });
