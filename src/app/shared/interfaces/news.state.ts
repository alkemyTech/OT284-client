import { newData } from "src/app/features/pages/news/models/newM";

export interface NewsState{
    loading:boolean,
    news: newData[],
    error:string,
    newWasDeleted:boolean,
    newToDelete:newData,
    newWasCreated:boolean,
    newToEdit:newData,
    newWasEdited:boolean,
    responseCreateEdit:any
}