import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/details/:id', component: CharacterDetailComponent },
  { path: 'planets/details/:id', component: PlanetDetailComponent },
  { path: '**', redirectTo: '/characters' },
]; */

const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { 
    path: 'characters', 
    loadComponent: () => 
    import('./character-list/character-list.component')
        .then(m => m.CharacterListComponent)
  },
  {
    path: 'details',
    children: [
      { 
        path: 'character/:id', 
        loadComponent: () => 
        import('./detail-component/character/character-detail.component')
        .then(m => m.CharacterDetailComponent)
      },
      { 
        path: 'planet/:id', 
        loadComponent: () => 
        import('./detail-component/planet/planet-detail.component')
        .then(m => m.PlanetDetailComponent)
      },
      { path: '', redirectTo: 'character', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/characters' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

