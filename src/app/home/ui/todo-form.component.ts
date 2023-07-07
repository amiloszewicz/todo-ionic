import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Todo } from 'src/app/shared/interfaces/todo';

@Component({
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="handleSubmit()">
      <ion-card>
        <ion-card-title>
          <ion-input
            type="text"
            formControlName="title"
            placeholder="title..."
          ></ion-input>
        </ion-card-title>
        <ion-card-content>
          <ion-input
            type="text"
            formControlName="description"
            placeholder="description..."
          ></ion-input>
          <ion-button expand="full" type="submit">Add Todo</ion-button>
        </ion-card-content>
      </ion-card>
    </form>
  `,
  styles: [
    `
      ion-card-title {
        padding-left: 20px;
      }
      ion-card-content {
        padding-top: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<Todo>();

  public todoForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    const value = this.todoForm.value;

    if (this.todoForm.valid && value.title && value.description) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: value.title as string,
        description: value.description as string,
      };

      this.todoSubmitted.emit(todo);
      this.todoForm.reset();
    }
  }
}
@NgModule({
  declarations: [TodoFormComponent],
  exports: [TodoFormComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class TodoFormComponentModule {}
