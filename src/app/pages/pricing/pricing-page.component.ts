import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrincingPageComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platforId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // // NO usar (recomendable)
    // if (isPlatformBrowser(this.platforId)) {
    //   document.title = 'Princing Page';
    // }

    // console.log('hola mundo', { platforId: this.platforId });
    // console.log(isPlatformServer(this.platforId));

    // USAR (recomendable)
    this.title.setTitle('Princing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'este es mi Princing page',
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'Princing Page',
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'hola,mundo,kevin,jimenez',
    });
  }
}
