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


  /** Verifica que si un usuario no esta autenticado solo muestre los links publicos
   *  Partimos de la base de que no haya un usuario guardado en el LocalSortage.
   *  Cargamos el componente asi se carga la lista de elementos que se debe mostrar.
   *  Verificamos que en la lista no haya ningun elemento que no se tenga que mostrar.
   *  Verificamos que en la lista se encuentren todos los elementos que se deberian mostrar.
   */
  it('Usuario NO autenticado', () => {
    let verifica: boolean = true;

    localStorage.removeItem("UserData");
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


  /** Verifica que se muestren en el header los elementos correspondientes a un usuario normal logueado.
   *  Partimos de la base de que haya un usuario normal logueado.
   *  Cargamos el componente asi se carga la lista de elementos que se debe mostrar.
   *  Verificamos que en la lista no haya ningun elemento que no se tenga que mostrar.
   *  Verificamos que en la lista se encuentren todos los elementos que se deberian mostrar.
   */
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

  /** Verifica que se muestren en el header los elementos correspondientes a un usuario admin logueado.
   *  Partimos de la base de que haya un usuario admin logueado.
   *  Cargamos el componente asi se carga la lista de elementos que se debe mostrar.
   *  Verificamos que en la lista no haya ningun elemento que no se tenga que mostrar.
   *  Verificamos que en la lista se encuentren todos los elementos que se deberian mostrar.
   */
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

});
