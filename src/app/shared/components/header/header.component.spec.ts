import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { AuthButtonsComponent } from '../auth-buttons/auth-buttons.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let user: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Usuario normal autenticado', () => {
    let verifica: boolean = true;
    let userPrueba = {
      correo: "user@test.com",
      tipo: "usuario"
    }
    localStorage.setItem("UserData", JSON.stringify(userPrueba))

    component.ngOnInit();
    component.list.forEach((element: any) => {
      if (element.text != "Contacto" && element.text != "Inicio" && element.text != "Nosotros" && element.text != "Novedades" && element.text != "Actividades")
        verifica = false
    });

    let cantidadItems = 0
    component.list.forEach((element: any) => {
      if (element.text == "Contacto" || element.text == "Inicio" || element.text == "Nosotros" || element.text == "Novedades" || element.text == "Actividades") {
        cantidadItems++;
      }
    });
    if (cantidadItems < 5) {
      verifica = false;
    }

    expect(verifica).toBeTrue();
  });

  it('Usuario Admin autenticado', () => {
    let verifica: boolean = true;
    let userPrueba = {
      correo: "user@test.com",
      tipo: "admin"
    }
    localStorage.setItem("UserData", JSON.stringify(userPrueba))

    component.ngOnInit();
    component.list.forEach((element: any) => {
      if (element.text != "Escritorio" && element.text != "Inicio" && element.text != "Nosotros" && element.text != "Novedades" && element.text != "Actividades")
        verifica = false
    });

    let cantidadItems = 0
    component.list.forEach((element: any) => {
      if (element.text == "Escritorio" || element.text == "Inicio" || element.text == "Nosotros" || element.text == "Novedades" || element.text == "Actividades") {
        cantidadItems++;
      }
    });
    if (cantidadItems < 5) {
      verifica = false;
    }

    expect(verifica).toBeTrue();
  });



  it('Usuario NO autenticado', () => {
    let verifica: boolean = true;
    let userPrueba = {
    }
    localStorage.setItem("UserData", JSON.stringify(userPrueba))

    component.ngOnInit();
    component.list.forEach((element: any) => {
      if (element.text != "Inicio" && element.text != "Contacto" && element.text != "Nosotros")
        verifica = false
    });

    let cantidadItems = 0
    component.list.forEach((element: any) => {
      if (element.text == "Contacto" || element.text == "Inicio" || element.text == "Nosotros") {
        cantidadItems++;
      }
    });
    if (cantidadItems < 3) {
      verifica = false;
    }

    expect(verifica).toBeTrue();
  });

});
