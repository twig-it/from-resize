import { BehaviorSubject, Observable, Subject } from 'rxjs';

export const createCheckbox = (parentElement: HTMLElement, name: string, checked: boolean): Observable<boolean> => {
  const clickSubject: Subject<boolean> = new BehaviorSubject(checked);
  const element = document.createElement('input');
  element.setAttribute('type', 'checkbox');
  element.setAttribute('name', name);
  element.setAttribute('value', name);
  element.checked = checked;
  element.onclick = () => {
    clickSubject.next(element.checked);
  };

  const labelElement = document.createElement('label'); // <label for='${name}'> ${name} </label> `);
  labelElement.setAttribute('for', name);
  labelElement.innerHTML = name;

  parentElement.appendChild(element);
  parentElement.appendChild(labelElement);

  return clickSubject;
};
