import { Component, ChangeDetectionStrategy } from '@angular/core';
import { concatMap, first, map } from 'rxjs/operators';
import { FilesService } from 'src/app/shared/services/files.service';
import { UIService, UI } from 'src/app/shared/state';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBarComponent {
  public currentFolderPath$ = this.uiService.state$
    .pipe(
      map((uiState: UI) => uiState.currentFolderPath)
    );
  constructor(
    private uiService: UIService,
    private filesService: FilesService
  ) { }

  navigateBack(): void {
    // impure function (manually tested - working ok)
    this.currentFolderPath$.pipe(
      first(),
      concatMap(currentFolderPath => {
        const path = currentFolderPath
          .replace(/\\/g, '/')
          .replace(/\/$/, '')
          .split('/')
          .slice(0, -1)
          .reduce((acc, curr) => acc + curr + '/', '/')
          .replace(/^\/{2,}/, '/');
        return this.filesService.find$({ query: { path } });
      })
    ).subscribe();
  }

}
