import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ListItem } from './list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  @Input() file: ListItem;
  constructor() { }

  ngOnInit(): void {
  }

}
