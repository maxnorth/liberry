import {Pipe} from '@angular/core';

@Pipe({
    name: "keys"
})
export class KeysPipe {
    transform(value) {
        return Object.keys(value);
    }
}