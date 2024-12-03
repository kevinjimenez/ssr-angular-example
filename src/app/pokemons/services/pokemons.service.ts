import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private readonly httpClient = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    // 1 = 0
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.httpClient
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map(({ results }) => {
          const simplePokemons: SimplePokemon[] = results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemons;
        })
        // tap((simplePokemons) => console.log(simplePokemons))
      );
  }

  public loadPookemon(id: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
  }
}
