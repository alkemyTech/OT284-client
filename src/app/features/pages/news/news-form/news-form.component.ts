import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { newData, Novedad } from '../models/newM';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import Base64UploaderPlugin from 'customBuilder/Base64Upload';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/shared/interfaces/category';
import { NewsCategoriesService } from 'src/app/core/services/news-categories.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { getNew, createNew, editNew } from 'src/app/state/actions/news.action';
import { Observable } from 'rxjs';
import { selectNewToEdit, selectResponse } from 'src/app/state/selectors/news.selector';
import { loadCategories } from 'src/app/state/actions/categories.actions';
import { selectCategories } from 'src/app/state/selectors/categories.selectors';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  public Editor = ClassicEditor;
  editorConfig={extraPlugins:[Base64UploaderPlugin]}
  public newModel$!: Observable<newData>;
  private id:number;
  public categories$:Observable<Category[]>
  public metodo:string="";
  public sendForm!:FormGroup;

  constructor(private store:Store<AppState>,private router:Router, private ruta:ActivatedRoute, private formBuilder:FormBuilder,public dialog:MatDialog, private srcCategory:NewsCategoriesService ) {
    this.id=this.ruta.snapshot.params['id'];
    this.metodo="post";
    this.sendForm=this.formBuilder.group(
      {
        name:["",[Validators.required, Validators.minLength(4)]],
        content:["",[Validators.required]],
        category_id:["",[Validators.required]],
        image:["", [Validators.required]]
      }
    ) 
   }

  ngOnInit(): void {
    this.getCategories();
    if(this.id!==undefined){
      this.getNewById();
    }
  }

  public getNewById(){
      let id=this.id;
      this.store.dispatch(getNew({id}));
      this.newModel$=this.store.select(selectNewToEdit);
      this.newModel$.subscribe(newM=>{
        this.metodo='put';
        this.sendForm.controls.name.setValue(newM.name);
        this.sendForm.controls.content.setValue(newM.content);
        this.sendForm.controls.image.setValue(`<figure class="image"><img src="${newM.image}"></figure>`);
        this.sendForm.controls.category_id.setValue(newM.category_id)
      })
  }

  public getCategories(){
    this.store.dispatch(loadCategories());
    this.categories$=this.store.select(selectCategories);
  }

  public enviarNovedad(metodo:string):void{
    if(this.sendForm.valid){
      if(metodo=='post'){
        const newToCreate=new Novedad(this.sendForm.value);
        newToCreate.id=0;
        if(newToCreate.image!.includes('base64')){
          this.obtenerNuevaImg(newToCreate);
        }
        this.store.dispatch(createNew({newToCreate}));
        this.mostrarResp();
      }else if(metodo='put'){
        const newToEdit=new Novedad(this.sendForm.value);
        newToEdit.id=this.id;
        newToEdit.updated_at=new Date().toISOString();
        if(newToEdit.image!.includes('base64')){
          this.obtenerNuevaImg(newToEdit);
        }else{
          this.sendForm.controls.image.setValue('');
          delete newToEdit.image;
        }
        this.store.dispatch(editNew({newToEdit}));
        this.mostrarResp();
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

  private obtenerNuevaImg(novedad:Novedad):void{
    let str1=novedad.image!.split('src="')[1];
    novedad.image=str1.split('"')[0];
  }

  private redireccionar(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Los datos se enviaron exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(()=>{
      this.router.navigate(['/backoffice/news']);
    },2000);
  }

  private mostrarResp(){
    this.store.select(selectResponse).subscribe({
      next:(response)=>{
        if(response.success){
          this.redireccionar();
        }else if(response.error){
          Swal.fire({
            icon:'error',
            title: 'No se enviaron los datos',
            text: 'Por favor inserte una imagen'
          })
        }
      }
    })
  }

  public cleanImg():void{
    this.sendForm.controls.image.setValue('');
    Swal.fire({
      text:'Cargue una nueva imagen cliqueando en el icono mostrado',
      imageUrl: 'https://acortar.link/ELSE2j',
      imageWidth: 300,
      imageHeight:200,
      imageAlt: 'Octavo icono'
    })
  }
}
