import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  // public isLoading = signal(true);
  // private readonly appRef = inject(ApplicationRef);

  // private $appSTate = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  private readonly pokemonsService = inject(PokemonsService);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    // this.route.queryParamMap.pipe(
    this.route.params.pipe(
      // map((params) => Number(params.get('page') ?? 1))
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(Number(page)) ? 1 : Number(page))),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(() => {
    console.log('Pagino cambio', this.currentPage());
    this.loadPokemons(this.currentPage());
  });

  // ngOnInit() {
  //   // this.route.queryParamMap.subscribe((params) => {});
  //   console.log(this.currentPage());

  //   this.loadPokemons();
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);
  // }

  public loadPokemons(page = 0) {
    // const pageToLoad = this.currentPage()! + page;
    // console.log({ pageToLoad, currentPage: this.currentPage() });

    this.pokemonsService
      .loadPage(page)
      .pipe(
        // tap(() =>
        //   this.router.navigate([], { queryParams: { page: pageToLoad } })
        // ),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
        // console.log('on init');
      });
  }

  // ngOnDestroy(): void {
  //   this.$appSTate.unsubscribe();
  // }
}
