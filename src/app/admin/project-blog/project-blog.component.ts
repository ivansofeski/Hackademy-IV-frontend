import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Blog } from '../interface/blog';

@Component({
  selector: 'app-project-blog',
  templateUrl: './project-blog.component.html',
  styleUrls: ['./project-blog.component.scss']
})
export class ProjectBlogComponent implements OnInit {
  _projectId: number = 0;
  allBlogs:Blog[] = [];
  blogList:Blog[] = [];
  errors: any[] = [];

  get projectId():number {
    return this._projectId;
  }
  @Input('projectId') set projectId(value:number){
    this._projectId = value;
    this.filteBlogs();
  }

  filteBlogs(){
    if(this._projectId > 0){
      this.blogList = this.allBlogs.filter((v,k) => {return v.projectId == this._projectId});
    }else{
      this.blogList = this.allBlogs;
    }
    console.log(this._projectId , this.blogList, this.allBlogs);
  }

  constructor(private dataService: DataService) { 

  }

  ngOnInit() {
    this.dataService.getBlogs().subscribe(
      res => {
        this.allBlogs = res;
        this.filteBlogs();
      },
      
      error => {
        this.errors.push(error);
      }
    );
  }

}
