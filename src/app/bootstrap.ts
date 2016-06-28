import {bootstrap} from '@angular/platform-browser';
import {provide, enableProdMode} from '@angular/core';
import RootComponent from 'app/components/RootComponent'
import {Parent, LibraryMetadata} from 'app/constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';
import {GlobalDirectives, GlobalProviders, GlobalPipes} from 'app/resources/globals';
import globalize from 'app/utilities/globalizeDirectives';
import {metadata} from 'app/resources/metadata';

//enableProdMode();

bootstrap(RootComponent, [
    GlobalProviders, 
    GlobalPipes,
    provide(LibraryMetadata, {useValue: metadata}), 
    globalize(GlobalDirectives)
]);