import {provide, forwardRef} from '@angular/core';
import {Parent} from '../constants/DependencyTokens';

export default function provideAsParent(component) {
    return provide(Parent, {useExisting: forwardRef(() => component)});
};