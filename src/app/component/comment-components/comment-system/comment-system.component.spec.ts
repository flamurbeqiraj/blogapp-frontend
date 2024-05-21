import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSystemComponent } from './comment-system.component';

describe('CommentSystemComponent', () => {
  let component: CommentSystemComponent;
  let fixture: ComponentFixture<CommentSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
