import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import { from, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import customControlsModule from 'src/app/custom-bpmnjs/palette';
import customPropertiesProviderModule from 'src/app/custom-bpmnjs/properties/provider/custom';
import customModdleDescriptor from 'src/app/custom-bpmnjs/properties/descriptors/custom.json';
import taskTemplate from 'src/app/custom-bpmnjs/element-templates/task-template.json';
import ColorPickerModule from 'src/app/custom-bpmnjs/colors';
import { DiagramElement } from '../../models/diagram-element';
import { DiagramService } from '../../services/diagram.service';
import { IDiagram } from '../../models/diagram.interface';
import { AddSubprocessRequest } from '../../models/add-subprocess.request';
import { DOCUMENT } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { ActivatedRoute, Router } from '@angular/router';
import { IDiagramSubprocess } from '../../models/diagram-subprocess.interface';
import { SaveDiagramRequest } from 'src/app/models/diagram-save.interface';
//import testTemplate from 'src/app/custom-bpmnjs/element-templates/test.json';
//import sampleTemplate from 'camunda-modeler/resources/element-templates/samples.json';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.scss']
})
export class DiagramEditorComponent implements OnInit {
  private bpmnJS: BpmnJS;
  private myTasks: any[];

  private diagramSubprocesses: IDiagramSubprocess[];

  public previousElementForAddSubPr: DiagramElement = new DiagramElement();
  public currentElementForAddSubPr: DiagramElement = new DiagramElement();
  public currentElementDiagramId;
  isAddButtonShown: boolean;
  public isViewSubprocessButtonShown: boolean;
  public diagramId;
  public subprocessLink;
  public subProcessDiagramId;


  private overlays;

  @ViewChild('ref', { static: true }) private el!: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();
  @Input() public fileDiagramId: string;
  ngrxStore: any;

  constructor(
    private http: HttpClient,
    private diagramService: DiagramService,
    private route: ActivatedRoute,
  ) {
  }

  onClick(event) {
    console.log(event);
  }

  addSubProcess() {
    let request: AddSubprocessRequest = {
      parentDiagramId: this.diagramId,
      taskId: this.previousElementForAddSubPr.id
    }

    this.saveDiagram();
    this.diagramService.createSubprocess(request).subscribe(result => {
      this.getSubproccess(this.diagramId);
      this.subprocessLink = this.subprocessLink + `/${result.diagramId}`;
      window.open(this.subprocessLink, '_blank');
    });
  }

  viewEditSubProcess() {
    this.subprocessLink = this.subprocessLink + `/${this.currentElementDiagramId}`;
    window.open(this.subprocessLink, '_blank');
  }

  async ngOnInit(): Promise<void> {
    /*     this.getServiceTasks().subscribe(data => {
          sessionStorage.setItem("serviceTasks", data);
        });
     */
    this.subProcessDiagramId = this.route.component;
    this.subProcessDiagramId = !!this.route.firstChild ? this.route.firstChild.snapshot.params.subprocessDiagramId 
        : this.route.snapshot.params.subprocessDiagramId;
    console.log(this.subProcessDiagramId);
    
    this.myTasks = [
      {
        "name": "Task Template",
        "id": "taskTemplate",
        "appliesTo": ["bpmn:ServiceTask"],
        "properties": [
          {
            "label": "Tasks",
            "type": "String",
            "editable": true,
            "binding": {
              "type": "property",
              "name": "camunda:class"
            }
          }
        ]
      }
    ];

    this.initBpmn();
  }

  initBpmn(): void {
    this.bpmnJS = new BpmnJS({
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customControlsModule,
        customPropertiesProviderModule,
        ColorPickerModule
      ],
      elementTemplates: taskTemplate,
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
        custom: customModdleDescriptor
      },
      keyboard: {
        bindTo: document
      }
    });

    this.bpmnJS.on('import.done', ({ error }: { error: any }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });

    this.bpmnJS.on('elementTemplates.errors', function (event) {
      console.log('template load errors', event.errors);
    });
    this.bpmnJS.get('elementTemplatesLoader').reload();

    let aid;
    let atype;
    var eventBus = this.bpmnJS.get('eventBus');

      // you may hook into any of the following events
      var events = [
        // 'element.hover',
        // 'element.out',
        'element.click',
        'element.dblclick',
        // 'element.mousedown',
        // 'element.mouseup'
      ];

      events.forEach((event) => {

        eventBus.on(event, async (e) => {
          // e.element = the model element
          // e.gfx = the graphical element

          // console.log(event, 'on', e.element.id);
          // console.log(e.element.type);
          //let diagramData: any = await this.getBpmnContent();

          if (event === 'element.click' && !!e.element.id) {
            //if (diagramData.xml.includes(e.element.id)) {
              aid = e.element.id;
              atype = e.element.type;
              this.isAddButtonShown = this.isAddSubProcessButtonShown(this.maptoModel(aid, atype));
            //}
          }
          
        });
      });

    this.bpmnJS.attachTo(this.el.nativeElement);


    this.loadDiagram(this.fileDiagramId);
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    if (changes.file) {
      this.loadDiagram(changes.file.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  // loadDiagram(file: string): Subscription {
  //   this.overlays = this.bpmnJS.get('overlays');
  //   return (
  //     this.http.get('/assets/bpmn/_assets_bpmn_default.bpmn', { responseType: 'text' })
  //     //this.diagramService.getDiagram('BB91CD48-5EF6-417F-BA28-DE276BCD196E')
  //       .pipe(
  //         switchMap((xml: string) => this.importDiagram(xml)),
  //         map(result => result.warnings),
  //       )
  //       .subscribe(
  //         (warnings: any) => {
  //           this.importDone.emit({
  //             type: 'success',
  //             warnings
  //           });
  //           this.overlays.add('Activity_1iag6z7', 'note', {
  //             position: {
  //               bottom: 0,
  //               right: 0
  //             },
  //             html: '<div class="diagram-note">https://forum.bpmn.io/t/how-can-i-save-diagram-and-svg-in-angular/4498</div>'
  //             });
  //         },
  //         (err: any) => {
  //           this.importDone.emit({
  //             type: 'error',
  //             error: err
  //           });
  //         }
  //       )
  //   );
  // }

  // loadDiagram(file: string): Subscription {
  //   this.overlays = this.bpmnJS.get('overlays');
  //   return (
  //     //this.http.get('/assets/bpmn/_assets_bpmn_default.bpmn', { responseType: 'text' })
  //     this.diagramService.getDiagram('BB91CD48-5EF6-417F-BA28-DE276BCD196E')
  //       .subscribe(
  //         (diagram: IDiagram) => {
  //           let xml = diagram.diagramXml;
  //           let res = this.importDiagram(xml);
  //           let warnings;
  //           res.pipe(map(result => warnings = result.warnings));
  //           this.importDone.emit({
  //             type: 'success',
  //             warnings
  //           });
  //           this.overlays.add('Activity_1iag6z7', 'note', {
  //             position: {
  //               bottom: 0,
  //               right: 0
  //             },
  //             html: '<div class="diagram-note">https://forum.bpmn.io/t/how-can-i-save-diagram-and-svg-in-angular/4498</div>'
  //             });
  //         },
  //         (err: any) => {
  //           this.importDone.emit({
  //             type: 'error',
  //             error: err
  //           });
  //         }
  //       )
  //   );
  // }

  loadDiagram(file: string): Subscription {
    this.overlays = this.bpmnJS.get('overlays');
    if (!this.subProcessDiagramId) {
      this.diagramId = this.fileDiagramId;
    }
    else {
      this.diagramId = this.subProcessDiagramId;
    }
    
    return (
      //this.http.get('/assets/bpmn/_assets_bpmn_default.bpmn', { responseType: 'text' })
      this.diagramService.getDiagram(this.diagramId)
        .pipe(
          switchMap((diagram: IDiagram) => this.importDiagram(diagram)),
          map(result => result.warnings),
        )
        .subscribe(
          (warnings: any) => {
            this.importDone.emit({
              type: 'success',
              warnings
            });
            this.getSubproccess(this.diagramId);
            // this.overlays.add('Activity_1iag6z7', 'note', {
            //   position: {
            //     bottom: 0,
            //     right: 0
            //   },
            //   html: '<div class="diagram-note">https://forum.bpmn.io/t/how-can-i-save-diagram-and-svg-in-angular/4498</div>'
            //   });
          },
          (err: any) => {
            this.importDone.emit({
              type: 'error',
              error: err
            });
          }
        )
    );
  }

  getSubproccess(diagramId: string){
    this.diagramService.getSubprocesses(diagramId).subscribe(result => {
      this.diagramSubprocesses = result;
    });
  }


  private importDiagram(diagram: IDiagram): Observable<{ warnings: Array<any> }> {
    this.diagramId = diagram.diagramId;
    return from(this.bpmnJS.importXML(diagram.diagramXml) as Promise<{ warnings: Array<any> }>);
  }

  public async saveDiagram() {
    let bpmnContent: any = await this.getBpmnContent();
    let request: SaveDiagramRequest = {
      diagramId: this.diagramId,
      diagramXml: `${bpmnContent.xml}`
    }

    this.diagramService.saveDiagram(request).subscribe(() => console.log("done"));
  }

  getBpmnContent(): Promise<void> {
    var a = this.bpmnJS.get("elementRegistry")
    return this.bpmnJS.saveXML({ format: true });
  }

  getServiceTasks(): Observable<any> {
    return this.http.get('assets/bpmn/serviceTasks.json');
  }

  isAddSubProcessButtonShown(element: DiagramElement):boolean {
    this.subprocessLink = `/${this.diagramId}/subprocess-editor/${element.id}`
    if (this.diagramSubprocesses.find(ds => ds.diagramTaskId == element.id)) {
      this.isViewSubprocessButtonShown = true;
      this.currentElementDiagramId = this.diagramSubprocesses.find(ds => ds.diagramTaskId == element.id).subprocessDiagramId;
      return false;
    }
    if (element.type === 'bpmn:Process') {
      this.isViewSubprocessButtonShown = false;
      this.previousElementForAddSubPr = null;
      return false;
    }
      this.previousElementForAddSubPr = element;
      this.isViewSubprocessButtonShown = false;
      return true;
  }

  maptoModel(id: string, type: string): DiagramElement {
    this.currentElementForAddSubPr.id = id;
    this.currentElementForAddSubPr.type = type;
    return this.currentElementForAddSubPr;

  }
}
