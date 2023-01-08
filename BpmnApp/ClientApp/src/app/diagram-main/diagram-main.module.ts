import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramMainComponent } from './diagram-main.component';
import { DiagramEditorModule } from './diagram-editor/diagram-editor.module';

@NgModule({
  declarations: [
    DiagramMainComponent
  ],
  imports: [
    DiagramEditorModule
  ],
  providers: [],
  exports: [DiagramMainComponent]
})
export class DiagramMainModule { }