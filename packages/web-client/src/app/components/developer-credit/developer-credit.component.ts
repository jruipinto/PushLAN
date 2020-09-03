import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-developer-credit',
  templateUrl: './developer-credit.component.html',
  styleUrls: ['./developer-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperCreditComponent {

  constructor() { }

  public openExternal(url: string): Window {
    return window.open(url, '_blank');
  }

}
