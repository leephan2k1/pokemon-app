import { Component } from '@angular/core';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
})
export class HeroCarouselComponent {
  readonly videoUrls = [
    'https://www.youtube.com/embed/D0zYJ1RQ-fs?si=oGRqByVOSadyyUMd&autoplay=1&mute=1&controls=0',
    'https://www.youtube.com/embed/hX-NHafvY5I?si=-NmHvtBKEB7Gfir5&autoplay=1&mute=1&controls=0',
    'https://www.youtube.com/embed/uBYORdr_TY8?si=WIrVU9xb5mOTK3gz&autoplay=1&mute=1&controls=0',
    'https://www.youtube.com/embed/8PGsP59Io20?si=VvFsP_p7UTWi1rmg&autoplay=1&mute=1&controls=0',
  ];
}
