import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonQueries } from '../../../dtos/queries-pokemon.dto';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../models/pokemon';
import { RouterModule } from '@angular/router';
import { TrackingImportPokemonService } from '../../../services/tracking-import.service';

@Component({
  selector: 'app-pokemon-container',
  standalone: true,
  imports: [PokemonCardComponent, RouterModule],
  templateUrl: './pokemon-container.component.html',
  styleUrl: './pokemon-container.component.scss',
})
export class PokemonContainerComponent implements OnChanges, OnInit {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trackingImportPokemonService: TrackingImportPokemonService,
  ) {}

  @Input() pokemonQueries: Partial<PokemonQueries> = {};

  dummyList: Array<number> = Array.from(new Array(10).keys());
  pokemonList: Pokemon[] = [];
  isFetching: boolean = false;
  isEmpty = false;

  ngOnInit(): void {
    this.trackingImportPokemonService.totalUploaded$.subscribe((total) => {
      if (total !== 0) {
        this.fetchPokemonList();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['pokemonQueries']?.currentValue &&
      Object.keys(this.pokemonQueries).length &&
      !this.isFetching
    ) {
      this.fetchPokemonList();
    }
  }

  private fetchPokemonList() {
    this.isFetching = true;
    this.isEmpty = false;
    this.pokemonService.getPokemonList(this.pokemonQueries).subscribe(
      (res) => {
        this.pokemonList = res.data;

        if (res.data?.length === 0) this.isEmpty = true;
      },
      (error) => {},
      () => {
        this.isFetching = false;
      },
    );
  }
}
