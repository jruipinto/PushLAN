import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-developer-credit',
  templateUrl: './developer-credit.component.html',
  styleUrls: ['./developer-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperCreditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
