import { Component } from 'angular2/core';
import { Iterables } from 'app/resource';
import { IterablesConfig } from 'app/resource';

export var Iterators = [];

//use gulp to create iterable object and export it
for (var iterable of Object.keys(Iterables)) {
    
    //values: reference, iterateOn
    var config = IterablesConfig[iterable];
    
    config.reference = config.reference || 'i';
    config.iterateOn = config.iterateOn || '[]';
    
    var iteratorTemplate = `
        <template ngFor let-${config.reference} [ngForOf]="${iterateOn}">
            ${ Iterables[iterable] }
        </template>
    `;
    
    
      
    @Component({
      selector: `${iterable}-iterator`,
      template: `iteratorTemplate`
    })
    class PatternComponent {
      
    }
    
    Object.defineProperty(PatternComponent, "name", {
      value: `${page + pattern}`;
    });
  
    PatternComponents.push(PatternComponent);
}