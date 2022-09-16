import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/interfaces/activity';
import { activitiesActionTypes, addActivity, editActivity } from 'src/app/state/actions/activities.actions';
import { AppState } from 'src/app/state/app.state';
import { activitiesExample } from '../../../activities/activity-view/activities-example';
import { EMPTY } from 'rxjs';
import { MatAlertErrorComponent } from 'src/app/shared/components/mat-alert-error/mat-alert-error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-activity',
  templateUrl: './create-edit-activity.component.html',
  styleUrls: ['./create-edit-activity.component.scss']
})
export class CreateEditActivityComponent implements OnInit {

  public form: FormGroup;
  private formType: string;
  public editor=  ClassicEditor;
  activity: Activity;
  private imgBase64!: any;
  file!: any;
  /* activities$: Observable<Activity[]> = this.store.select(state => state.activities); */

  constructor(private formB: FormBuilder, private store: Store<AppState>, private route:ActivatedRoute, 
   private location:Location, public dialog: MatDialog) {

    this.form = this.formB.group({
        name:["",[Validators.required]],
        description:["",[Validators.required]],
        image:["",[Validators.required]],
    })

  }

  ngOnInit(): void {
    this.activity = JSON.parse(this.route.snapshot.paramMap.get('activity')!)
    this.activity ? this.formType="edit" : this.formType="create"
   
    if (this.formType == "edit"){
      this.form.setValue({
        name: this.activity.name,
        description: this.activity.description,
        image: this.activity.image
      })
    }
  }

  onSubmit(){
    if (this.formType == "edit"){
      this.form.get('image')?.removeValidators(Validators.required);
      if (!this.file) {
        this.form.removeControl('image');
      }
      this.store.dispatch(editActivity({id: this.activity.id, data:this.form.value}))
    }
    else{
      this.store.dispatch(addActivity({activity: this.activity}))
    }
    this.location.historyGo(-2)
  }

  fileEvent(event: any) {
    this.file = event.target.files[0];
    let imagen = this.form.controls.image.value;
    var allowedExtensions = /(.jpg|.png)$/i;

    if (allowedExtensions.exec(imagen.name)) {
      this.convertFileToBase64(imagen);
    }
    else {
      this.dialog
      .open(MatAlertErrorComponent, {
        data: {text:`El archivo seleccionado no es una imagen `, 
        message: "por favor seleccione otro archivo"},
      })
      this.imgBase64 = null;
      this.form.controls.img.setErrors({
        invalidExtension: true
      })
    }
  }

  convertFileToBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgBase64 = reader.result?.toString();
      this.form.controls.image.setValue(this.imgBase64)
      this.activity.image= this.imgBase64
    };
  }

}
