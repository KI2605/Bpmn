import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiagramEditorComponent } from './diagram-editor.component';

@NgModule({
  declarations: [
    DiagramEditorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [DiagramEditorComponent]
})
export class DiagramEditorModule { }
