import {Component, Input, Host, ViewChildren, Inject, Injector, forwardRef, QueryList, HostListener} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {metadata} from 'app/resources/metadata';
import {RepeaterManager} from "app/components/RepeaterManager";
import {SiteComponentManager} from "app/components/SiteComponentManager";

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
      directives: [RepeaterManager, SiteComponentManager]
    })
    class RepeaterComponent {
      constructor(public routeParams: RouteParams, public _injector: Injector) {
        window.injector = _injector;
        this.url = routeParams.params;
      };

      @ViewChildren(RepeaterManager) repeaters;
      @ViewChildren(SiteComponentManager) components

      public repeater;
      public path;
      public url;

      ngAfterViewInit () {
        var repeaters = this.repeaters._results;
        for (var i in repeaters) {
          var repeater = repeaters[i];
          if (!repeater.context) {
            repeater.context = this.path;
            repeater.changeDetectorRef.detectChanges();
            repeater.setView();
          }
        }

        var components = this.components._results;
        for (var i in components) {
          var component = components[i];
          if (!component.context) {
            component.context = this.path;
            component.changeDetectorRef.detectChanges();
            component.setView();
          }
        }
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