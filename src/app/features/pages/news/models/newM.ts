export interface newM{
  success: boolean,
  data: newData[]
}

export interface newData{
        id: number,
        name: string,
        slug: null,
        content: string,
        image: string,
        user_id: number,
        category_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        group_id: null
  }

export interface newImportantData{
  id: number,
  name: string,
}
