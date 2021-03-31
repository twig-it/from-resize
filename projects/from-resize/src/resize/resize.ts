import { Observable } from "rxjs";

export const fromResize: (
  element: Element,
  options?: ResizeOptions
) => Observable<ClientRect> = (
  element: Element,
  options: ResizeOptions = { emitOnStart: true }
) =>
  new Observable((subscriber) => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry: { target: Element; contentRect: ClientRect }) => {
        if (entry.target === element) {
          subscriber.next(entry.contentRect);
        }
      });
    });

    resizeObserver.observe(element);

    if (options.emitOnStart) {
      subscriber.next(element.getBoundingClientRect());
    }

    return () => resizeObserver.disconnect();
  });

export interface ResizeOptions {
  emitOnStart: boolean;
}
