import { Component, Input } from '@angular/core';
import { BlogComment, BlogCommentView } from '../../../models/blog-comment';
import { BlogCommentService } from '../../../services/blog-comment.service';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-comment-system',
  standalone: true,
  imports: [],
  templateUrl: './comment-system.component.html',
  styleUrl: './comment-system.component.css'
})
export class CommentSystemComponent {

  @Input() blogId!: number;

  standAloneComment!: BlogCommentView;
  blogComments!: BlogComment[];
  blogCommentViewModels!: BlogCommentView[];

  constructor(
    private blogCommentService: BlogCommentService,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.blogCommentService.getAll(this.blogId).subscribe(blogComments => {

      if (this.accountService.isLoggedIn()) {
        this.initComment(this.accountService.currentUserValue!.username);
      }

      this.blogComments = blogComments;
      this.blogCommentViewModels = [];

      for (let i=0; i<this.blogComments.length; i++) {
        if (!this.blogComments[i].parentBlogCommentId) {
          this.findCommentReplies(this.blogCommentViewModels, i);
        }
      }

    });
  }

  initComment(username: string) {
    this.standAloneComment = {
      parentBlogCommentId: null,
      content: '',
      blogId: this.blogId,
      blogCommentId: -1,
      username: username,
      publishDate: null,
      updateDate: null,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    };
  }

  findCommentReplies(blogCommentViewModels: BlogCommentView[], index: number) {

    let firstElement = this.blogComments[index];
    let newComments: BlogCommentView[] = [];

    let commentViewModel: BlogCommentView = {
      parentBlogCommentId: firstElement.parentBlogCommentId || null,
      content: firstElement.content,
      blogId: firstElement.blogId,
      blogCommentId: firstElement.blogCommentId,
      username: firstElement.username,
      publishDate: firstElement.publishDate,
      updateDate: firstElement.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: newComments
    }

    blogCommentViewModels.push(commentViewModel);

    for (let i=0; i<this.blogComments.length; i++) {
      if (this.blogComments[i].parentBlogCommentId === firstElement.blogCommentId) {
        this.findCommentReplies(newComments, i);
      }
    }
  }

  onCommentSaved(blogComment: BlogComment) {
    let commentViewModel: BlogCommentView = {
      parentBlogCommentId: blogComment.parentBlogCommentId || null,
      content: blogComment.content,
      blogId: blogComment.blogId,
      blogCommentId: blogComment.blogCommentId,
      username: blogComment.username,
      publishDate: blogComment.publishDate,
      updateDate: blogComment.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    }

    this.blogCommentViewModels.unshift(commentViewModel);
  }

}
