import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Member } from '../../../../../shared/interfaces/member';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { getMemberById, createMember, editMember, getMemberByIdSuccess } from '../../../../../state/actions/members.actions';
import Swal from 'sweetalert2';
import { selectMembers } from 'src/app/state/selectors/members.selectors';
import { selectMemberError } from '../../../../../state/selectors/members.selectors';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

  member: Member;
  form!: FormGroup;
  file!: any;
  image!: any;
  Editor = ClassicEditor;
  member$!: Observable<Member[]>;
  error$ = this.store.select(selectMemberError);
  error: any = null;

  private imgBase64!: any;

  constructor( private fb: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.createForm();
    
    this.route.params.subscribe( params => {
      let { id } = params;
      
      if ( id ) {
        this.store.dispatch(getMemberById({id}));
        this.member$ = this.store.select(selectMembers);
        
        this.member$.subscribe( member => {
          this.member = member[0];
          this.image = member[0].image;
          this.form.get('image')?.removeValidators(Validators.required);
          this.form.setValue({
            name: this.member.name,
            image: '',
            description: this.member.description,
            facebookUrl: this.member.facebookUrl,
            linkedinUrl: this.member.linkedinUrl
          })
        })
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.minLength(4), Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      facebookUrl: ['', [Validators.pattern(/^(http\:\/\/|https:\/\/)?(www.)?(facebook.com\/)((@)?[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF0-9A-Za-z. \-%]{1,}\/?)$/i), Validators.required]],
      linkedinUrl: ['', [Validators.pattern(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm), Validators.required]]
    })
  }

  invalidInput( input: string ) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched
  }

  invalidForm() {
    return Object.values(this.form.controls).forEach( control => control.markAsTouched() );
  }

  /* check if image is jpg or png */
  fileExtensionCheck( file: any ) {
    const extensionFile = file.type.toLowerCase();
    return ( extensionFile === 'image/jpg' || extensionFile === 'image/png' || extensionFile === 'image/jpeg') ? true : false;
  }

  setImageError() {
    this.form.controls['image'].setErrors({'incorrect': true});
    this.imgBase64 = null;
    if ( this.form.invalid ) {
      this.invalidForm();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if( !this.fileExtensionCheck(this.file) ) {
      this.setImageError();
    } else {
      this.convertFileToBase64(this.file);
    }
  }

  convertFileToBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgBase64 = reader.result?.toString();
      this.form.controls.image.setValue(this.imgBase64);
      this.form.controls['image'].setErrors(null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => this.image = reader.result;
  }

  onSubmit() {
    if ( !this.member ) {
      /* create member */
      if ( this.form.invalid ) {
        this.invalidForm();
        return;
      } else {
        this.swalFire();
        this.createMember();
      }
    } else {
      /* edit category */
      if ( !this.file ) {
        this.form.removeControl('image');
        this.swalFire();
        this.editMember();
        return;
      } else {
        if ( this.form.invalid ) {
          this.invalidForm();
          return;
        } else {
          /* make the call to the API */
          this.swalFire();
          this.editMember();
        }
      }
    }
  }

  swalFire() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });

    Swal.showLoading();
  }

  createMember() {
    this.store.dispatch(createMember({member: this.form.value}));

    Swal.showLoading();

    setTimeout(() => {
      if ( this.error ) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el miembro, intente con otro nombre.'
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Completado',
          text: 'Miembro creado con éxito'
        }).then(() => {
          this.router.navigateByUrl('/backoffice/members');
        });
      }
    }, 2500)
  }

  editMember() {
    if ( this.member.id ) {
      this.store.dispatch(editMember({id: this.member.id, member: this.form.value}));

      Swal.showLoading();

      setTimeout(() => {
        if ( this.error ) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo editar el miembro, intente con otro nombre.'
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Completado',
            text: 'Miembro editado con éxito'
          }).then(() => {
            this.router.navigateByUrl('/backoffice/members');
          });
        }
      }, 2500)
    }
  }

}
