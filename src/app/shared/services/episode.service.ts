import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Interface
import { Episode } from '../interfaces/episode.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  // GET ALL EPISODES
  getEpisodes(api_url: string): Observable<Episode[]> {
    return this.http.get<Episode[]>(api_url);
  }
}
