import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public filesList = [
    {
      name: 'Funny things',
      checked: true,
      type: 'folder'
    },
    {
      name: 'no1 funny thing',
      checked: false,
      type: 'file'
    },
    {
      name: 'also funny',
      checked: false,
      type: 'file'
    },
    {
      name: 'this is funny too',
      checked: false,
      type: 'file'
    }, {
      name: 'Funny things',
      checked: true,
      type: 'folder'
    },
    {
      name: 'another boring folder',
      checked: false,
      type: 'folder'
    }
  ]

  constructor() {
  }
}
