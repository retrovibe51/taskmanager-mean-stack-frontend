import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  selectedListId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        }
        else {
          this.tasks = undefined;
        }
        
      }
    )

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })

  }

  onTaskClick(task: Task){
    // to set the task to completed
    this.taskService.completeTask(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed Sucessfully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log("list deleted!!!");
      console.log(res);
    })
  }

  onDeleteTaskClick(taskId: string) {
    this.taskService.deleteTask(this.selectedListId, taskId).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== taskId);  // filter used to refresh the tasks after deleting
      console.log("task deleted!!!");
      console.log(res);
    })
  }

}
