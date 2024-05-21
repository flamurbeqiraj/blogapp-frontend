import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo } from '../../../models/photo';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog, BlogCreate } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { PhotoService } from '../../../services/photo.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [CommonModule, NgbTypeaheadModule, RouterModule, ReactiveFormsModule],
  templateUrl: './blog-edit.component.html',
  styleUrl: './blog-edit.component.css'
})
export class BlogEditComponent {
  
  blogForm!: FormGroup;
  confirmImageDelete: boolean = false;
  userPhotos: Photo[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private photoService: PhotoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.blogForm = this.formBuilder.group({
      blogId: [blogId],
      title: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      content : ['', [
        Validators.required,
        Validators.minLength(300),
        Validators.maxLength(5000),
      ]],
      photoDescription: [null],
      photoId: [null]
    });

    this.photoService.getByApplicationUserId().subscribe(userPhotos => {
      this.userPhotos = userPhotos;
    });

    if (!!blogId && blogId !== -1) {
      this.blogService.get(blogId).subscribe(blog => {
        this.updateForm(blog);
      });
    }
  }

  getPhoto(photoId: number) {
    for (let i=0; i<this.userPhotos.length; i++) {
      if (this.userPhotos[i].photoId === photoId) {
        return this.userPhotos[i];
      } 
    }

    return null;
  }

  isTouched(field: string) {
    return this.blogForm.get(field)?.touched;
  }

  hasErrors(field: string) {
    return this.blogForm.get(field)?.errors;
  }

  hasError(field: string, error: string) {
    return !!this.blogForm.get(field)?.hasError(error);
  }

  isNew() {
    return parseInt(this.blogForm.get('blogId')?.value) === -1;
  }

  detachPhoto() {
    this.blogForm.patchValue({
      photoId: null,
      photoDescription: null
    });
  }

  updateForm(blog: Blog) {
    let photoDescription = this.getPhoto(blog.photoId!)?.description;

    this.blogForm.patchValue({
      blogId: blog.blogId,
      title: blog.title,
      content: blog.content,
      photoId: blog.photoId,
      photoDescription: photoDescription
    });
  }

  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
	// 	text$.pipe(
	// 		debounceTime(200),
	// 		distinctUntilChanged(),
	// 		map((term) =>
	// 			term.length < 2 ? [] : this.userPhotos.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
	// 		),
	// 	);

  onSelect(event: any): void {
    let chosenPhoto: Photo = event.item;

    this.blogForm.patchValue({
      photoId: chosenPhoto.photoId,
      photoDescription: chosenPhoto.description
    });
  }

  onSubmit() {
    let blogCreate: BlogCreate = {
      blogId: this.blogForm.get("blogId")?.value,
      title: this.blogForm.get("title")?.value,
      content: this.blogForm.get("content")?.value,
      photoId: this.blogForm.get("photoId")?.value
    };

    this.blogService.create(blogCreate).subscribe(createdBlog => {
      this.updateForm(createdBlog);
      this.toastr.info("Blog saved.");
    })
  }
}
