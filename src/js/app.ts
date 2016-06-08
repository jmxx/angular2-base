import 'babel-polyfill';
import 'zone.js/dist/zone';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HelloApp } from './components/hello.component';

bootstrap(HelloApp, []);