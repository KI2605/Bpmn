import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DiagramEditorComponent } from './diagram-main/diagram-editor/diagram-editor.component';
import { DiagramMainComponent } from './diagram-main/diagram-main.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'diagram-editor' 
  },
  { 
    path: 'diagram-editor',
    component: DiagramMainComponent
  },
  {
    path: ':diagramId/subprocess-editor/:taskId/:subprocessDiagramId',
    component: DiagramMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
