import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../authentication/user.model';
import { Client } from './category/client.model';
import { UserEditorComponent } from './user-editor/user-editor.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  selection: string;

  selectedClient: Client;

  selectedUser: User;

  changingValue: Subject<boolean> = new Subject();

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor() {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onSelectCategory(selection: string) {
    this.selection = selection;

    this.selectedClient = null;
    this.selectedUser = null;
  }

  // ----------------------------------------------------------------------------------------------

  onSelectClient(client: Client) {
    this.selectedClient = client;
    console.log(client);
  }

  // ----------------------------------------------------------------------------------------------

  onSelectUser(user: User) {
    this.selectedUser = user;

    this.changingValue.next(true);

    console.log(this.selectedUser);
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
