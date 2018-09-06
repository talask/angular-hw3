import { Component, OnInit,  ViewChild } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Post';
import { PostForm } from '../../models/Post';
import { post } from 'selenium-webdriver/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  comments: Comment[];
  isAdmin = true;
  isView = true;
  post: PostForm = {
    userId: 1,
    title: '',
    body: '',
    isComment: false
  };
  @ViewChild('form') form: FormGroup;
  
  constructor( 
    public postService: PostsService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    }, error => {
      this.toastr.error(error.message, 'Error');
    });
  }
  onDelete(id: number){
    this.spinner.show();
    this.postService.deletePost(id).subscribe((data: Object) => {
      this.posts = this.posts.filter(post => post.id != id);
      this.spinner.hide();
      this.toastr.success('Post deleted success', 'Message');
    }, error => {
      this.toastr.error(error.message, 'Error');
      this.spinner.hide();
    });
  }

  onShowComment(id: number) {
    this.posts.forEach((post) => {
      if((post.id === id) && (!post.isComment)) {
        post.isComment = true;
        this.postService.showPost(id).subscribe((data: Object) => {
        this.comments = JSON.parse(JSON.stringify(data));
       }, error => {
        this.toastr.error(error.message, 'Error');
      });
    } else {
      post.isComment = false;
    }
    });
}

onSubmit(form) {
  this.spinner.show();
  if(form.invalid) return;
    const newItem: PostForm = {
      userId: 1,
      body: this.post.body,
      title: this.post.title,
      isComment: false
    }

    this.postService.addPost(newItem).subscribe(data => {
     this.form.reset();
     this.toastr.success('Post added success', 'Message');
     this.spinner.hide();
     }, error => {
      this.toastr.error(error.message, 'Error');
      this.spinner.hide();
    });
   
}

}
