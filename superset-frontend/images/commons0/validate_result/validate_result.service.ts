import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FPSocketService } from '@src/app/modules/shared/services/fp_socket.service';
import { ValidateResults } from './valid_result.entity';

@Injectable()
export class ValidateResultService {

    constructor(private fpSocketService: FPSocketService) {}

    checkingResult(replayId: number) {
        return new Observable(observer => {
            this.fpSocketService.getReplayValidationResults(replayId, list => {
                observer.next( new ValidateResults(list) );
            });
        });
    }

}
