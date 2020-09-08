import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { FeathersService } from 'src/app/shared/services/feathers.service';
import { setErrorInLabel, setSuccessInLabel, writeTheFollowing } from './functions';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadButtonComponent implements AfterViewInit {

  constructor(private backend: FeathersService) {
  }

  ngAfterViewInit(): void {
    const logFile = (file): void => {
      console.log('New file was uploaded:', file);
      this.backend.service('files').find()
        .then(result => { console.log('results:', result); })
        .catch(err => { console.log('error finding files:', err); });
    };
    this.backend.service('files').on('created', logFile);
  }

  public upload(filesList): void {
    const apiURL = environment.apiURL + 'files';
    const uploadLbl = document.getElementById('files_input_label');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const handleXHRError = (err): void => {
      setErrorInLabel(uploadLbl);
      console.log(err);
    };
    const handleXHRLoad = (load): void => {
      setSuccessInLabel(uploadLbl);
      console.log('LOAD result:', load);
    };
    const handleXHRProgress = (progress): void => {
      const { total, loaded } = progress;
      const progressPercent = `${Math.round((loaded * 100) / total)}%`;
      writeTheFollowing(progressPercent).to(uploadLbl);
      console.log('progress:', progressPercent);
    };
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
