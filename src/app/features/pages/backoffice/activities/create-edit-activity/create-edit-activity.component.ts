import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { Activity } from 'src/app/shared/interfaces/activity';
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

  constructor(private formB: FormBuilder, private route:ActivatedRoute, 
    private httpActServ: ActivitiesService, private location:Location, public dialog: MatDialog) {

    this.form = this.formB.group({
        name:["",[Validators.required]],
        description:["",[Validators.required]],
        image:["",[Validators.required]],
    })

  }

  ngOnInit(): void {
    this.activity = JSON.parse(this.route.snapshot.paramMap.get('activity')!)
    this.activity ? this.formType="edit" : this.formType="create"
   /*  let blob = fetch(this.activity.image).then(r => this.convertFileToBase64(r.blob())); */

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
      this.httpActServ.putActivity(this.activity.id,this.activity).subscribe(
        (data) => console.log(data),
        (err)=> console.log(err)
      )
    }
    else{
      this.httpActServ.postActivity(this.activity).subscribe(
        (data) => console.log(data),
        (err)=> console.log(err)
      )
    }
    this.location.historyGo(-2)
  }

  fileEvent(e: Event) {
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
