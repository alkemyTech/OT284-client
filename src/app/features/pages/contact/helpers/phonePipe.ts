import { Injectable, Pipe } from "@angular/core";

@Pipe({
  name: "phoneTransform",
})
export class PhonePipe {

    transform(phone: number) {

        var rawNum: String = phone.toString()

        rawNum = "+54"+ rawNum;
        const areaCodeStr = rawNum.slice(0,3);
        const midSectionStr = rawNum.slice(3,7);
        const lastSectionStr = rawNum.slice(7);
    
        return `(${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
    }
}