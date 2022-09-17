import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { MatAlertDialogComponent } from 'src/app/shared/components/mat-alert-dialog/mat-alert-dialog.component';
import { Organization } from '../../../../shared/interfaces/organization';
import { AppState } from '../../../../state/app.state';
import { selectOrganization } from '../../../../state/selectors/organization.selectors';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  organization$: Observable<Organization>

  constructor(private store: Store<AppState>, private messageService: MessageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.organization$ = this.store.select(selectOrganization);

    this.setIntervalX(() => {
      if (this.messageService.messages.length != 0) {
        console.log(this.messageService.messages);

        let message = this.messageService.messages.shift();
        if (message) {
          this.notifyError(message);
        }
      }

    }, 1000, 5)
  }

  setIntervalX(callback: any, delay: number, repetitions: number) {
    var x = 0;
    var intervalID = window.setInterval(function () {
      callback();
      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  }

  notifyError(message: string) {
    this.dialog
      .open(MatAlertDialogComponent, {
        data: {
          title: 'Ha ocurrido un error',
          message: `${message}. Intente de nuevo mas tarde`,
          confirmText: 'Aceptar'
        }
      })
  }

}
