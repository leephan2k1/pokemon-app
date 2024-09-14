import { Component, OnInit } from '@angular/core';
import { PokemonContainerComponent } from '../../components/shared/pokemon-container/pokemon-container.component';
import { SearchContainerComponent } from '../../components/shared/search-container/search-container.component';

@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [PokemonContainerComponent, SearchContainerComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.scss',
})
export class BrowsePageComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
