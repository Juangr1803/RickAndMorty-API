import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'character-list',
    loadChildren: () =>
      import('./characters/character-list/character-list.module').then(
        (m) => m.CharacterListModule
      ),
  },
  {
    path: 'character-detail/:id',
    loadChildren: () =>
      import('./characters/character-detail/character-detail.module').then(
        (m) => m.CharacterDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
