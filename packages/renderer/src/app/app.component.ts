import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public webServerStarted = false;
  public webServerURL: string;
  public QR: string = null;
  public urlList = [
    'http://192.168.4.26:3030',
    'http://192.168.99.3:3030',
    'http://192.168.47.1:3030'
  ];

  constructor(private electronService: ElectronService) { }

  public startWebServer(): void {
    if (this.electronService.isElectronApp) {
      const mainsFeedback: any = this.electronService.ipcRenderer.sendSync('start-server');
      this.webServerStarted = mainsFeedback.webServerStarted ?? false;
      this.webServerURL = 'http://' + mainsFeedback.ip + ':3030';
      this.QR = this.webServerURL;
    } else {
      console.log('this.electronService.isElectronApp === false');
    }
  }

  public stopWebServer(): void {}
}
