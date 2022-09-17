import { Injectable } from "@angular/core";
import { Slides } from "src/app/shared/interfaces/slides";

@Injectable({
  providedIn: "root",
})
export class SlidesServiceService {
  editSlideData: any;
  isEditing = false;
  constructor() {}
}
