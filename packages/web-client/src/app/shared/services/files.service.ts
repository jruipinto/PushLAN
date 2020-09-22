import { Injectable } from '@angular/core';
import { from, fromEvent, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { UIService } from '../state';
import { FeathersService } from './feathers.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  filesAPI = this.feathers.service('files');

  constructor(
    private feathers: FeathersService,
    private uiService: UIService
  ) { }

  find$(query?: any): Observable<any> {
    return from(this.filesAPI.find(query))
      .pipe(
        tap(
          files => this.uiService.patchState({
            currentFolderPath: query?.query?.path ?? '/',
            currentFolderItems: files
          }).subscribe()
        )
      );
  }
  onCreated$(): Observable<any> {
    return fromEvent(this.filesAPI, 'created')
      .pipe(
        concatMap(() => this.find$())
      );
  }
}
