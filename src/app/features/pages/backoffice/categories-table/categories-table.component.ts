import { Component, OnInit } from '@angular/core';

const DATA = [
  {
    "id": 2286,
    "name": "comer",
    "description": "<p>prueba test</p>",
    "image": "http://ongapi.alkemy.org/storage/TMtwdkBwIM.jpeg",
    "parent_category_id": null,
    "created_at": "2022-07-25T18:34:50.000000Z",
    "updated_at": "2022-07-25T18:34:50.000000Z",
    "deleted_at": null,
    "group_id": null
  },
  {
      "id": 2289,
      "name": "Futbol 2022",
      "description": "<p>partidos de futbol 11 vs 11 en Oroño al 400 el dia 29 de mayo</p>",
      "image": "http://ongapi.alkemy.org/storage/ICw09P1GDI.jpeg",
      "parent_category_id": null,
      "created_at": "2022-07-25T18:37:02.000000Z",
      "updated_at": "2022-07-25T18:37:02.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2290,
      "name": "Reuniones 2022",
      "description": "<p>Evento para charlar con amigos en el parque&nbsp;</p>",
      "image": "http://ongapi.alkemy.org/storage/KRrYi7Mv0m.jpeg",
      "parent_category_id": null,
      "created_at": "2022-07-25T18:49:56.000000Z",
      "updated_at": "2022-07-25T18:49:56.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2292,
      "name": "Deportes monumento",
      "description": "<p>Jornada deportiva en el monumento</p>",
      "image": "http://ongapi.alkemy.org/storage/EALCECS3IU.jpeg",
      "parent_category_id": null,
      "created_at": "2022-07-25T18:52:48.000000Z",
      "updated_at": "2022-07-25T18:52:48.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2293,
      "name": "Recaudacion 2022 julio",
      "description": "<p>Recaudacion de ropa&nbsp;</p>",
      "image": "http://ongapi.alkemy.org/storage/NzY5cLfB0y.jpeg",
      "parent_category_id": null,
      "created_at": "2022-07-25T18:55:50.000000Z",
      "updated_at": "2022-07-25T18:55:50.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2295,
      "name": "big ooooooooooof",
      "description": "<p>test</p>",
      "image": "http://ongapi.alkemy.org/storage/KmtHJWBWbU.png",
      "parent_category_id": null,
      "created_at": "2022-09-02T12:16:05.000000Z",
      "updated_at": "2022-09-02T12:16:05.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2296,
      "name": "Categoria 11111",
      "description": "<p>Categoria 22222</p>",
      "image": "http://ongapi.alkemy.org/storage/1WQlHz4tKs.png",
      "parent_category_id": null,
      "created_at": "2022-09-02T12:18:59.000000Z",
      "updated_at": "2022-09-05T18:49:45.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2297,
      "name": "Categoria 1234568",
      "description": "<p>hola</p>",
      "image": null,
      "parent_category_id": null,
      "created_at": "2022-09-05T14:12:56.000000Z",
      "updated_at": "2022-09-05T14:12:56.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2298,
      "name": "Categoria 123",
      "description": "<p>test</p>",
      "image": null,
      "parent_category_id": null,
      "created_at": "2022-09-05T14:21:45.000000Z",
      "updated_at": "2022-09-05T14:21:45.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2299,
      "name": "Categoría 3333",
      "description": "<p>Categoría 3333</p>",
      "image": "http://ongapi.alkemy.org/storage/WQRVGbAdiO.png",
      "parent_category_id": null,
      "created_at": "2022-09-05T18:50:20.000000Z",
      "updated_at": "2022-09-05T18:50:20.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2300,
      "name": "Categoria 333",
      "description": "<p>Categoria 222</p>",
      "image": "http://ongapi.alkemy.org/storage/YFKfcQw3GP.png",
      "parent_category_id": null,
      "created_at": "2022-09-05T18:54:48.000000Z",
      "updated_at": "2022-09-05T19:18:46.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2301,
      "name": "Categoria 555",
      "description": "<p>Categoria 555</p>",
      "image": "http://ongapi.alkemy.org/storage/mJ2G3SME5W.png",
      "parent_category_id": null,
      "created_at": "2022-09-05T19:22:34.000000Z",
      "updated_at": "2022-09-05T19:22:34.000000Z",
      "deleted_at": null,
      "group_id": null
  },
  {
      "id": 2302,
      "name": "categoría 9999",
      "description": "<p>categoría 5555</p>",
      "image": "http://ongapi.alkemy.org/storage/arTJezxUal.png",
      "parent_category_id": null,
      "created_at": "2022-09-06T12:51:01.000000Z",
      "updated_at": "2022-09-06T12:57:47.000000Z",
      "deleted_at": null,
      "group_id": null
  }
]

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'createdAt', 'edit', 'delete'];
  dataSource = DATA;

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(category: any) {
    console.log('editar');
    console.log(category);
  }

  onDelete(category: any) {
    console.log('eliminar');
    console.log(category);
  }

}
