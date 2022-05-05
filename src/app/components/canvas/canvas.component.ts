import { CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterContentInit, Component, ElementRef} from '@angular/core';
import { Vertex } from 'src/app/vertex';
import { Line } from 'src/app/line';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit {
  // Will be set to canvas dimensions with AfterContentInit hook
  initialHeight: number = 0;
  initialWidth: number = 0;
  
  /* Initial values are mostly irrelevant for all vertices. 
  This is because we need to position the triangle responsively, which means that we will 
  set all of these values accordingly in the hook after the canvas has been initialized. */
  // /\
  vertexAB: Vertex = {
    x: 0,
    y: 0,
    r: 10
  }
  // /_
  vertexAC: Vertex = {
    x: 0,
    y: 0,
    r: 10
  }
  // _\
  vertexCB: Vertex = {
    x: 0,
    y: 0,
    r: 10
  }

  /* Take initial values for vertices.
  cdkDrag uses transform property and anchors into initial position, while we use actual position
  to move SVG elements around. This means that we need the initial point as reference,
  otherwise lines will accelerate as they move away from their origin */
  initialVertexAB: Vertex = {
    x: 0,
    y: 0,
    r: 0
  }

  initialVertexAC: Vertex = {
    x: 0,
    y: 0,
    r: 0
  }

  initialVertexCB: Vertex = {
    x: 0,
    y: 0,
    r: 0
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
      document.getElementById("triangleType")!.style.color = 'black';
    } else if (this.lineA.d === 0 || this.lineB.d === 0 || this.lineC.d === 0) {
      document.getElementById("triangleType")!.innerText = "LINE :P";
      document.getElementById("triangleType")!.style.color = 'orange';
    } else if (this.lineA.d === this.lineB.d && this.lineA.d === this.lineC.d) {
      document.getElementById("triangleType")!.innerText = "EQUILATERAL";
      document.getElementById("triangleType")!.style.color = 'blue';
    } else if (
      this.lineA.d === this.lineB.d || this.lineB.d === this.lineC.d || this.lineA.d === this.lineC.d) {
        document.getElementById("triangleType")!.innerText = "ISOSCELES";
        document.getElementById("triangleType")!.style.color = 'green';
    } else {
        document.getElementById("triangleType")!.innerText = "SCALENE";
        document.getElementById("triangleType")!.style.color = 'red';
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

  // Used in the afterContentInit hook to get the dimensions of the canvas
  public resizeHandler(): void {
    this.initialHeight = document.getElementById("canvas")?.offsetHeight!;
    this.initialWidth = document.getElementById("canvas")?.offsetWidth!;
    console.log(this.initialHeight + "||" + this.initialWidth);
  }

  // The whole hook just deals with positioning the triangle responsively.
  // None of this would be necessary if we'd keep the canvas 500 x 700 all the time
  ngAfterContentInit(): void {
    // Get dimensions
    this.resizeHandler();

    // Update all vertices with retrieved dimensions taking viewport into account
    if (this.initialHeight < 500) {
      this.vertexAB.x = this.initialWidth / 2;
      this.vertexAB.y = 60;

      this.vertexAC.x = 30;
      this.vertexAC.y = this.initialHeight / 2 + 60;

      this.vertexCB.x = this.initialWidth - 30;
      this.vertexCB.y = this.initialHeight / 2 + 60;
    } else {
      this.vertexAB.x = this.initialWidth / 2;
      this.vertexAB.y = 30;
  
      this.vertexAC.x = this.initialWidth - 600;
      this.vertexAC.y = this.initialHeight / 2 + 214;
  
      this.vertexCB.x = this.initialWidth - 100;
      this.vertexCB.y = this.initialHeight / 2 + 214;
    }

    // Store initial vertices to deal with cdkDrag unwanted acceleration
    this.initialVertexAB = {
      x: this.vertexAB.x,
      y: this.vertexAB.y,
      r: this.vertexAB.r
    }

    this.initialVertexAC = {
      x: this.vertexAC.x,
      y: this.vertexAC.y,
      r: this.vertexAC.r
    }

    this.initialVertexCB = {
      x: this.vertexCB.x,
      y: this.vertexCB.y,
      r: this.vertexCB.r
    }

    // Calculate the length of each line
    this.lineA.d = this.calculateLength(this.vertexAB.x, this.vertexAB.y, this.vertexAC.x, this.vertexAC.y);
    this.lineB.d = this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAB.x, this.vertexAB.y);
    this.lineC.d = this.calculateLength(this.vertexCB.x, this.vertexCB.y, this.vertexAC.x, this.vertexAC.y);

    // Compute the lengths and determine what type of triangle appears initially
    this.updateDisplay();
  }

}
