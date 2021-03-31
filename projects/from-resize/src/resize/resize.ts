import { defaultsDeep } from 'lodash-es';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, pairwise, startWith } from 'rxjs/operators';

export const fromResize: (element: Element, options?: Partial<ResizeOptions>) => Observable<ClientRect> = (
  element: Element,
  options?: Partial<ResizeOptions>
) => {
  const resolvedOptions: ResizeOptions = defaultsDeep(options, { direction: ResizeDirection.All, emitOnStart: true, debounceTime: 200 });
  const initialRect = element.getBoundingClientRect();

  let resize$ = buildResize(element).pipe(debounceTime(resolvedOptions.debounceTime));

  if (resolvedOptions.direction !== ResizeDirection.All) {
    resize$ = withDirectionFilter(resize$, resolvedOptions.direction, initialRect);
  }

  if (resolvedOptions.emitOnStart) {
    resize$ = resize$.pipe(startWith(initialRect));
  }

  return resize$;
};

const buildResize = (element: Element): Observable<ClientRect> =>
  new Observable(subscriber => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === element) {
          subscriber.next(entry.contentRect);
        }
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  });

const withDirectionFilter = (resize$: Observable<ClientRect>, direction: ResizeDirection, initialRect: ClientRect) => {
  return resize$.pipe(
    startWith(initialRect),
    pairwise(),
    filter(([previous, current]) => {
      console.log('direction: ' + direction + ' previous:' + previous.height + ' current: ' + current.height);
      switch (direction) {
        case ResizeDirection.Horizontal:
          return previous.width !== current.width;
        case ResizeDirection.Vertical:
          return previous.height !== current.height;
        case ResizeDirection.All:
        default:
          return true;
      }
    }),
    map(([_, current]) => current)
  );
};

export interface ResizeOptions {
  emitOnStart: boolean;
  direction: ResizeDirection;
  debounceTime: number;
}

export const enum ResizeDirection {
  All = 'all',
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}
