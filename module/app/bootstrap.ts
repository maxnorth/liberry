import 'zone.js';
import 'reflect-metadata';
import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';
import RootComponent from 'app/components/RootComponent'
import {Parent, LibraryMetadata} from 'app/constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';
import {GlobalDirectives, GlobalProviders} from 'app/resources/globals';
import globalize from 'app/utilities/globalizeDirectives';
import {metadata} from 'app/resources/metadata';

//enableProdMode();

bootstrap(RootComponent, [GlobalProviders, provide(LibraryMetadata, {useValue: metadata}), globalize(GlobalDirectives)]);