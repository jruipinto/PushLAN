import { Injectable } from '@angular/core';
import { ListItem } from 'src/app/components/list-item/list-item.model';
import { UIStateAbstraction } from 'src/app/shared/abstraction-classes';

export interface UI {
  currentFolderPath: string;
  currentFolderItems: ListItem[];
}

const defaults: UI = {
  currentFolderPath: '/',
  currentFolderItems: []
};

@Injectable({ providedIn: 'root' })
export class UIService extends UIStateAbstraction {

  constructor() {
    super(defaults);
  }

}
