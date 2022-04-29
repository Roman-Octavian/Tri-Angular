import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { DisplayComponent } from './components/display/display.component';
import { FieldsComponent } from './components/fields/fields.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CanvasComponent,
    DisplayComponent,
    FieldsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
