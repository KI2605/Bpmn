import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddSubprocessRequest } from '../models/add-subprocess.request';
import { ICreateSubprocess } from '../models/create-subprocess.response';
import { SaveDiagramRequest } from '../models/diagram-save.interface';
import { IDiagramSubprocess } from '../models/diagram-subprocess.interface';
import { IDiagram } from '../models/diagram.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root'
})
export class DiagramService extends BaseApiService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    getDiagram (diagramId: string): Observable<IDiagram>{
        return this.http
            .get<IDiagram>(`api/diagram/get/${diagramId}`)
            .pipe(
                this.showError('Failed to get diagram', of(null))
            );
    }

    saveDiagram(request: SaveDiagramRequest){
        return this.http
            .post(`api/diagram/save`, request)
            .pipe(this.showError('Failed to save diagram', of(null)));
    }

    createSubprocess(request: AddSubprocessRequest): Observable<ICreateSubprocess>{
        return this.http
        .post(`api/diagram/add-subprocess`, request)
            .pipe(this.showError('Failed to create subprocess', of(null)));
    }

    getSubprocesses(diagramId: string): Observable<IDiagramSubprocess[]> {
        return this.http
            .get<IDiagramSubprocess[]>(`api/diagram/sub-processes/${diagramId}`)
            .pipe(
                this.showError('Failed to get diagram', of(null))
            );
    }


}