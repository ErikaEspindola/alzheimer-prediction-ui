import { Component, OnInit } from '@angular/core';
import { ArquivosService } from '../arquivos.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadFiles: File[];

  constructor(private _arquivosService: ArquivosService) { }

  ngOnInit() {
    console.log('entoru');
  }

  onFilesAdded(files: File[]) {

    this.uploadFiles = files;
  }
  
  upload(array, i) {

    if(i < array.length) {
      let formData = new FormData();

      formData.append('file', array[i], array[i].name);

      this._arquivosService.uploadFile(formData)
      .subscribe((x: string) => console.log(x.length));

      this.upload(array, i + 1);
    }
  }
}
