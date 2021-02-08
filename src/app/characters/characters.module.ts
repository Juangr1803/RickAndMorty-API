import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// Components
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterComponent } from './components/character/character.component';

const myComponents = [
  CharacterDetailComponent,
  CharacterListComponent,
  CharacterComponent,
];

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [...myComponents],
})
export class CharactersModule {}
