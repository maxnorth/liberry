import {Pipe} from 'angular2/core';

@Pipe({
    name: "keys"
})
export class KeysPipe {
    transform(value) {
        return Object.keys(value);
    }
}