import { Component, AfterViewInit } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';
import { setErrorInLabel, setSuccessInLabel, writeTheFollowing } from './functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private backend: FeathersService) {
  }

  ngAfterViewInit(): void {
    const logFile = (file): void => {
      console.log('New file was uploaded:', file);
      this.backend.service('files').find()
        .then(result => { console.log('results:', result); })
        .catch(err => { console.log('error finding files:', err); });
    }
    this.backend.service('files').on('created', logFile);
  }

  public upload(filesList): void {
    const apiURL = window.location.href + 'files';
    const uploadLbl = document.getElementById('files_input_label');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const handleXHRError = (err): void => {
      setErrorInLabel(uploadLbl);
      console.log(err);
    }
    const handleXHRLoad = (load): void => {
      setSuccessInLabel(uploadLbl);
      console.log('LOAD result:', load);
    }
    const handleXHRProgress = (progress): void => {
      const { total, loaded } = progress;
      const progressPercent = `${Math.round((loaded * 100) / total)}%`;
      writeTheFollowing(progressPercent).to(uploadLbl);
      console.log('progress:', progressPercent);
    }
    xhr.upload.addEventListener('error', handleXHRError);
    xhr.upload.addEventListener('load', handleXHRLoad);
    xhr.upload.addEventListener('progress', handleXHRProgress);
    Array.from(filesList).forEach((file: any) => {
      formData.append('file', file);
    });
    xhr.open('POST', apiURL);
    xhr.send(formData);
  }
}
