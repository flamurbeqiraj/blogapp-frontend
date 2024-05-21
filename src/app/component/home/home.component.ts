import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { FamousBlogsComponent } from '../blog-components/famous-blogs/famous-blogs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, FamousBlogsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
