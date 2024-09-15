import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImportPokemonComponent } from '../import-pokemon/import-pokemon.component';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TrackingPokemonService } from '../../../services/tracking-import.service';
@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [ImportPokemonComponent, FormsModule],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss',
})
export class SearchContainerComponent implements OnInit, OnDestroy {
  constructor(
    private readonly trackingPokemonService: TrackingPokemonService,
  ) {}

  private searchSubject = new Subject<string>();
  inputText: string = '';
  private readonly debounceTimeMs = 300;

  onSearch() {
    this.searchSubject.next(this.inputText);
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  performSearch(searchValue: string) {
    this.trackingPokemonService.setSearchText(searchValue.trim());
  }
}
