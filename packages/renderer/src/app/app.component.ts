import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public webServerStarted = false;

  constructor(private electronService: ElectronService) { }

  public startWebServer(): void {
    if (this.electronService.isElectronApp) {
      const mainsFeedback: boolean = this.electronService.ipcRenderer.sendSync('start-server');
      this.webServerStarted = mainsFeedback ?? false;
    } else {
      console.log('this.electronService.isElectronApp === false');
    }
  }
}
