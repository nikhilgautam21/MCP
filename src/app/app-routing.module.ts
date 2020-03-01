import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'add-complaint',
    loadChildren: () => import('./pages/add-complaint/add-complaint.module').then( m => m.AddComplaintPageModule)
  },
  {
    path: 'complaint-detail',
    loadChildren: () => import('./pages/complaint-detail/complaint-detail.module').then( m => m.ComplaintDetailPageModule)
  },
  {
    path: 'complaint-listing',
    loadChildren: () => import('./pages/complaint-listing/complaint-listing.module').then( m => m.ComplaintListingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
