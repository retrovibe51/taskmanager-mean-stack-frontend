import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewList(title: string){
    this.taskService.createList(title).subscribe((list: List) => {
      console.log(list);
      // After successfully creating a new list, we navigate to /lists/response._id (so that newly created list will be selected in task-view page)
      this.router.navigate(['/lists', list._id])
    })
  }
    
}
