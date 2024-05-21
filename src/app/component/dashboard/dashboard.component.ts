import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../services/blog.service';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from '../../pipes/summary.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SummaryPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userBlogs!: Blog[];

  constructor(
    private blogService: BlogService,
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.userBlogs = [];

    let currentApplicationUserId: any = this.accountService.currentUserValue?.applicationUserId;

    this.blogService.getByApplicationUserId(currentApplicationUserId).subscribe(userBlogs => {
      this.userBlogs = userBlogs;
    });
  }

  confirmDelete(blog: Blog) {
    blog.deleteConfirm = true;
  }

  cancelDeleteConfirm(blog: Blog) {
    blog.deleteConfirm = false;
  }

  deleteConfirmed(blog: Blog, blogs: Blog[]) {
    this.blogService.delete(blog.blogId).subscribe(() => {

      let index = 0;

      for (let i=0; i<blogs.length; i++) {
        if (blogs[i].blogId === blog.blogId) {
          index = i;
        }
      }

      if (index > -1) {
        blogs.splice(index, 1);
      }

      this.toastr.info("Blog deleted.");
    });
  }

  editBlog(blogId: number) {
    this.router.navigate([`/dashboard/${blogId}`]);
  }

  createBlog() {
    this.router.navigate(['/dashboard/-1']);
  }
}