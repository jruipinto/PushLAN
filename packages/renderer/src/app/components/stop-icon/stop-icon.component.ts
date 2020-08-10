import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stop-icon',
  templateUrl: './stop-icon.component.html',
  styleUrls: ['./stop-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
