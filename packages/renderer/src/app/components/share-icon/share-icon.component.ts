import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-share-icon',
  templateUrl: './share-icon.component.html',
  styleUrls: ['./share-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
