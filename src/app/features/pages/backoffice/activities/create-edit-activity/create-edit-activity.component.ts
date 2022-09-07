import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-create-edit-activity',
  templateUrl: './create-edit-activity.component.html',
  styleUrls: ['./create-edit-activity.component.scss']
})
export class CreateEditActivityComponent implements OnInit {

  public form: FormGroup
  public editor=  ClassicEditor;
  activity={ id: 2056,
    name: "actividad 02",
    slug: "",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
    image: "http://ongapi.alkemy.org/storage/oqhHt6tOMb.png",
    user_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
    };
  private imgBase64!: any;

  constructor(private formB: FormBuilder) {

    this.form = this.formB.group({
     /*  activity:this.formB.group({ */
        name:[this.activity.name.toLocaleUpperCase(),[Validators.required]],
        description:[this.activity.description,[Validators.required]],
        image:[this.activity.image,[Validators.required]],
     /*  }) */
    })

  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form)
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
      console.log(this.imgBase64);
    };
  }

}
