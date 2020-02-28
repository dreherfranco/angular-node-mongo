import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Global } from '../../services/global';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ ProjectService ]
})
export class DetailComponent implements OnInit {
  public project: Project;
  public url: String;
  public confirm: boolean;

  constructor(
              private _router: Router, 
              private _projectService: ProjectService,
              private _route: ActivatedRoute
            ) {
              this.project = new Project('', '', '', '', 2020, '');
              this.url = Global.url;
              this.confirm = false;
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

  deleteProject(id){
    this._projectService.delete(id).subscribe(
      response => {
        return this._router.navigate(['/sobre-mi']);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  confirmDelete(confirm){
    this.confirm = confirm;
  }
}
