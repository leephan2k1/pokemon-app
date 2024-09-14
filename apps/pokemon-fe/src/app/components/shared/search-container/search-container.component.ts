import { Component } from '@angular/core';
import { ImportPokemonComponent } from '../import-pokemon/import-pokemon.component';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [ImportPokemonComponent],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss',
})
export class SearchContainerComponent {}
