import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FPSocketService } from '@src/app/modules/shared/services/fp_socket.service';
import { DataSets } from '@src/app/modules/feature-platform/modules/feature-data-v2/commons/data_set.entity';
import { IntSocketService } from '@src/app/modules/shared/services/int_socket.service';

@Injectable()
export class TestFileSelectorService {
    constructor(private fpSocketService: FPSocketService, private intSocketService: IntSocketService) { }
    fetchDataSets(clientName: string= '') {
        return new Observable(observer => {
            if (!!clientName) {
                this.intSocketService.getAllDatasetsByClient(clientName, data => {
                    observer.next(new DataSets(data).useableDateSets);
                });
            } else {
                this.fpSocketService.getAllDatasets(data => {
                    observer.next(new DataSets(data).useableDateSets);
                });
            }
        });
    }

    getRTTestFileList(startTS: number, endTS: number) {
        let fileMax = 0;
        const filePerHour = 1;
        //here, since we are selecting date only, we need to convert to 00:00:00 to 23:59:59
        endTS = convertToDate(endTS, false);
        startTS = convertToDate(startTS, true);

        fileMax = (endTS - startTS) / 3600 / 1000 * filePerHour;
        return new Observable(observer => {
            this.fpSocketService.postGetKafkaEventFolderFileList({
                startDate: startTS,
                endDate: endTS,
                maxFileNum: fileMax
            }, data => {
                if (Array.isArray(data)) {
                    observer.next(data);
                } else {
                    console.log(data);
                    observer.next([]);
                }
            });
        });
    }
}

const convertToDate = function(ts: number, bStart = true) {
    const date = new Date(ts);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    if (bStart) {
        return Date.UTC(year, month, day, 0, 0, 0);
    } else {
        return Date.UTC(year, month, day, 23, 59, 59);
    }

};
