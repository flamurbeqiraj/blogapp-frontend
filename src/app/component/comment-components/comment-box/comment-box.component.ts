import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BlogCommentService } from '../../../services/blog-comment.service';
import { ToastrService } from 'ngx-toastr';
import { BlogComment, BlogCommentCreate, BlogCommentView } from '../../../models/blog-comment';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {

  @Input() comment!: BlogCommentView;
  @Output() commentSaved = new EventEmitter<BlogComment>();

  @ViewChild('commentForm') commentForm!: NgForm;

  constructor(
    private blogCommentService: BlogCommentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  resetComment() {
    this.commentForm.reset();
  }

  onSubmit() {

    let blogCommentCreate: BlogCommentCreate = {
      blogCommentId: this.comment.blogCommentId,
      parentBlogCommentId: this.comment.parentBlogCommentId,
      blogId: this.comment.blogId,
      content: this.comment.content
    };

    this.blogCommentService.create(blogCommentCreate).subscribe(blogComment => {
      this.toastr.info("Comment saved.");
      this.resetComment();
      this.commentSaved.emit(blogComment);
    })
  }
}
