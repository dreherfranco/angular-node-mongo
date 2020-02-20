import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    ProjectService,
    UploadService
  ]
})
export class CreateComponent implements OnInit {
  public title: String;
  public project: Project;
  public status: String;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
    ) { 
    this.title = "Crear Proyecto";
    this.project = new Project('','','','', 2020, '');
  }

  ngOnInit() {
  }

  onSubmit(form){
    //console.log(this.project);
    this._projectService.save(this.project).subscribe(
      response => { 
        if(response.project){    
          //Subir la imagen con Promesas
         /* this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, "image")
            .then((result: any)=>{
              console.log(result);
              this.status = 'success';
              form.reset();
            });
          */
         this._uploadService.uploadImage(Global.url+'upload-image/'+response.project._id, this.filesToUpload, response.project.name, "image").subscribe(
            result =>{
              /*console.log(result);*/
              this.status = 'success';
              form.reset();
            },
            error =>{
              console.log(<any>error);
              this.status = 'failed';
            }
         );

        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
