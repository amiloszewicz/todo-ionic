import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Todo } from '../shared/interfaces/todo';
import { TodoFormComponentModule } from './ui/todo-form.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Todo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-todo-form (todoSubmitted)="createTodo($event)"></app-todo-form>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  createTodo(todo: Todo) {
    console.log(todo);
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
