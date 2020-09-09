import { Component, AfterViewInit } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';
import { ListItem } from './components/list-item/list-item.model';
import { getFilesListFrom } from './functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public filesList: ListItem[];
  public filesService = this.backend.service('files');

  constructor(private backend: FeathersService) {
  }
  async ngAfterViewInit(): Promise<void> {
    this.filesList = await getFilesListFrom(this.filesService);
    this.filesService.on('created', async () => {
      this.filesList = await getFilesListFrom(this.filesService);
    })
  }
}
