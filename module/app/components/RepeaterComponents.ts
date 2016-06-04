import {Component, Input, ViewChildren, QueryList, HostListener} from 'angular2/core';
import {metadata} from 'app/resources/metadata';
import {RepeaterManager} from "app/components/RepeaterManager";

console.log(metadata);

export var RepeaterComponents = [];
var site = metadata.site;

Object.defineProperty(site.repeaters, "_components", {
  value: {},
  enumerable: false
});

for (var i in site.repeaters) {
  if (site.repeaters[i].html) {
    var repeater = site.repeaters[i]; 

    @Component({
      selector: `[${i}-repeater]`,
      template: repeater.html,
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

    var componentName = `${i}Repeater`

    Object.defineProperty(RepeaterComponent, "name", {
      value: componentName
    });

    site.repeaters._components[componentName] = RepeaterComponent;

    RepeaterComponents.push(RepeaterComponent);
  }
}

console.log("repeaters:", RepeaterComponents);
