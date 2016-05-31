import {Component, Input, ViewChildren, QueryList, HostListener} from 'angular2/core';
import {site} from 'app/metadata';
import {RepeaterManager} from "app/components/RepeaterManager";

export var RepeaterComponents = [];

Object.defineProperty(site.repeaters, "_components", {
  value: {},
  enumerable: false
});

for (var i in site.repeaters) {
  var repeater = site.repeaters[i];
  
  @Component({
    selector: `[${repeater.name}-repeater]`,
    template: repeater.template,
    directives: [RepeaterManager]
  })
  class RepeaterComponent {
    constructor() {
    }
    
    @ViewChildren(RepeaterManager) repeaters;
    
    repeater;
    
    ngAfterViewInit () {
      console.log(`repeater ${this.repeater} view init!`);
      var repeaters = this.repeaters._results;
      for (var i in repeaters) {
        var repeater = repeaters[i];
        if (!repeater.on) {
          repeater.on = this.path;
          repeater.changeDetectorRef.detectChanges();
          console.log(`child repeater manager ${this.path} 'on' set!`)
          repeater.setView();
        }
      }
    }
    
    ngOnInit() {
        console.log(`repeater ${this.repeater} init!`);
        //this.setView();
    }
  }
  
  var componentName = `${repeater.name}Repeater`
  
  Object.defineProperty(RepeaterComponent, "name", {
    value: componentName
  });
  
  site.repeaters._components[componentName] = RepeaterComponent;

  RepeaterComponents.push(RepeaterComponent);
}