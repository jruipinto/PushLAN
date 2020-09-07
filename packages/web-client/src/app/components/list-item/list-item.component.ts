import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListItem } from './list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  public file: ListItem;
  constructor() { }

  ngOnInit(): void {
    this.file = {
      type: 'file',
      name: 'funny thing',
      checked: false
    };
  }

}
