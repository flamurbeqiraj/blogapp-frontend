import { Component } from '@angular/core';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-famous-blogs',
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './famous-blogs.component.html',
  styleUrl: './famous-blogs.component.css'
})
export class FamousBlogsComponent {
  famousBlogs: Blog[] = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogService.getMostFamous().subscribe(blogs => {
      this.famousBlogs = blogs;
    });
  }
}
