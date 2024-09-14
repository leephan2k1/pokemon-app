import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layouts/main-layout/layout.component';
import { HomePageComponent } from './views/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      //   { path: 'about', component: BrowseComponent }
    ],
  },
];
