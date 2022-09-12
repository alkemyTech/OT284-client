import { newData } from "src/app/features/pages/news/models/newM";

export interface NewsState{
    loading:boolean,
    news: newData[],
    error:string,
    newDeleted:boolean,
}