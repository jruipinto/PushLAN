import { Component, AfterViewInit } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';
import { ListItem } from './components/list-item/list-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public filesList: ListItem[];
  public filesService = this.backend.service('files');
  public filesListPromise = this.filesService.find().then(rootPath => rootPath.children) as Promise<ListItem[]>;

  constructor(private backend: FeathersService) {
  }
  async ngAfterViewInit(): Promise<void> {
    this.filesList = await this.filesListPromise;
    this.filesService.on('created', async () => {
      this.filesList = await this.filesListPromise;
    });
  }
}
