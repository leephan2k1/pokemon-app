import { Component, OnInit } from '@angular/core';
import { HeroCarouselComponent } from '../../components/shared/hero-carousel/hero-carousel.component';
import { PokemonContainerComponent } from '../../components/shared/pokemon-container/pokemon-container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroCarouselComponent, PokemonContainerComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
