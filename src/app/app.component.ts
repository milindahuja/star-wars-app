import { Component, ViewChild } from '@angular/core';
import { DynamicChildLoaderDirective } from './directives/dynamic-child-loader.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild(DynamicChildLoaderDirective, { static: true })
  dynamicChild!: DynamicChildLoaderDirective;
  
  title = 'star-wars-app';

  constructor() {}

  ngOnInit(): void {}
}
