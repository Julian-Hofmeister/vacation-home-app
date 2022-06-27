import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  loadedUsers: User[];
  isLoading = false;

  email: string;
  password: number;

  showHelpText = false;

  emailNotFound = false;

  passwordIncorrect = false;

  falsePasswordFormat = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private authService: AuthService, private router: Router) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchUsers();

    this.emailNotFound = false;

    this.passwordIncorrect = false;

    this.falsePasswordFormat = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onChange() {
    this.emailNotFound = false;

    this.passwordIncorrect = false;

    this.falsePasswordFormat = false;
  }

  // ----------------------------------------------------------------------------------------------

  onHelp() {
    this.showHelpText = this.showHelpText
      ? (this.showHelpText = false)
      : (this.showHelpText = true);
  }

  // ----------------------------------------------------------------------------------------------

  onLoginUser() {
    this.emailNotFound = true;
    this.passwordIncorrect = false;
    this.falsePasswordFormat = false;

    for (const user of this.loadedUsers) {
      if (user.id === this.password.toString() && user.email === this.email) {
        console.log('LOGIN SUCCESS');

        this.router.navigate(['home']);

        localStorage.setItem('user-email', user.email);
        localStorage.setItem('user-id', user.id);
        localStorage.setItem('user-arriveDate', user.arriveDate.toString());
        localStorage.setItem('user-leaveDate', user.leaveDate.toString());
        localStorage.setItem('user-apartment', user.apartment);
      } else if (user.email === this.email) {
        this.emailNotFound = false;

        if (this.password.toString().length === 6) {
          this.passwordIncorrect = true;
        } else {
          this.falsePasswordFormat = true;
        }
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  focusInput(input: string) {
    document.getElementById(input).style.border =
      'solid 1px var(--ion-color-primary)';
  }

  unFocusInput(input: string) {
    document.getElementById(input).style.border =
      'solid 1px rgba(218,218,218,0)';
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchUsers() {
    this.isLoading = true;
    this.userSub = this.authService.getUsers().subscribe((users) => {
      this.loadedUsers = [];

      // * DEFINE NEW ITEM
      for (const currentUser of users) {
        // const imagePath = this.afStorage
        //   .ref(currentLoadedItem.imagePath)
        //   .getDownloadURL();

        const fetchUser: User = {
          id: currentUser.id,
          email: currentUser.email,
          arriveDate: currentUser.arriveDate,
          leaveDate: currentUser.leaveDate,
          apartment: currentUser.room,
        };

        this.loadedUsers.push(fetchUser);
        this.isLoading = false;
        console.log(this.loadedUsers);
      }
    });
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
