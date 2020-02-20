import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable()
export class UploadService {
  public url: string;

  constructor(private _http: HttpClient) { 
    this.url = Global.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
    return new Promise(function(resolve, reject){
      const formData: FormData = new FormData();
      var xhr = new XMLHttpRequest();
      
      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }
          else{
            reject(xhr.response);
          }
        }

        xhr.open('POST', url, true );
        xhr.send(formData);
      }
    });
  }

  uploadImage(url, files: Array<File>, name: string, image): Observable<any>{
    const formData: FormData = new FormData();
    
    for(var i=0; i<files.length; i++){
      formData.append(image, files[i], files[i].name);
     /* console.log(files[i]);*/
    }
    
    return this._http.post(url ,formData );
  }
}
