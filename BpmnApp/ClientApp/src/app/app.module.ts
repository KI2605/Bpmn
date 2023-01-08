import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DiagramEditorModule } from './diagram-main/diagram-editor/diagram-editor.module';
import { CommonModule } from '@angular/common';
import { DiagramMainModule } from './diagram-main/diagram-main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DiagramMainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
