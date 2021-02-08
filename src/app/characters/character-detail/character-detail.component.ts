import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
// Interfaces
import { Character } from 'src/app/shared/interfaces/character.interface';
import { Episode } from 'src/app/shared/interfaces/episode.interface';
// Services
import { CharacterService } from 'src/app/shared/services/character.service';
import { EpisodeService } from 'src/app/shared/services/episode.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  id: number;
  character$: Observable<Character[]>;
  episode$: Observable<Episode[]>;
  characterEpisodes = [];
  characterByEpisode = [];
  hiddenEpisodes: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private characterService: CharacterService,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    this.getCharacter();
    this.getEpisode();
  }

  getCharacter(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.character$ = this.characterService.getDetails(this.id);
    });
  }

  async getEpisode() {
    try {
      await this.character$.subscribe((res) => {
        let response: any = res;
        response.episode.map(async (item) => {
          await this.episodeService.getEpisodes(item).subscribe((res) => {
            this.characterEpisodes.push(res);
            console.log(this.characterEpisodes);
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  getCharactersEpisodes(c): void {
    console.log(c);
    c.characters.map((item) => {
      this.characterService.getCharactersEpisodes(item).subscribe((res) => {
        console.log(res);
        this.characterByEpisode.push(res);
        this.hiddenEpisodes = true;
      });
    });
  }

  deleteCharacterByEpisode() {
    this.characterByEpisode = [];
    this.hiddenEpisodes = false;
  }
}
