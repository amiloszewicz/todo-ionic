import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { switchMap } from 'rxjs';
import { TodoService } from '../shared/data-access/todo.service';
@Component({
  selector: 'app-detail',
  template: `
    <ng-container *ngIf="todo$ | async as todo">
      <ion-header>
        <ion-toolbar>
          <ion-title> {{ todo.title }} </ion-title>
          <ion-buttons>
            <ion-back-button defaultHref="/home"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h2>{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
      </ion-content>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  todo$ = this.route.params.pipe(
    switchMap((params) => this.todoService.getTodoById(params?.['id']))
  );

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}
}

@NgModule({
  declarations: [DetailComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailComponent,
      },
    ]),
  ],
})
export class DetailComponentModule {}
