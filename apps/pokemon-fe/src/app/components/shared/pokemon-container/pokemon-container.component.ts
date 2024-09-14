import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonQueries } from '../../../dtos/queries-pokemon.dto';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-container',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-container.component.html',
  styleUrl: './pokemon-container.component.scss',
})
export class PokemonContainerComponent implements OnChanges {
  constructor(private readonly pokemonService: PokemonService) {}

  @Input() pokemonQueries: Partial<PokemonQueries> = {};

  dummyList: Array<number> = Array.from(new Array(10).keys());
  pokemonList: Pokemon[] = [];
  isFetching: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['pokemonQueries']?.currentValue &&
      Object.keys(this.pokemonQueries).length
    ) {
      this.fetchPokemonList();
    }
  }

  private fetchPokemonList() {
    this.isFetching = true;
    this.pokemonService.getPokemonList(this.pokemonQueries).subscribe(
      (res) => {
        this.pokemonList = res.data;
        console.log('res: ', res);
      },
      (error) => {
        console.log('error: ', error);
      },
      () => {
        this.isFetching = false;
      },
    );
  }
}
