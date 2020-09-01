import { Component, AfterViewInit } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';
import { setErrorInLabel, setSuccessInLabel, writeTheFollowing } from './functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  public apiURL = window.location.href + 'files';
  public uploadLbl = document.getElementById('files_input_label');

  constructor(private backend: FeathersService) {
  }

  ngAfterViewInit(): void {
    function logFile(file): void {
      console.log('New file was uploaded:', file);
      this.backend.service('files').find()
        .then(result => { console.log('results:', result); })
        .catch(err => { console.log('error finding files:', err); });
    }
    this.backend.service('files').on('created', logFile);
  }

  public upload(filesList): void {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    function handleXHRError(err): void {
      setErrorInLabel(this.uploadLbl);
      console.log(err);
    }
    function handleXHRLoad(load): void {
      setSuccessInLabel(this.uploadLbl);
      console.log('LOAD result:', load);
    }
    function handleXHRProgress(progress): void {
      const { total, loaded } = progress;
      const progressPercent = `${Math.round((loaded * 100) / total)}%`;
      writeTheFollowing(progressPercent).to(this.uploadLbl);
      console.log('progress:', progressPercent);
    }
    xhr.upload.addEventListener('error', handleXHRError);
    xhr.upload.addEventListener('load', handleXHRLoad);
    xhr.upload.addEventListener('progress', handleXHRProgress);
    Array.from(filesList).forEach((file: any) => {
      formData.append('file', file);
    });
    xhr.open('POST', this.apiURL);
    xhr.send(formData);
  }
}
