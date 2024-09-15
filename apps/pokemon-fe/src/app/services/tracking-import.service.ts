import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { PageInfo } from '../dtos/api-list.response.dto';

@Injectable({
  providedIn: 'root',
})
export class TrackingPokemonService {
  private searchText = new BehaviorSubject<string>('');
  private totalUploadedSubject = new BehaviorSubject<number>(0);
  private pageInfoSubject = new BehaviorSubject<PageInfo>({} as PageInfo);

  totalUploaded$ = this.totalUploadedSubject.asObservable();
  searchText$ = this.searchText.asObservable();
  pageInfo$ = this.pageInfoSubject.asObservable();

  setPageInfo(pageInfo: PageInfo) {
    this.pageInfoSubject.next(pageInfo);
  }

  setSearchText(searchText: string) {
    this.searchText.next(searchText);
  }

  setTotalUploaded(total: number) {
    this.totalUploadedSubject.next(total);
  }

  getTotalUploaded() {
    return this.totalUploadedSubject.value;
  }
}
