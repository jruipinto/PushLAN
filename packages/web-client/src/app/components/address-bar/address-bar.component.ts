import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
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
  constructor(private uiService: UIService) { }

}
