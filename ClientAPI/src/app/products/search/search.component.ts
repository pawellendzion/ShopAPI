import { FilterService } from './../../Services/filter.service';
import { ActivatedComponentService } from 'src/app/Services/activated-component.service';
import { ProductModelInterface } from './../../Interfaces/product-model-interface';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  products$!: Observable<ProductModelInterface[]>;
  private searchTerms = new Subject<string>();

  constructor(private filterService: FilterService, private activated: ActivatedComponentService) {}

  show(term: string) {
    document.getElementById('list')!.style.display = 'none';
    this.activated.getComponent.show(term);
  }

  search(term: string) {
    document.getElementById('list')!.style.display = 'block';
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.filterService.searchProducts(term)),
    );
  }
}
