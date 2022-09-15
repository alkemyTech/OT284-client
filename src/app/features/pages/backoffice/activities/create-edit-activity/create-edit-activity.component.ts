import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/shared/interfaces/activity';
import { activitiesActionTypes, addActivity, editActivity } from 'src/app/state/actions/activities.actions';
import { AppState } from 'src/app/state/app.state';
import { activitiesExample } from '../../../activities/activity-view/activities-example';

@Component({
  selector: 'app-create-edit-activity',
  templateUrl: './create-edit-activity.component.html',
  styleUrls: ['./create-edit-activity.component.scss']
})
export class CreateEditActivityComponent implements OnInit {

  public form: FormGroup;
  private formType: string;
  public editor=  ClassicEditor;
  activity: Activity = activitiesExample[0];
  private imgBase64!: any;
  /* activities$: Observable<Activity[]> = this.store.select(state => state.activities); */

  constructor(private formB: FormBuilder, private store: Store<AppState>) {

    this.form = this.formB.group({
        name:[this.activity.name.toLocaleUpperCase(),[Validators.required]],
        description:[this.activity.description,[Validators.required]],
        image:[this.activity.image,[Validators.required]],
    })

  }

  ngOnInit(): void {
    this.activity ? this.formType="edit" : this.formType="create"
  }

  onSubmit(){
    if (this.formType == "edit"){
      this.store.dispatch(editActivity({id: this.activity.id, data:this.form.value}))
    }
    else{
      this.store.dispatch(addActivity({activity: this.activity}))
    }
  }

  fileEvent(e: Event) {
    let imagen = this.form.controls.image.value;
    var allowedExtensions = /(.jpg|.png)$/i;

    if (allowedExtensions.exec(imagen.name)) {
      this.convertFileToBase64(imagen);
    }
    else {
      console.log("El archivo no es imagen");
      this.imgBase64 = null;
      this.form.controls.img.setErrors({
        invalidExtension: true
      })
    }
  }

  async convertFileToBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgBase64 = reader.result?.toString();
      this.form.controls.image.setValue(this.imgBase64)
      this.activity.image= this.imgBase64
      console.log(this.imgBase64);
    };
  }

}
