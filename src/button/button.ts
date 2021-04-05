import { Observable, ReplaySubject, Subject } from 'rxjs';

export const createButton = (parentElement: HTMLElement, name: string): Observable<HTMLElement> => {
  const clickSubject: Subject<HTMLElement> = new ReplaySubject();
  const element = document.createElement('button');
  element.innerHTML = name;
  element.className = 'button';

  element.onclick = () => clickSubject.next(element);

  clickSubject.next(element);
  parentElement.appendChild(element);
  return clickSubject;
};
