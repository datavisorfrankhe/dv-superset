import { Injectable } from '@angular/core';
import { FPSocketService } from '@shared/services/fp_socket.service';
import { UtilService } from '@shared/services/util.service';
import { Observable } from 'rxjs';
import { Features } from '../create/entities/features';
import { Feature } from '../create/entities/feature';

@Injectable()
export class FeatureImportExportService {
    importedFeatures: Features;

    constructor(private fpSocketService: FPSocketService, private utilService: UtilService) {
        this.importedFeatures = new Features();
    }

    postExportFeatures(featureIds: number[], fileName: string) {
        this.fpSocketService.postExportFeatures(featureIds, data => {
            this.utilService.downloadContent(data, 'json', fileName);
        });
    }

    postInputFeatures(body) {
        return new Observable(observer => {
            this.fpSocketService.postImportFeatures(body, data => {
                this.importedFeatures = new Features(data);
                observer.next(this.importedFeatures);
            });
        });
    }

}
