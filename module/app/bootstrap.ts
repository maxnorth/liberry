import 'zone.js';
import 'reflect-metadata';
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import RootComponent from 'app/components/RootComponent'

import {GlobalDirectives, GlobalProviders} from 'app/resources/globals';
import globalize from 'app/utilities/globalizeDirectives';

import {metadata} from 'app/resources/metadata';

bootstrap(RootComponent, [GlobalProviders, provide("LibraryMetadata", {useValue: metadata}), globalize(GlobalDirectives)]);