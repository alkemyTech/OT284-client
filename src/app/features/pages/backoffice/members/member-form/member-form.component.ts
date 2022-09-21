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

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

  member: Member;
  form!: FormGroup;
  file!: any;
  Editor = ClassicEditor;
  member$!: Observable<Member[]>;

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
    const extensionFile = file.type;
    return ( extensionFile === 'image/jpg' || extensionFile === 'image/png') ? true : false;
  }

  setImageError() {
    this.form.controls['image'].setErrors({'incorrect': true});
    if ( this.form.invalid ) {
      this.invalidForm();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if( !this.fileExtensionCheck(this.file) ) {
      this.setImageError();
    }
  }

  onSubmit() {
    if ( this.form.valid ) {
      console.log(this.form.value);
      return;
    }
    if ( !this.member ) {
      /* create member */
      if ( this.file && this.fileExtensionCheck(this.file) ) {
        /* image is valid */
        this.form.controls['image'].setErrors(null);

        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.form.value.image = reader.result;
          if ( this.form.invalid ) {
            this.invalidForm();
          } else {
            this.swalFire();
            /* make the call to the API */
            this.createMember();
          }
        }
      } else {
        /* there is no image */
        if ( this.form.invalid ) {
          this.invalidForm();
        }
      }
    } else {
      /* edit category */
      if ( !this.file ) {
        this.form.removeControl('image');
        this.swalFire();
        this.editMember();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.form.value.image = reader.result;
        if ( this.form.invalid ) {
          this.invalidForm();
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
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'Completado',
      text: 'Miembro creado con éxito'
    }).then(() => {
      this.router.navigateByUrl('/backoffice/members');
    });
  }

  editMember() {
    if ( this.member.id ) {
      this.store.dispatch(editMember({id: this.member.id, member: this.form.value}));
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: 'Miembro editado con éxito'
      }).then(() => {
        this.router.navigateByUrl('/backoffice/members')
      })
    }
  }

}
