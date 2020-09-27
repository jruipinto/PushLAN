import { Component, AfterViewInit } from '@angular/core';
import { FilesService } from './shared/services/files.service';
import { UIService } from 'src/app/shared/state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public filesList$ = this.uiService.state$.pipe(map(ui => ui.currentFolderItems));

  constructor(
    private uiService: UIService,
    private filesService: FilesService
  ) {
  }
  async ngAfterViewInit(): Promise<void> {
    this.filesService.find$().subscribe();
    this.filesService.onCreated$().subscribe();
  }
}
