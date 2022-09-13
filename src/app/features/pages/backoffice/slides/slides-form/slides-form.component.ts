import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  AsyncValidatorFn,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Base64UploaderPlugin from "customBuilder/Base64Upload";
import { NewsSlidesService } from "src/app/core/services/news-slides.service";
import { Slides } from "src/app/shared/interfaces/slides";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { SlidesServiceService } from "./slides-service.service";

@Component({
  selector: "app-slides-form",
  templateUrl: "./slides-form.component.html",
  styleUrls: ["./slides-form.component.scss"],
})
export class SlidesFormComponent implements OnInit, AfterViewInit, OnDestroy {
  public Editor = ClassicEditor;
  orders: number[];
  formSlides = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    desc: new FormControl("", [Validators.required]),
    order: new FormControl("", {
      validators: [Validators.required],
      asyncValidators: [],
    }),
    image: new FormControl("", [Validators.required, this.validExtensions]),
  });
  editorConfig = { extraPlugins: [Base64UploaderPlugin] };
  constructor(
    private slides: NewsSlidesService,
    private slideForm: SlidesServiceService
  ) {}

  validExtensions(control: AbstractControl) {
    if (
      control.value.includes("jpg") ||
      control.value.includes("png") ||
      control.value.includes("jpeg")
    ) {
      return null;
    } else {
      return { forbbidenExtension: true };
    }
  }

  validOrder(slides: NewsSlidesService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return slides.getSlide().pipe(
        map((data: any) => {
          const returnValue = data.data.find(
            (element: Slides) => element.order == control.value
          );
          return returnValue ? { OrderExists: true } : null;
        })
      );
    };
  }

  onSubmit() {
    const name = this.formSlides.value.name;
    const desc = this.formSlides.value.desc;
    const order = this.formSlides.value.order;
    const image = this.obtenerImg(this.formSlides.value.image);
    if (this.formSlides.valid) {
      if (!this.slideForm.isEditing) {
        this.slides
          .createSlide({
            name: name,
            description: desc,
            order: order,
            image: image,
          })
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: "success",
                text: "Slide creada con éxito",
              });
              console.log(data);
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            },
          });
      } else {
        this.slides
          .editSlide(
            {
              name: name,
              description: desc,
              order: order,
              image: image,
            },
            this.slideForm.editSlideData.id
          )
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: "success",
                text: "Slide editada con éxito",
              });
              console.log(data);
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            },
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form not valid",
      });
      console.log(this.formSlides);
    }
  }

  private obtenerImg(image: string) {
    let str1 = image.split('src="')[1];
    return (image = str1.split('"')[0]);
  }

  ngAfterViewInit(): void {
    if (this.slideForm.editSlideData) {
      this.formSlides.controls.name.setValue(this.slideForm.editSlideData.name);
      this.formSlides.controls.desc.setValue(
        this.slideForm.editSlideData.description
      );
      this.formSlides.controls.desc.setValue(
        this.slideForm.editSlideData.description
      );
      this.formSlides.controls.order.setValue(
        this.slideForm.editSlideData.order
      );
      this.formSlides.controls.image.setValue(
        this.slideForm.editSlideData.image
      );
    }

    if (this.slideForm.isEditing) {
      this.formSlides.controls["order"].clearValidators();
      this.formSlides.controls["order"].setValidators(Validators.required);
    } else {
      this.formSlides.controls["order"].setAsyncValidators(
        this.validOrder(this.slides)
      );
    }
    this.formSlides.controls["order"].updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.slideForm.isEditing = false;
    delete this.slideForm.editSlideData;
  }

  ngOnInit(): void {
    console.log(this.slideForm.isEditing);
  }
}
