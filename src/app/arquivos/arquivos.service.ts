import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file) {
    return this.httpClient.post(environment.api + 'upload_file', file);
  }
}
