import { Component, Input } from '@angular/core';
import { BlogComment, BlogCommentView } from '../../../models/blog-comment';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { BlogCommentService } from '../../../services/blog-comment.service';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentBoxComponent, DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input() comments: BlogCommentView[] = [];

  constructor(
    public accountService: AccountService,
    private toastr: ToastrService,
    private blogCommentService: BlogCommentService
  ) { }

  ngOnInit(): void {
  }

  editComment(comment: BlogCommentView) {
    comment.isEditable = true;
  }

  showDeleteConfirm(comment: BlogCommentView) {
    comment.deleteConfirm = true;
  }

  cancelDeleteConfirm(comment: BlogCommentView) {
    comment.deleteConfirm = false;
  }

  deleteConfirm(comment: BlogCommentView, comments: BlogCommentView[]) {
    this.blogCommentService.delete(comment.blogCommentId).subscribe(() => {

      let index = 0;

      for(let i=0; i<comments.length; i++) {
        if (comments[i].blogCommentId === comment.blogCommentId) {
          index = i;
        }
      }

      if (index > -1) {
        comments.splice(index, 1);
      }

      this.toastr.info("Blog comment deleted.");
    });
  }

  replyComment(comment: BlogCommentView) {
    let replyComment: BlogCommentView = {
      parentBlogCommentId: comment.blogCommentId,
      content: '',
      blogId: comment.blogId,
      blogCommentId: -1,
      username: this.accountService.currentUserValue?.username || "",
      publishDate: new Date(),
      updateDate: new Date(),
      isEditable: false,
      deleteConfirm: false,
      isReplying: true,
      comments: []
    };

    comment.comments.push(replyComment);
  }

  onCommentSaved(blogComment: BlogComment, comment: BlogCommentView) {
    comment.blogCommentId = blogComment.blogCommentId;
    comment.parentBlogCommentId = blogComment.parentBlogCommentId || null;
    comment.blogId = blogComment.blogId;
    comment.content = blogComment.content;
    comment.publishDate = blogComment.publishDate;
    comment.updateDate = blogComment.updateDate;
    comment.username = blogComment.username;
    comment.isEditable = false;
    comment.isReplying = false;
  }
}
