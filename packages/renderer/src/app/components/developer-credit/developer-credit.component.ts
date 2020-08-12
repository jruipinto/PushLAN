import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-developer-credit',
  templateUrl: './developer-credit.component.html',
  styleUrls: ['./developer-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperCreditComponent {

  constructor(private electronService: ElectronService) { }

  public openExternal(url: string): Promise<void> {
    return this.electronService.shell.openExternal(url);
  }

}
