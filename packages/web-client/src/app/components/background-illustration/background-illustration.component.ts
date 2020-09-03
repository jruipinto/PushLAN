import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-background-illustration',
  templateUrl: './background-illustration.component.html',
  styleUrls: ['./background-illustration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundIllustrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
