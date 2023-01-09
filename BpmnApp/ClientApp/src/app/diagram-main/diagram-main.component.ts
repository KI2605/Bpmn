import { Component, ViewChild } from '@angular/core';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import * as FileSaver from 'file-saver'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';
import { DiagramService } from '../services/diagram.service';
import { SaveDiagramRequest } from '../models/diagram-save.interface';
//import { DiagramViewerComponent } from './diagram-viewer/diagram-viewer.component';

@Component({
    selector: '[diagram-main]',
    templateUrl: './diagram-main.component.html',
    styleUrls: ['./diagram-main.component.scss']
  })
  export class DiagramMainComponent {
    title = 'ng-bpmn-js';
    diagramFile = '_assets_bpmn_default.bpmn';
    diagramId = 'BB91CD48-5EF6-417F-BA28-DE276BCD196E';
    importError?: Error;
  
    @ViewChild(DiagramEditorComponent) diagramComponent: DiagramEditorComponent;
    //@ViewChild(DiagramViewerComponent) viewerComponent: DiagramViewerComponent;
  
  
    constructor(
      private http: HttpClient,
      private diagramService: DiagramService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.route.params.subscribe( params => console.log(params));
    }
    
    loadWorkflow(workflowFile: string): void {
      this.diagramFile = workflowFile;
    }
  
    clearEditor(): void {
      this.diagramFile = '_assets_bpmn_default.bpmn';
    }
  
    handleImported(event: any) {
      const {
        type,
        error,
        warnings
      } = event;
  
      if (type === 'success') {
        console.log(`Rendered diagram (%s warnings)`, warnings.length);
      }
  
      if (type === 'error') {
        console.error('Failed to render diagram', error);
      }
  
      this.importError = error;
    }
  
    async saveWorkFlow(navigateTo?: any): Promise<void> {
      try {
        let bpmnContent: any = await this.diagramComponent.getBpmnContent();
        //bpmnContent.saveXML();
        const blob = new Blob([bpmnContent.xml], {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(blob, '/assets/bpmn/default.bpmn');
        console.log(bpmnContent.xml);
  
        if (!!this.route.snapshot.params.subprocessDiagramId) {
          this.diagramId = this.route.snapshot.params.subprocessDiagramId;
        }
        let request: SaveDiagramRequest = {
          diagramId: this.diagramId,
          diagramXml: `${bpmnContent.xml}`
        }
  
        this.diagramService.saveDiagram(request).subscribe(() => console.log("done"));
  
      } catch (err) {
        // console.log(err)
      }
    }

    isViewMode(): boolean {
        return this.router.url.includes('/diagram-viewer' || '/subprocess-viewer/')
    }

  }