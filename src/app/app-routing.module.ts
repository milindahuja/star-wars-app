import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './detail-component/character/character-detail.component';
import { PlanetDetailComponent } from './detail-component/planet/planet-detail.component';

/* const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/details/:id', component: CharacterDetailComponent },
  { path: 'planets/details/:id', component: PlanetDetailComponent },
  { path: '**', redirectTo: '/characters' },
]; */

const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterListComponent },
  {
    path: 'details',
    children: [
      { path: 'character/:id', component: CharacterDetailComponent },
      { path: 'planet/:id', component: PlanetDetailComponent },
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

