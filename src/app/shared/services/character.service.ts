import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Environment
import { environment } from 'src/environments/environment';
// Interface
import { Character } from '../interfaces/character.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  // GET
  getCharacters(api_url: string): Observable<Character[]> {
    return this.http.get<Character[]>(api_url);
  }

  // GET DETAIL
  getDetails(id: number): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.urlApi}${id}`);
  }

  // GET CHARACTERS BY EPISODE
  getCharactersEpisodes(api_url: string): Observable<Character[]> {
    return this.http.get<Character[]>(api_url);
  }
}
