import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public webServerStarted = false;
  public webServerIPAddress: string;
  public QR: string = null;

  constructor(private electronService: ElectronService) { }

  public startWebServer(): void {
    if (this.electronService.isElectronApp) {
      const mainsFeedback: any = this.electronService.ipcRenderer.sendSync('start-server');
      this.webServerStarted = mainsFeedback.webServerStarted ?? false;
      this.webServerIPAddress = mainsFeedback.ip;
      this.QR = 'http://' + this.webServerIPAddress + ':3030';
    } else {
      console.log('this.electronService.isElectronApp === false');
    }
  }
}
