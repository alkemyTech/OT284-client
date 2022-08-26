import { Injectable, Pipe } from "@angular/core";

@Pipe({
  name: "phoneTransform",
})
export class PhonePipe {

    transform(phone: string) {

        phone = "+54"+ phone;
        const areaCodeStr = phone.slice(0,3);
        const midSectionStr = phone.slice(3,7);
        const lastSectionStr = phone.slice(7);
    
        return `(${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
    }
}