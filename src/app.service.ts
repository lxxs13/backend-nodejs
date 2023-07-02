import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllPokemons(
    limit = 10000,
    page = 0,
    search?: string,
  ): Observable<string[]> {
    let url = this.baseUrl;

    if (limit && page) {
      url += `?offset=${(page - 1) * limit}&limit=${limit}`;
    } else {
      url += `?offset=${page}&limit=${limit}`;
    }

    return this.httpService.get(url).pipe(
      map((response) => {
        const results = response.data.results;
        return this.extractPokemonNames(results, search);
      }),
    );
  }

  // postPokemon() { }

  private extractPokemonNames(results: any[], search?: string): string[] {
    if (!search) {
      return results.sort();
    }

    return results.filter((pokemon) => pokemon.name.includes(search)).sort();
  }
}
