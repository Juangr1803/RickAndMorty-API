import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Character } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  info: RequestInfo = {
    next: null,
  };

  showGoUpButton: boolean = false;

  private pageNum: number = 1;
  private query: string;
  private hideScrollHeight: number = 200;
  private showScrollHeight: number = 500;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private characterService: CharacterService,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageXOffset;
    if (
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  onScrollDown(): void {
    if (this.info.next) {
      this.pageNum++;
      this.getAllCharacters();
    }
  }

  onScrollTop(): void {
    // Safari
    this.document.body.scrollTop = 0;
    // Other navigators
    this.document.documentElement.scrollTop = 0;
  }

  characterDetail(id: number): void {
    this.router.navigate(['/character-detail', id]);
    this.characterService.getDetails(id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  getAllCharacters(): void {
    this.characterService
      .getCharacters(`${environment.urlApi}?page=${this.pageNum}`)
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
          this.pageNum = this.pageNum + 1;
        } else {
          this.characters = [];
        }
      });
  }
}
