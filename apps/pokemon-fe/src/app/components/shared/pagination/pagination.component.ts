import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TrackingPokemonService } from '../../../services/tracking-import.service';
import { PageInfo } from '../../../dtos/api-list.response.dto';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly trackingPokemonService: TrackingPokemonService,
  ) {}

  currentPage = 1;
  pageInfo: PageInfo = {} as PageInfo;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']);

      if (!isNaN(page)) {
        this.currentPage = page;
      }
    });

    this.trackingPokemonService.pageInfo$.subscribe((pageInfo) => {
      this.pageInfo = pageInfo;
      this.currentPage = pageInfo.currentPage;
    });
  }

  onPageClick(page: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.changingQueryParams({ page });
    this.currentPage = page;
  }

  private changingQueryParams(queryParams: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  getClassNameByCurrentPage(page: number) {
    if (page === this.currentPage) {
      return 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
    }

    return 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
  }
}
