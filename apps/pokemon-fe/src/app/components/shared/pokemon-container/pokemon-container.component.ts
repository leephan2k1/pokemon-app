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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TrackingPokemonService } from '../../../services/tracking-import.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pokemon-container',
  standalone: true,
  imports: [
    PokemonCardComponent,
    RouterModule,
    NzModalModule,
    FavoriteButtonComponent,
  ],
  templateUrl: './pokemon-container.component.html',
  styleUrl: './pokemon-container.component.scss',
})
export class PokemonContainerComponent implements OnChanges, OnInit {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trackingPokemonService: TrackingPokemonService,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
  ) {}

  @Input() pokemonQueries: Partial<PokemonQueries> = { page: 1, limit: 20 };
  @Input() isHomePage = false;

  dummyList: Array<number> = Array.from(new Array(10).keys());
  pokemonList: Pokemon[] = [];
  currentPokemon: Pokemon = {} as Pokemon;
  isFetching: boolean = false;
  isEmpty = false;
  isVisible = false;
  isOkLoading = false;
  isAuth = false;

  ngOnInit(): void {
    this.trackingPokemonService.totalUploaded$.subscribe((total) => {
      if (total !== 0) {
        this.fetchPokemonList();
      }
    });

    this.trackingPokemonService.searchText$.subscribe((searchText) => {
      if (this.isHomePage) return;
      this.pokemonQueries = { ...this.pokemonQueries, name: searchText };
      this.fetchPokemonList();
    });

    this.authService.currentUser.subscribe((user) => {
      if (user && user.id) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    this.onPageChange();
  }

  showModal(currentPokemon: Pokemon): void {
    this.currentPokemon = currentPokemon;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  private onPageChange() {
    if (this.isHomePage) return;

    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']);
      const limit = Number(params['limit']);
      const type = params['type'];
      const isLegendary = params['isLegendary'];
      const minSpeed = Number(params['minSpeed']);
      const maxSpeed = Number(params['maxSpeed']);

      this.pokemonQueries = {
        ...this.pokemonQueries,
        isLegendary,
      };

      if (type) {
        this.pokemonQueries.type = type;
      }

      if (!isNaN(maxSpeed)) {
        this.pokemonQueries.maxSpeed = maxSpeed;
      }

      if (!isNaN(minSpeed)) {
        this.pokemonQueries.minSpeed = minSpeed;
      }

      if (!isNaN(page)) {
        this.pokemonQueries.page = page;
      }

      if (!isNaN(limit)) {
        this.pokemonQueries.limit = limit;
      }

      this.fetchPokemonList();
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

        this.trackingPokemonService.setPageInfo(res.pageInfo);

        if (res.data?.length === 0) this.isEmpty = true;
      },
      (error) => {},
      () => {
        this.isFetching = false;
      },
    );
  }
}
