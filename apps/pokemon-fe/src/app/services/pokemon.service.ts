import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonQueries } from '../dtos/queries-pokemon.dto';
import { Observable } from 'rxjs';
import { ApiListResponse } from '../dtos/api-list.response.dto';
import { Pokemon } from '../models/pokemon';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = environment.BASE_URL;
  constructor(private readonly http: HttpClient) {}

  public getPokemonList(
    pokemonQueries: Partial<PokemonQueries>,
  ): Observable<ApiListResponse<Pokemon>> {
    const { page, limit } = pokemonQueries;

    return this.http.get<ApiListResponse<Pokemon>>(`${this.baseUrl}/pokemons`, {
      params: {
        page: page ? page : 1,
        limit: limit ? limit : 20,
        ...pokemonQueries,
      },
    });
  }

  public importPokemonList(formData: FormData) {
    return this.http.post<{ totalUploaded: number }>(
      `${this.baseUrl}/pokemons/import`,
      formData,
    );
  }
}
