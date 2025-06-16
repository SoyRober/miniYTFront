import {Routes} from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {Search} from './search/search';
import {VideoView} from './video-view/video-view';

export const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: "login", component: Login},
  {path: "register", component: Register},
  {path: "search", component: Search},
  {path: 'view/:videoUuid', component: VideoView}
];
