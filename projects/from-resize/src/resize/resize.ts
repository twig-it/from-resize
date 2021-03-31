import { Observable } from "rxjs";

export const fromResize: (
  element: Element,
  options?: ResizeOptions
) => Observable<ClientRect> = (
  element: Element,
  options?: Partial<ResizeOptions>
) =>
  new Observable((subscriber) => {
    const resolvedOptions = {
      ...options,
      ...{ direction: ResizeDirection.All, emitOnStart: true },
    };

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === element) {
          subscriber.next(entry.contentRect);
        }
      });
    });

    resizeObserver.observe(element);

    if (resolvedOptions.emitOnStart) {
      subscriber.next(element.getBoundingClientRect());
    }

    return () => resizeObserver.disconnect();
  });

export interface ResizeOptions {
  emitOnStart: boolean;
  direction: ResizeDirection;
}

export const enum ResizeDirection {
  All = "all",
  Horizontal = "horizontal",
  Vertical = "vertical",
}
