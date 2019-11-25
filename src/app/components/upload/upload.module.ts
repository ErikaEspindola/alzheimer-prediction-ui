import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule
  ]
})
export class UploadModule { }
