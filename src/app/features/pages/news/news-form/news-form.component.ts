import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { newData, Novedad } from '../models/newM';
import { NewsService } from '../news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import Base64UploaderPlugin from 'customBuilder/Base64Upload';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  public Editor = ClassicEditor;
  editorConfig={extraPlugins:[Base64UploaderPlugin]}
  public newModel!: newData;
  private id:number;
  public categories:any[]=[
    {id: 2292, name: "Deportes monumento"},
    {id: 2293, name: "Recaudacion 2022 julio"}
  ]
  public metodo:string="";
  public sendForm!:FormGroup;

  constructor(private svcNew:NewsService, private ruta:ActivatedRoute, private formBuilder:FormBuilder) {
    this.newModel={
      id: 0, name: "", slug: null, content: "", image: "", user_id: 0, category_id: 0,
      created_at: "", updated_at: "", deleted_at: null, group_id: null
    }
    this.id=this.ruta.snapshot.params['id'];
    this.metodo="post";
    this.sendForm=this.formBuilder.group(
      {
        name:["",[Validators.required, Validators.minLength(4)]],
        content:["",[Validators.required, Validators.minLength(200)]],
        category_id:["",[Validators.required]],
        image:["", []]
      }
    )
   }

  ngOnInit(): void {
    this.verInputs(this.id);
  }

  public verInputs(id:number){
    if(id!==undefined){
      this.svcNew.getNewModel(this.id).subscribe({
        next:(newM:newData)=>{
          this.newModel=newM;
          this.metodo="put";
          this.sendForm.controls.name.setValue(this.newModel.name)
          this.sendForm.controls.content.setValue(this.newModel.content)
          this.sendForm.controls.image.setValue(this.newModel.image)
          this.sendForm.controls.category_id.setValue(this.newModel.category_id)
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error.message);
        }
      })
    }
  }

  public enviarNovedad(metodo:string):void{
    if(this.sendForm.valid){
      if(metodo=='post'){
        const novedad=new Novedad(this.sendForm.value);
        novedad.id=0;
        console.log(novedad);
        novedad.image=novedad.image.split('data:')[1];
        this.svcNew.nuevaNew(novedad).subscribe({
          next:(response:Novedad)=>{
            console.log(response);
            this.sendForm.reset;
          },
          error:(error:HttpErrorResponse)=>{
            console.log(error.message);
          }
        });  
      }else if(metodo='put'){
        const novedad=new Novedad(this.sendForm.value);
        novedad.id=this.id;
        novedad.updated_at=new Date().toISOString();
        this.svcNew.modificarNew(novedad).subscribe({
          next:(response:Novedad)=>{
            console.log(response);
            this.sendForm.reset;
          },error:(error:HttpErrorResponse)=>{
            console.log(error.message);
          }
        })
      }
    }else{
      Swal.fire({
        icon:'error',
        title: 'Oops...No se enviaron los datos',
        text: 'Por favor complete los campos'
      })
    }
    //console.log(metodo, newForm);
  }

  get titulo():any{
    return this.sendForm.get('name');
  }

  get contenido():any{
    return this.sendForm.get('content');
  }

  get categoria():any{
    return this.sendForm.get('category_id');
  }
  
  get imagen():any{
    return this.sendForm.get('image');
  }

}
