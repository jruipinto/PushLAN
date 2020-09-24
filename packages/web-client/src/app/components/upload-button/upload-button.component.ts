import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { setErrorInLabel, setSuccessInLabel, writeTheFollowing } from './functions';
import { environment } from 'src/environments/environment';
import { UIService } from 'src/app/shared/state';
@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadButtonComponent implements AfterViewInit {
  public currentFolderPath: string;

  constructor(private uiService: UIService) {
  }

  ngAfterViewInit(): void {
    this.uiService.state$.subscribe(
      ({ currentFolderPath }) => this.currentFolderPath = currentFolderPath
    );
  }

  public upload(filesList): void {
    const apiURL = environment.apiURL + 'files';
    const uploadLbl = document.getElementById('files_input_label');
    const uploadLblInitialState = uploadLbl.innerHTML;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const handleXHRError = (err): void => {
      setErrorInLabel(uploadLbl);
      console.log(err);
    };
    const handleXHRLoad = (load): void => {
      setSuccessInLabel(uploadLbl).andThenResetTo(uploadLblInitialState);
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
      // fieldname = this.currentFolderPath to let us upload to inner folders
      formData.append(this.currentFolderPath, file);
    });
    xhr.open('POST', apiURL);
    xhr.send(formData);
  }

}
