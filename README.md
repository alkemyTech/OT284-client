# BaseOngAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Documentacion test Formulario contacto y peticion de enviar mensaje

1_ Valido la creacion del formulario
2_ Valido que el formulario sea invalido si se ingresan los campos vacios
3_ Valido que el formulario sea valido si se ingresan los campos correctamente
4_ Valido que el boton de submmit sea disable cuando los campos son incorrecto
5_ Valido que el boton de submmit sea enable cuando los campos son correctos
6_ Valido que al hacer subbmit se llame al metodo sendMessage y que la respuesta sea igual a la mockeada.

## Documentacion test Formulario Login y peticion login a Firebase

1_ Valido que el formulario sea invalido solo ingresando password.
2_ Valido que el formulario sea invalido solo ingresando email.
3_ Valido que el formulario sea invalido porque la contraseña no cumple con: longitud mínima de 6 caraceteres, y contener al menos un número, una letra y un símbolo (por ejemplo: @#$%).
4_ Valido que el formulario sea valido.
5_ Valido que el login de Firebase sea exitoso.
6_ Valido que al ingresar un usuario que no existe el login de firebase falle.


## Documentación test Formulario de miembro y peticion de enviar mensaje

1_ Valido la creación del formulario.
2_ Valido que el formulario sea inválido si se ingresan los campos vacios.
3_ Valido que el formulario sea válido si se ingresan los campos correctamente.
4_ Valido que funcionen los validadores de cada input del formulario.
5_ Valido que al enviar el formulario se llame al método onSubmit.
6_ Valido que al hacer submit, si el formulario es válido y la propiedad 'miembro' es undefined, 
llame al método createMember.
7_ Valido que al hacer submit, si el formulario es válido y la propiedad 'miembro' no es undefined,
llame al método editMember.