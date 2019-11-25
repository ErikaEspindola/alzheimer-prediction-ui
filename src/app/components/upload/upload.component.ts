import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadFiles: File[];
  showDownloadBtn: boolean = false;
  images: Array<string> = [];

  constructor(private _arquivosService: UploadService) { }

  ngOnInit() { }

  onFilesAdded(files: File[]) {

    this.uploadFiles = files;
  }

  upload(array, i) {

    if (array.length > 0) {
      let formData = new FormData();

      formData.append('file', array[i], array[i].name);

      this._arquivosService.uploadFile(formData)
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
    this.scrollToAchor();

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

  scrollToAchor() {
    let element: any = document.getElementById('downloadDiv');
    let position = element.offsetTop;
    for (let i = 10; i <= position; i += 10) {
      setTimeout(function () {
        window.scrollTo(0, i);
      }, i / 2);
    }
  }

}
