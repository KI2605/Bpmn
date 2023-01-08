import { Component, ViewChild } from '@angular/core';
import { DiagramEditorComponent } from './diagram-main/diagram-editor/diagram-editor.component';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import * as FileSaver from 'file-saver'
import { HttpClient } from '@angular/common/http';
import { DiagramService } from './services/diagram.service';
import { SaveDiagramRequest } from './models/diagram-save.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-bpmn-js';
  diagramFile = '_assets_bpmn_default.bpmn';
  diagramId = 'BB91CD48-5EF6-417F-BA28-DE276BCD196E';
  importError?: Error;

  @ViewChild(DiagramEditorComponent) diagramComponent: DiagramEditorComponent;


  constructor(
    private http: HttpClient,
    private diagramService: DiagramService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe( params => console.log(params));
  }
}
