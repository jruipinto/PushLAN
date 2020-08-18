import { Component } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileInput = document.getElementById('file') as any;
  constructor(private backend: FeathersService) {
    const myFile = this.fileInput.files[0] ?? null;
    this.fileInput.addEventListener('change', () => { console.log(myFile) });
  }

  uploadFile(uri: any) {
    this.backend.service('uploads').create({ uri });
  }
}
