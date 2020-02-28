import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./update.component.css'],
  providers: [
    ProjectService,
    UploadService
  ]
})
export class UpdateComponent implements OnInit {
  public project: Project;
  public status: String;
  public filesToUpload: Array<File>;
  public title: String;
  public url: String;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router, 
    private _route: ActivatedRoute
    ) { 
      this.title = "Editar Proyecto";
      this.url = Global.url;
    }

  ngOnInit() {
    this.getParams();
  }

 //Obtengo parametros por get para poder pasar parametro a la funcion getProject()
  getParams(){
    this._route.params.subscribe(
      params => {
        let id = params.id;
        this.getProject(id);
      }
  );
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response => {
        if(response.project){
          this.project = response.project;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    //console.log(this.project);
    this._projectService.update(this.project).subscribe(
      response => { 
        if(response.project && this.filesToUpload){    
         this._uploadService.uploadImage(Global.url+'upload-image/'+response.project._id, this.filesToUpload, response.project.name, "image").subscribe(
            result =>{
              this.status = 'success-update';
            },
            error =>{
              console.log(<any>error);
            }
         );

        }else{
          this.status = 'success-update';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}



