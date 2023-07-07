import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../interfaces/todo';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  addTodo(todo: Todo) {
    const newTodos = [...this.todos$.value, todo];
    this.todos$.next(newTodos);
  }
}
