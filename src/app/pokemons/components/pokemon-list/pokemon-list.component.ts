import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
