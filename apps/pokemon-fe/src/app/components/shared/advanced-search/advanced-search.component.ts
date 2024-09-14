import { Component, OnInit } from '@angular/core';
import { mapTypeColor, pokemonTypes } from '../../../utils/pokemon-type-helper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.scss',
})
export class AdvancedSearchComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  readonly mapTypeColor = mapTypeColor;
  readonly pokemonTypes = pokemonTypes;

  isLegendaryChecked = false;
  limit = 20;
  minSpeed?: number = 0;
  maxSpeed?: number = 0;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const isLegendary = Boolean(params['isLegendary']);
      const limit = Number(params['limit']);

      if (isLegendary !== undefined && isLegendary !== null) {
        this.isLegendaryChecked = isLegendary;
      }

      if (!isNaN(limit)) {
        this.limit = limit;
      }
    });
  }

  handleUpdateTypeQueryParams(type: string) {
    this.changingQueryParams({ type });
  }

  onMinSpeedChange() {
    this.changingQueryParams({ minSpeed: this.minSpeed });
  }

  onMaxSpeedChange() {
    this.changingQueryParams({ maxSpeed: this.maxSpeed });
  }

  onLegendaryChange(e: any) {
    this.changingQueryParams({ isLegendary: this.isLegendaryChecked });
  }

  onItemPerPageChange(e: any) {
    this.changingQueryParams({ limit: this.limit });
  }

  private changingQueryParams(queryParams: Params) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  colorByType(type: string) {
    return this.mapTypeColor[type.toLocaleLowerCase()] ?? '#d9d9d9';
  }
}
