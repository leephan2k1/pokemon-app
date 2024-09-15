import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.BASE_URL;
  constructor(private readonly http: HttpClient) {}

  public getPokemonFavoriteList(): Observable<Pokemon[]> {
    const accessToken = localStorage.getItem('access_token');

    return this.http.get<Pokemon[]>(`${this.baseUrl}/users/favorite`, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });
  }

  public toggleFavoritePokemon(
    isMark: boolean,
    pokemonId: number,
  ): Observable<{
    status: 'success' | 'failed';
  }> {
    const accessToken = localStorage.getItem('access_token');

    return this.http.post<{
      status: 'success' | 'failed';
    }>(
      `${this.baseUrl}/users/favorite`,
      {
        isMark,
        pokemonId,
      },
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      },
    );
  }
}
