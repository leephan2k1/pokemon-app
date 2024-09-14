import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() isShowStatus = false;
  @Input() pokemon?: Pokemon;

  readonly mapTypeColor: Record<string, string> = {
    normal: '#d9d9d9',
    grass: '#47ab57',
    fire: '#fd7d24',
    water: '#4592c4',
    bug: '#719f3f',
    electric: '#eed535',
    rock: '#a38c21',
    ghost: '#7b62a3',
    poison: '#b97fc9',
    psychic: '#b97fc9',
    fighting: '#d56723',
    ground: '#ab9842',
    dragon: '#f06d56',
    dark: '#000000',
  };

  get colorByType() {
    if (this.pokemon?.type1) {
      return this.mapTypeColor[this.pokemon.type1.toLocaleLowerCase()];
    } else if (this.pokemon?.type2) {
      return this.mapTypeColor[this.pokemon.type2.toLocaleLowerCase()];
    }

    return '#d9d9d9';
  }
}
