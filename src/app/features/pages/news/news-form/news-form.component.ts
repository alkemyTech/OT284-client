import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { newData, Novedad } from '../models/newM';
import { NewsService } from '../news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import Base64UploaderPlugin from 'customBuilder/Base64Upload';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/shared/interfaces/category';
import { NewsCategoriesService } from 'src/app/core/services/news-categories.service';


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
  public categories:Category[]
  public metodo:string="";
  public sendForm!:FormGroup;
  public image!:string;

  constructor(private srcCategory:NewsCategoriesService,private svcNew:NewsService, private ruta:ActivatedRoute, private formBuilder:FormBuilder,public dialog:MatDialog) {
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
    this.getCategories();
  }

  public getCategories(){
    this.srcCategory.getCategories().subscribe((categories)=>{
      this.categories=categories;
    })
  }

  public verInputs(id:number){
    if(id!==undefined){
      this.svcNew.getNewModel(this.id).subscribe({
        next:(newM:newData)=>{
          this.newModel=newM;
          this.metodo="put";
          this.sendForm.controls.name.setValue(this.newModel.name);
          this.sendForm.controls.content.setValue(this.newModel.content);
          this.image=this.newModel.image;
          this.sendForm.controls.image.setValue(this.newModel.image);
          this.sendForm.controls.category_id.setValue(this.newModel.category_id)
        },
        error:(error:HttpErrorResponse)=>{
          this.dialog.open(MatAlertErrorComponent,{
            data:{text:"Error al cargar novedad", message:error.message},
          })
        }
      })
    }
  }

  public enviarNovedad(metodo:string):void{
    if(this.sendForm.valid){
      if(metodo=='post'){
        const novedad=new Novedad(this.sendForm.value);
        novedad.id=0;
        this.obtenerImg(novedad);
        this.svcNew.nuevaNew(novedad).subscribe({
          next:(response:Novedad)=>{
            console.log(response);
            this.svcNew.redireccionar();
          },
          error:(error:HttpErrorResponse)=>{
            this.dialog.open(MatAlertErrorComponent,{
              data:{text:"Error al crear novedad", message:error.message},
            })
          }
        });  
      }else if(metodo='put'){
        const novedad=new Novedad(this.sendForm.value);
        novedad.id=this.id;
        novedad.updated_at=new Date().toISOString();
        if(novedad.image.includes('base64')){
          this.obtenerImg(novedad);
        }
        this.svcNew.modificarNew(novedad).subscribe({
          next:(response:Novedad)=>{
            console.log(response);
            this.svcNew.redireccionar();
          },error:(error:HttpErrorResponse)=>{
            this.dialog.open(MatAlertErrorComponent,{
              data:{text:"Error al modificar novedad", message:error.message},
            })
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

  private obtenerImg(novedad:Novedad):void{
    let str1=novedad.image.split('src="')[1];
    novedad.image=str1.split('"')[0];
  }

}
