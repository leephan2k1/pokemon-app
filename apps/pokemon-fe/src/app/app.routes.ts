import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layouts/main-layout/layout.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BrowsePageComponent } from './views/browse-page/browse-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'browse', component: BrowsePageComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
