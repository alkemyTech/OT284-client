export class contactDTO{
  
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: number
    
    constructor(data:any) {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone.toString();
      this.message = data.message;
      this.created_at = Date.now()
    }
  }