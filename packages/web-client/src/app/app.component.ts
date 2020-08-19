import { Component } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private backend: FeathersService) {
  }


  uploadFile(event: any): void {
    const [file] = event.target?.files;
    const uploadService = this.backend.service('uploads');
    const reader = new FileReader();
    // when encoded, upload
    reader.addEventListener('load', () => {
      console.log('encoded file: ', reader.result);
      const upload = uploadService
        .create({ uri: reader.result })
        .then(response => {
          // success
          alert('UPLOADED!! ');
          console.log('Server responded with: ', response);
        });
    }, false);

  }
}
