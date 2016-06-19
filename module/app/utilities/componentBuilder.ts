import {metadata} from "app/resources/metadata";

export default function componentBuilder(items, type, defineComponent) {
    var builtComponents = [];

    Object.defineProperty(metadata.site, "_components", {
        value: metadata.site._components || {},
        enumerable: false
    });

    for (var i in items) {
        if (items[i].html) {
            var item = items[i];

            var component = defineComponent(items[i]);
            var componentName = `${item.name}${type}`

            Object.defineProperty(component, "name", {
                value: componentName
            });

            metadata.site._components[componentName] = component;

            builtComponents.push(component);
        }
    }
    
    return builtComponents;
}