import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { PhotoService } from '../../../services/photo.service';
import { CommentSystemComponent } from '../../comment-components/comment-system/comment-system.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommentSystemComponent, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blog!: Blog;
  blogPhotoUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.blogService.get(blogId).subscribe(blog => {
      this.blog = blog;

      if (!!this.blog.photoId) {
        this.photoService.get(this.blog.photoId).subscribe(photo => {
          this.blogPhotoUrl = photo.imageUrl;
        });
      }
    });
  }
}