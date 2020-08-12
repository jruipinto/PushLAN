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
  public sharedFolder: string = null;

  constructor(private electronService: ElectronService) { }

  public startWebServer(): void {
    if (this.electronService.isElectronApp) {
      const {
        webServerStarted,
        netAdpaters
      } = this.electronService.ipcRenderer.sendSync('start-server', this.sharedFolder);
      this.webServerStarted = webServerStarted ?? false;
      this.urlList = netAdpaters.map(netAdpater => 'http://' + netAdpater.address + ':3030');
      this.QR = this.urlList[0];
    } else {
      console.log('this.electronService.isElectronApp === false');
    }
  }

  public stopWebServer(): void { }

  public searchFolderToShare(): void {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(({ filePaths }) => this.sharedFolder = filePaths[0])
      .catch(err => {
        this.electronService.remote.dialog.showErrorBox('Error with choosen folder', err);
      });
  }
}
