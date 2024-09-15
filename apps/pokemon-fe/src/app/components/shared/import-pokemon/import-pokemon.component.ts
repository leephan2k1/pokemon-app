import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PokemonService } from '../../../services/pokemon.service';
import { TrackingPokemonService } from '../../../services/tracking-import.service';

@Component({
  selector: 'app-import-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './import-pokemon.component.html',
  styleUrl: './import-pokemon.component.scss',
})
export class ImportPokemonComponent implements OnInit {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly trackingPokemonService: TrackingPokemonService,
  ) {}

  ngOnInit(): void {
    initFlowbite();
  }

  file?: File;
  fileName = '';
  isUploading = false;
  formData: FormData = new FormData();
  modalInstance: any = null;

  @ViewChild('modal') modal!: ElementRef;

  handleUploadPokemonList() {
    if (!this.file) return;

    this.isUploading = true;

    this.pokemonService.importPokemonList(this.formData).subscribe(
      (res) => {
        this.trackingPokemonService.setTotalUploaded(res.totalUploaded);
      },
      (err) => {},
      () => {
        this.isUploading = false;

        const overlay = document.querySelector('body > div');
        const model = document.querySelector('#static-modal');
        this.file = undefined;
        overlay?.remove();
        model?.classList.add('hidden');
        initFlowbite();
      },
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;

      this.formData = new FormData();
      this.formData.append('file', file);
    }
  }
}
