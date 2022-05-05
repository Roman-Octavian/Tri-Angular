import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, OnChanges } from '@angular/core';
import { Vertex } from 'src/app/vertex';
import { Line } from 'src/app/line';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnChanges {
  // /\
  vertexAB: Vertex = {
    x: 350,
    y: 126,
    r: 10
  }
  // /_
  vertexAC: Vertex = {
    x: 250,
    y: 300,
    r: 10
  }
  // _\
  vertexCB: Vertex = {
    x: 450,
    y: 300,
    r: 10
  }

  /* Take initial values for vertices.
  cdkDrag uses transform property and anchors into initial position, while we use actual position
  to move SVG elements around. This means that we need the initial point as reference,
  otherwise lines will accelerate as they move away from their origin */
  initialVertexAB: Vertex = {
    x: this.vertexAB.x,
    y: this.vertexAB.y,
    r: this.vertexAB.r
  }

  initialVertexAC: Vertex = {
    x: this.vertexAC.x,
    y: this.vertexAC.y,
    r: this.vertexAC.r
  }

  initialVertexCB: Vertex = {
    x: this.vertexCB.x,
    y: this.vertexCB.y,
    r: this.vertexCB.r
  }

  // Formula to calculate distance between two given points (x1,y1), (x2,y2)
  calculateLength(x1: number, y1: number, x2: number, y2: number): number {
    return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
  }
  // / A
  lineA: Line = {
    d: this.calculateLength(this.vertexAB.x, this.vertexAB.y, this.vertexAC.x, this.vertexAC.y)
  }

  // \ B
  lineB: Line = {
    d: this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAB.x, this.vertexAB.y)
  }

  // _ C
  lineC: Line = {
    d: this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAC.x, this.vertexAC.y)
  }

  // Determine triangle type and update display
  updateDisplay(): void {
    if (this.lineA.d === 0 && this.lineB.d === 0 && this.lineC.d === 0) {
      document.getElementById("triangleType")!.innerText = "SINGULARITY :P";
    } else if (this.lineA.d === 0 || this.lineB.d === 0 || this.lineC.d === 0) {
      document.getElementById("triangleType")!.innerText = "LINE :P";
    } else if (this.lineA.d === this.lineB.d && this.lineA.d === this.lineC.d) {
      document.getElementById("triangleType")!.innerText = "EQUILATERAL";
    } else if (
      this.lineA.d === this.lineB.d || this.lineB.d === this.lineC.d || this.lineA.d === this.lineC.d) {
        document.getElementById("triangleType")!.innerText = "ISOSCELES";
    } else {
        document.getElementById("triangleType")!.innerText = "SCALENE";
    }
  }

  // Handles AB /\ vertex drag
  onDragAB(event: CdkDragMove) {
    this.vertexAB.x = Math.floor(this.initialVertexAB.x + event.source.getFreeDragPosition().x);
    this.vertexAB.y = Math.floor(this.initialVertexAB.y + event.source.getFreeDragPosition().y);
    this.lineA.d = this.calculateLength(this.vertexAB.x, this.vertexAB.y, this.vertexAC.x, this.vertexAC.y);
    this.lineB.d = this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAB.x, this.vertexAB.y);
    this.updateDisplay();
  }

  // Handles AC /_ vertex drag
  onDragAC(event: CdkDragMove) {
    this.vertexAC.x = Math.floor(this.initialVertexAC.x + event.source.getFreeDragPosition().x);
    this.vertexAC.y = Math.floor(this.initialVertexAC.y + event.source.getFreeDragPosition().y);
    this.lineA.d = this.calculateLength(this.vertexAB.x, this.vertexAB.y, this.vertexAC.x, this.vertexAC.y);
    this.lineC.d = this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAC.x, this.vertexAC.y);
    this.updateDisplay();
  }

  // Handles CB _\ vertex drag
  onDragCB(event: CdkDragMove) {
    this.vertexCB.x = Math.floor(this.initialVertexCB.x + event.source.getFreeDragPosition().x);
    this.vertexCB.y = Math.floor(this.initialVertexCB.y + event.source.getFreeDragPosition().y);
    this.lineB.d = this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAB.x, this.vertexAB.y);
    this.lineC.d = this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAC.x, this.vertexAC.y);
    this.updateDisplay();
  }

  constructor() {}

  ngOnChanges(): void {}

}
