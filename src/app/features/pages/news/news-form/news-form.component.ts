import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { newData, Novedad } from '../models/newM';
import { NewsService } from '../news.service';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  //public Editor = ClassicEditor;
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
        image:["", [Validators.required]]
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
          this.titulo.clearValidators();
          this.titulo.setValidators(this.newModel.name,[Validators.required,Validators.minLength(4)]);
          this.titulo.updateValueAndValidity();
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error.message);
        }
      })
    }
  }

  public enviarNovedad(metodo:string, newForm:newData, event:any):void{
    debugger
    if(this.sendForm.valid){
      if(metodo=='post'){
        let novedad=new Novedad(this.sendForm.value);
        novedad.image=btoa(novedad.image);
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
        //this.sendForm.updated_at=new Date().toISOString();
        //llamar al servicio del put
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

  public utf8_to_b64(str:string) :string{
    return window.btoa(unescape(encodeURIComponent( str )));
  }

}
