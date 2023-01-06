import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'diagram-editor' 
  },
  { 
    path: 'diagram-editor',
    component: DiagramEditorComponent
  },
  {
    path: ':diagramId/subprocess-editor/:taskId/:subprocessDiagramId',
    component: DiagramEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
