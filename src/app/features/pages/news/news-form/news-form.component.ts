import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { newDataCategory } from '../models/category';
import { newData } from '../models/newM';
import { NewsService } from '../news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  public Editor = ClassicEditor;
  public newForm!:newData;
  public newModel: newData;
  private id:number;
  public categories:newDataCategory[]=[
    {id: 2292, name: "Deportes monumento", description:"", image:"", created_at:"", updated_at:"",  parent_category_id:null, deleted_at:null, group_id:null},
    {id: 2293, name: "Recaudacion 2022 julio",description:"", image:"", created_at:"", updated_at:"",  parent_category_id:null, deleted_at:null, group_id:null}
  ]
  public metodo:string="";

  constructor(private svcNew:NewsService, private ruta:ActivatedRoute) {
    this.newModel={
      id: 0,
      name: "",
      slug: null,
      content: "",
      image: "",
      user_id: 0,
      category_id: 0,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      group_id: null
      }
    this.id=this.ruta.snapshot.params['id'];
    this.metodo="post";
    this.verInputs(this.id);
    
   }

  ngOnInit(): void {

  }

  public verInputs(id:number){
    if(id!==undefined){
      this.svcNew.getNewModel(this.id).subscribe({
        next:(newM:newData)=>{
          this.newModel=newM;
          this.metodo="put";
          console.log(this.newModel, this.metodo);
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error.message);
        }
      })
    }
  }

    
  public verNewForm(newModel:newData):newData{
    //caso creacion
      this.newForm.id=newModel.id;
      this.newForm.name=newModel.name;
      this.newForm.content=newModel.content;
      this.newForm.image=newModel.image;
      this.newForm.category_id=newModel.category_id;
      this.newForm.user_id=newModel.user_id;
      this.newForm.created_at=newModel.created_at;
      this.newForm.updated_at=new Date().toISOString();
    return this.newForm;
  }

  public enviarDatos(metodo:string){
    console.log(metodo);
  }


}
