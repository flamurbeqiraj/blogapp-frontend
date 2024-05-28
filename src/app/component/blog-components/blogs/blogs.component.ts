import { Component } from '@angular/core';
import { Blog, BlogPaging, PagedResoults } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [NgbPaginationModule, BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  pagedBlogResult: any = {
    items: []
  };

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPagedBlogResult(1, 6);
  }

  pageChanged(event: any) : void {
    this.loadPagedBlogResult(event.page, event.itemsPerPage);
  }

  loadPagedBlogResult(page: any, itemsPerPage: any) {
    let blogPaging: BlogPaging = {page: page, pagesSize: itemsPerPage};

    this.blogService.getAll(blogPaging).subscribe(pagedBlogs => {
      this.pagedBlogResult = pagedBlogs;
    });
  }
}