import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ ProjectService ]
})
export class DetailComponent implements OnInit {
  public project: Project;

  constructor(
              private _router: Router, 
              private _projectService: ProjectService,
              private _route: ActivatedRoute
            ) {
              this.project = new Project('', '', '', '', 2020, '');
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
}
