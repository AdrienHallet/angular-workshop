import { Component } from '@angular/core';
import { TableExampleComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  imports: [TableExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-workshop';
}
