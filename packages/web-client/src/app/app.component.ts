import { Component, AfterViewInit } from '@angular/core';
import { FeathersService } from './shared/services/feathers.service';

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
    this.backend.service('files').on('created', this.logFile);
  }
  private logFile(file) {
    console.log('New file was uploaded:', file);
    this.backend.service('files').find()
      .then(result => { console.log('results:', result) })
      .catch(err => { console.log('error finding files:', err) });
  }
  private setErrorInLabel(element) {
    element.style.backgroundColor = '#ff7171'
    element.innerText = 'Error'
  }
  private setSuccessInLabel(element) {
    element.innerText = 'Succeed!'
    setTimeout(() => {
      element.innerText = 'Upload'
    }, 1000);
  }
  private writeTheFollowing(progressPercent) {
    return {
      to(element) {
        element.innerText = progressPercent
      }
    }
  }
  private handleXHRError(err) {
    this.setErrorInLabel(this.uploadLbl)
    console.log(err)
  }
  private handleXHRLoad(load) {
    this.setSuccessInLabel(this.uploadLbl)
    console.log('LOAD result:', load)
  }
  private handleXHRProgress(progress) {
    const { total, loaded } = progress
    const progressPercent = `${Math.round((loaded * 100) / total)}%`
    this.writeTheFollowing(progressPercent).to(this.uploadLbl)
    console.log('progress:', progressPercent)
  }


  public upload(filesList) {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    xhr.upload.addEventListener('error', this.handleXHRError)
    xhr.upload.addEventListener('load', this.handleXHRLoad)
    xhr.upload.addEventListener('progress', this.handleXHRProgress)
    Array.from(filesList).forEach((file: any) => {
      formData.append('file', file)
    })
    xhr.open('POST', this.apiURL)
    xhr.send(formData)
  }
}
