import { Component } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private backend: FeathersService) { }

  uploadFile(){
  }
}
