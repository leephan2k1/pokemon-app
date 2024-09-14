export class FavoritePokemonResponse {
  status: 'success' | 'failed';

  constructor(params: Partial<FavoritePokemonResponse>) {
    Object.assign(this, { ...params });
  }
}
