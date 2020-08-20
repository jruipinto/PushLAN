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
    console.log(file);
    const uploadService = this.backend.service('uploads');
    const reader = new FileReader();
    // when encoded, upload
    reader.onload = () => uploadService
      .create({ uri: reader.result, id: file.name })
      .then(response => {
        // success
        console.log('Server responded with: ', response);
      })
      .catch(alert);
    // encode dataURI
    reader.readAsDataURL(file);

  }
}
