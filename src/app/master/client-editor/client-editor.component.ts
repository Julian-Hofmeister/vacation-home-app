import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { House } from 'src/app/home/house.model';
import { Client } from '../category/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HouseService } from 'src/app/shared/services/house.service';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
})
export class ClientEditorComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  // @Input() client: Client;

  // @ContentChild(IonInput) input: IonInput;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  client: Client;

  clientForm = new FormGroup({
    id: new FormControl(),

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  // ----------------------------------------------------------------------------------------------

  showPassword = false;

  loadedHouses$: Observable<House[]>;

  selectedHouses: string[] = [];

  showHouses = false;

  // ----------------------------------------------------------------------------------------------

  message: string;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private clientSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private houseService: HouseService,
    private clientsService: ClientsService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedHouses$ = this.houseService.getHouses();

    this.clientSub = this.clientsService.currentClient.subscribe((client) => {
      this.client = client;

      this.clientForm.setValue({
        id: client.id ?? '',
        firstName: client.firstName ?? '',
        lastName: client.lastName ?? '',
        email: client.email ?? '',
        phoneNumber: client.phoneNumber ?? '',
        password: client.password ?? '',
      });
    });
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  // ----------------------------------------------------------------------------------------------

  onSelectHouse() {
    console.log(this.selectedHouses);
  }

  // ----------------------------------------------------------------------------------------------

  onDisplayHouseSelection() {
    this.showHouses = !this.showHouses;
    console.log(this.showHouses);
  }

  // ----------------------------------------------------------------------------------------------

  onDetachHouse(house: House) {
    house.clientId = 'unset';

    console.log('House was detached');
  }

  // ----------------------------------------------------------------------------------------------

  onCreateHouse() {
    console.log('Create new House');
  }

  // ----------------------------------------------------------------------------------------------

  onSubmit() {
    console.log(this.clientForm.value);
    console.log('here');
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
