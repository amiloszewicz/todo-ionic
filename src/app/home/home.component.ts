import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodoService } from '../shared/data-access/todo.service';
import { Todo } from '../shared/interfaces/todo';
import { TodoFormComponentModule } from './ui/todo-form.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Todo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-todo-form (todoSubmitted)="createTodo($event)"></app-todo-form>
      <ion-list>
        <ion-item-sliding *ngFor="let todo of todoService.todos$ | async">
          <ion-item-options side="start">
            <ion-item-option
              color="success"
              (click)="deleteTodo(todo.id); setDoneToastOpen(true)"
            >
              <ion-icon slot="start" name="checkmark-done-outline"></ion-icon>
              DONE
            </ion-item-option>
          </ion-item-options>
          <ion-item
            button
            routerLink="/detail/{{ todo.id }}"
            routerDirection="forward"
          >
            <ion-label>{{ todo.title }}</ion-label>
          </ion-item>
          <ion-item-options>
            <ion-item-option
              color="danger"
              (click)="deleteTodo(todo.id); setDeleteToastOpen(true)"
            >
              <ion-icon slot="start" name="trash"></ion-icon>
              Delete
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
      <ion-toast
        [isOpen]="isDeleteToastOpen"
        [duration]="5000"
        (didDismiss)="setDeleteToastOpen(false)"
        message="todo DELETED"
        [buttons]="toastButtons"
        color="danger"
        icon="information-circle-outline"
      >
      </ion-toast>
      <ion-toast
        [isOpen]="isDoneToastOpen"
        [duration]="5000"
        (didDismiss)="setDeleteToastOpen(false)"
        message="todo DONE"
        [buttons]="toastButtons"
        color="success"
        icon="checkmark-done-circle-outline"
      >
      </ion-toast>
    </ion-content>
  `,
  styles: [
    `
      ion-toolbar {
        text-align: center;
      }
      ion-list {
        margin: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  isDeleteToastOpen = false;
  isDoneToastOpen = false;

  toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];

  constructor(public todoService: TodoService) {}

  createTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  setDeleteToastOpen(isOpen: boolean) {
    this.isDeleteToastOpen = isOpen;
  }

  setDoneToastOpen(isOpen: boolean) {
    this.isDoneToastOpen = isOpen;
  }
}
@NgModule({
  declarations: [HomeComponent],
  imports: [
    IonicModule,
    CommonModule,
    TodoFormComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
