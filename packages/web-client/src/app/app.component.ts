import { Component, AfterViewInit } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';
import { ListItem } from './components/list-item/list-item.model';
import { UIService, UI } from 'src/app/shared/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public filesList: ListItem[];
  public filesService = this.backend.service('files');
  public filesListPromise = this.filesService.find().then(rootPath => rootPath.children) as Promise<ListItem[]>;

  constructor(
    private backend: FeathersService,
    private uiService: UIService
  ) {
  }
  async ngAfterViewInit(): Promise<void> {
    this.uiService.patchState({ currentFolderItems: await this.filesListPromise }).subscribe();
    this.filesList = await this.filesListPromise;
    this.filesService.on('created', async () => {
      this.filesList = await this.filesListPromise;
    });
  }
}
