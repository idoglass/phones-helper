import { Component, OnInit, Input } from '@angular/core';
import { Campaign, Question } from '../campaign';
import { WorkSpace } from 'src/app/users/user';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
@Input()
qusetion:Question

  constructor() { }

  ngOnInit(): void {
  }

}
