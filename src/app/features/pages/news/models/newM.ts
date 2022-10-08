export interface newM{
  success: boolean,
  data: newData[]
}

export interface newData{
        id: number,
        name: string,
        slug: null | undefined,
        content: string,
        image?: string,
        user_id: number | undefined,
        category_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: string | undefined,
        group_id: null | undefined
  }

export class Novedad{
        id:number;
        name: string;
        slug: null | undefined;
        content: string;
        image?:  string;
        user_id: number | undefined;
        category_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string | undefined;
        group_id: null | undefined;

        constructor(data:any){
          this.id=data.id;
          this.name=data.name;
          this.slug=data.slug;
          this.content=data.content;
          this.image=data.image;
          this.user_id=data.user_id;
          this.category_id=data.category_id;
          this.created_at=new Date().toISOString();
          this.updated_at=new Date().toISOString();
          this.deleted_at=new Date().toISOString();
          this.group_id=data.group_id;
        }

}
