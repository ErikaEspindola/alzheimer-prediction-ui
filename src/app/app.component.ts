import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DANet';
  changeNavBarColor = false;
  uploadFiles: File[] = [];
  showDownloadBtn: boolean = false;
  images: Array<string> = [];

  scrollToNextDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.changeNavBarColor = event.target.scrollingElement.scrollTop > 550;
  }


  constructor(private appService: AppService) { }

  ngOnInit() { }

  onFilesAdded(files: any) {

    console.log(files);
    this.uploadFiles = files.addedFiles;
    console.log(this.uploadFiles)
  }

  onRemove(event) {

    this.uploadFiles.splice(this.uploadFiles.indexOf(event), 1);
  }

  upload(array, i) {

    if (array.length > 0) {
      let formData = new FormData();

      formData.append('file', array[i], array[i].name);

      this.appService.uploadFile(formData)
        .subscribe((images: Array<string>) => {
          this.showDownloadBtn = true;
          this.images = images;
        });
    }
  }

  private _convertBase64ToBlobData(base64Data: string, contentType: string = 'image/nii', sliceSize = 512) {

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  downloadImages() {

    this.images.forEach((img, i) => {
      let blobData = this._convertBase64ToBlobData(img);
      this._download(blobData, i);
    });
  }

  private _download(blobData: Blob, i) {

    let filename = i == 0 ? 'cerebro.nii' : 'mascara.nii';

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, filename);
    } else {
      const blob = new Blob([blobData], { type: 'image/nii' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
  }
}

