import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../components/shared/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroCarouselComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
