import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  alternativeURLs: string[] = [];
  folderToShare: string = null;
  QR: string = null;
  webServerStarted = false;
  webServerURL: string;

  constructor(private electron: ElectronService) { }

  // Start web-server and share folderToShare
  startServing(folderToShare: string): void {
    if (this.electron.isElectronApp) {
      const {
        webServerStarted,
        netAdpaters
      } = this.electron.ipcRenderer.sendSync('start-serving', folderToShare);
      this.webServerStarted = webServerStarted ?? false;
      this.alternativeURLs = netAdpaters.map(netAdpater => 'http://' + netAdpater.address + ':3030');
      this.webServerURL = this.alternativeURLs[0];
      this.QR = this.webServerURL;
    } else {
      console.log('this.electron.isElectronApp === false');
    }
  }

  // Stop web-server
  stopServing(): void {
    this.electron.remote.app.quit();
  }

  // Show file explorer to let user select sharedFolder
  async selectFolder(): Promise<void> {
    this.folderToShare = await this.electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(({ filePaths }) => filePaths[0])
      .catch(err => {
        this.electron.remote.dialog.showErrorBox('Error with choosen folder', err);
        return '';
      });
  }
}
