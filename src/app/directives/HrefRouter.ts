import { Directive, ElementRef, Input, SimpleChange, HostListener, HostBinding } from '@angular/core';
import {Router} from "@angular/router";
import metadata from "liberry";
//import {$} from "jquery";

var site = metadata.site;

@Directive({
    selector: "a[href]"
})
export class HrefRouter {
    constructor(public elementRef: ElementRef, public router: Router) {
        router.subscribe(o => console.log(o));
    }

    @Input("href") public route;

    @HostListener('click', ['$event'])
    onClick($event) {
        //TODO: make routing more flexible
        $event.preventDefault();
        
        var target = parseRoute(this.route);
        if (location.origin === target.origin){
            this.router.navigateByUrl(this.route);
        }
        else {
            location.href = this.route;
        }
    }

    //set href attribute for the sake of default styling and transparency when examining element
    @HostBinding("attr.href")
    get hrefRoute() { return this.route; }

    ngOnInit() {
        //debugger;
    }
}

function matchRoute(value, routes) {
    for (var i in routes) {
        var route = routes[i];


    }
}

function parseRoute(route) {
    var a = document.createElement("a");
    a.href = route;
    return a;
}