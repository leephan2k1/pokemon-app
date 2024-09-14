import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingPokemonService {
  private searchText = new BehaviorSubject<string>('');
  private totalUploadedSubject = new BehaviorSubject<number>(0);

  totalUploaded$ = this.totalUploadedSubject.asObservable();
  searchText$ = this.searchText.asObservable();

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
