import { Component, Input, OnInit } from '@angular/core';
import { Line } from 'src/app/line';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  @Input() lineA?: Line;
  @Input() lineB?: Line;
  @Input() lineC?: Line;

  constructor() { }

  ngOnInit(): void {
  }
  
}
