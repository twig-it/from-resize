import { BehaviorSubject, Observable, Subject } from 'rxjs';

export const createRadios = (parentElement: HTMLElement, name: string, values: string[], selected: string): Observable<string> => {
  const clickSubject: Subject<string> = new BehaviorSubject(selected);
  values
    .map(value => {
      const element = document.createElement('input');
      element.setAttribute('type', 'radio');
      element.setAttribute('name', name);
      element.setAttribute('value', value);
      element.checked = value === selected;

      const labelElement = document.createElement('label'); // <label for='${name}'> ${name} </label> `);
      labelElement.setAttribute('for', name);
      labelElement.innerHTML = value;

      parentElement.appendChild(element);
      parentElement.appendChild(labelElement);

      return element;
    })
    .forEach((element, _, allElements) => {
      element.onclick = () => {
        const selected: string | undefined = allElements.filter(radio => radio.checked).map(radio => radio.value)[0];
        clickSubject.next(selected);
      };
    });

  return clickSubject;
};
