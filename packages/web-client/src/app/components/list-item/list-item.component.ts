import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilesService } from 'src/app/shared/services/files.service';
import { ListItem } from './list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  @Input() file: ListItem;
  constructor(private filesService: FilesService) { }

  ngOnInit(): void {
  }
  openFolder(item: ListItem): void {
    if (item.isDirectory) {
      this.filesService.find$({ query: { path: item.path } }).subscribe();
    }
  }

}
