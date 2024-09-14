import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/shared/hero-carousel/hero-carousel.component';
import { PokemonContainerComponent } from '../../components/shared/pokemon-container/pokemon-container.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroCarouselComponent, PokemonContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
