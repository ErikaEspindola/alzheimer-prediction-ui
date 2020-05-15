import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadFiles: File[] = [];
  result: string = '';

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  scrollToNextDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

  onFilesAdded(files: any) {

    this.uploadFiles = files.addedFiles;
  }

  onRemove(event) {

    this.uploadFiles.splice(this.uploadFiles.indexOf(event), 1);
  }

  upload(array, i) {

    if (array.length > 0) {
      let formData = new FormData();

      formData.append('file', array[i], array[i].name);

      let t0 = performance.now()

      this.appService.uploadFile(formData)
        .subscribe((res: any) => {

          console.log(res);
          if(res.resultado === 0) {
            this.result = 'Cognitivamente Normal';
          } else if(res.resultado === 1) {
            this.result = 'Comprometimento Cognitivo Leve';
          } else {
            this.result = 'Doença de Alzheimer';
          }

          let t1 = performance.now()
          console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
        });

    }
  }

}
