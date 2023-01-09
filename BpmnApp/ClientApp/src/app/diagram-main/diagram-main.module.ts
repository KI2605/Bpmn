import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramMainComponent } from './diagram-main.component';
import { DiagramEditorModule } from './diagram-editor/diagram-editor.module';
//import { DiagramViewerModule } from './diagram-viewer/diagram-viewer.module';

@NgModule({
  declarations: [
    DiagramMainComponent
  ],
  imports: [
    CommonModule,
    DiagramEditorModule
  ],
  providers: [],
  exports: [DiagramMainComponent]
})
export class DiagramMainModule { }