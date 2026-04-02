import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFilterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
