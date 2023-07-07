import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
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

  getTodoById(id: string) {
    return this.todos$.pipe(
      map((todos) => todos.find((todo) => todo.id === id))
    );
  }
}
