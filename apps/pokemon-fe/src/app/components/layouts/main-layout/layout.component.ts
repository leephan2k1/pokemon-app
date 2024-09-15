import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavAuthComponent } from '../../shared/nav-auth/nav-auth.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavAuthComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
