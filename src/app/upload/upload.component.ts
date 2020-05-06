import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadFiles: File[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  scrollToNextDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

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
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

}
