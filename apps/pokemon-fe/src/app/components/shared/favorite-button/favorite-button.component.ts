import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent implements OnInit {
  constructor(private readonly userService: UserService) {}
  @Input() pokemon?: Pokemon;

  pokemonList: Array<Pokemon> = [];
  isFavorite = false;
  isFetching = false;

  ngOnInit(): void {
    this.userService.getPokemonFavoriteList().subscribe(
      (res) => {
        this.pokemonList = res;
        this.isFavorite = this.pokemonList.some(
          (p) => p.id === this.pokemon?.id,
        );
      },
      (err) => {},
      () => {},
    );
  }

  handleFavorite() {
    if (!this.pokemon?.id) return;

    this.isFetching = true;
    this.userService.toggleFavoritePokemon(true, this.pokemon?.id).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.isFavorite = !this.isFavorite;
        }
      },
      (err) => {},
      () => {
        this.isFetching = false;
      },
    );
  }

  handleUnFavorite() {
    if (!this.pokemon?.id) return;

    this.isFetching = true;
    this.userService.toggleFavoritePokemon(false, this.pokemon?.id).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.isFavorite = !this.isFavorite;
        }
      },
      (err) => {},
      () => {
        this.isFetching = false;
      },
    );
  }
}
