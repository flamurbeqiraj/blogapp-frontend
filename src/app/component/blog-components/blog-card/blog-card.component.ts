import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../../models/blog';
import { PhotoService } from '../../../services/photo.service';
import { SummaryPipe } from '../../../pipes/summary.pipe';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [SummaryPipe],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {

  @Input() blog!: Blog;

  blogPhotoUrl!: string;

  constructor(
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    if (!!this.blog.photoId) {
      this.photoService.get(this.blog.photoId).subscribe(photo => {
        if (!!photo) {
          this.blogPhotoUrl = photo.imageUrl;
        }
      })
    }
  }

  readMore(blogId: number) {
    this.router.navigate([`/blogs/${blogId}`])
  }
}
