import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingImportPokemonService {
  private totalUploadedSubject = new BehaviorSubject<number>(0);

  totalUploaded$ = this.totalUploadedSubject.asObservable();

  setTotalUploaded(total: number) {
    this.totalUploadedSubject.next(total);
  }

  getTotalUploaded() {
    return this.totalUploadedSubject.value;
  }
}
