import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }  

  getLists() {
    return this.webRequestService.get('lists');
  }

  createList(title: string) {
    // to send a Web request to create a List
    return this.webRequestService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    // to send a Web request to update a List
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  deleteList(listId: string) {
    return this.webRequestService.delete(`lists/${listId}`);
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string) {
    // to send a Web request to create a Task
    return this.webRequestService.post(`lists/${listId}/tasks`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateTask(listId: string, taskId: string, title: string) {
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, {title});
  }

  completeTask(task: Task) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }
}
