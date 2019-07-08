import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonConstantsService {

  constructor() {
  }

  static ProjectStatus = {
    REQUIRES_HELP: 'AF182742-9B0B-49A4-9494-76247DABC49E',
    ACTIVE: '2326E09C-F585-487C-BD03-7E540BBF2B0E',
    COMPLETED: '7D11D0EC-6DAD-42B7-9568-8A2C20B498B6',
    WAITING_ON_HOLD: '6A5A3A17-C85D-43FA-9D10-A30A4AE24F06',
    NOT_STARTED: 'DFEB75C5-442B-49E8-93B1-E4B523075726',
  };
  /*
AF182742-9B0B-49A4-9494-76247DABC49E	Requires help
2326E09C-F585-487C-BD03-7E540BBF2B0E	Active
7D11D0EC-6DAD-42B7-9568-8A2C20B498B6	Completed
6A5A3A17-C85D-43FA-9D10-A30A4AE24F06	Waiting On-Hold
DFEB75C5-442B-49E8-93B1-E4B523075726	Not-Started
*/
}
