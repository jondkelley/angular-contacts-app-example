import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromRoot from '@app/root-store';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar [title]="currentPageTitle$ | async" ></app-toolbar>

    <div class="container">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  currentPageTitle$ = this.store.pipe(
    select(fromRoot.getCurrentTitle)
  );
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    // create a lifecycle hook for LogDNA?
    // angular.io/guide/lifecycle-hooks
    var Logger = require('logdna');
    var options = {};

    var apikey = 'CHANGE___ME___';

    // Defaults to false, when true ensures meta object will be searchable
    //@ts-ignore
    options.index_meta = true;

    // Add tags in array or comma-separated string format:
    //@ts-ignore
    options.tags = ['logging', 'nodejs', 'logdna'];
    // or:
    //@ts-ignore
    options.tags = 'logging,nodejs,logdna';

    // Create multiple loggers with different options
    var logger = Logger.createLogger(apikey, options);

    // Test logging
    logger.log('Angular ngOnInit() ....');
  }
}
