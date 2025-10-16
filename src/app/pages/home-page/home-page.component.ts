import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-home-page',
  imports: [NavComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
