import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { House } from './house.model';
import { User } from '../authentication/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { HouseService } from '../shared/services/house.service';
import { UserService } from '../shared/services/user.service';
import { Card } from './action-card/card.model';

// ----------------------------------------------------------------------------------------------

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isAdmin = false;

  isLoading = true;

  validDevice = true;

  currentDate = Date.now();

  // ----------------------------------------------------------------------------------------------

  house: House;

  loadedUsers$: Observable<User[]>;

  backgroundImage: string;

  // ----------------------------------------------------------------------------------------------

  user: User = {
    id: localStorage.getItem('user-id'),

    email: localStorage.getItem('user-email'),
    password: localStorage.getItem('user-password'),

    role: localStorage.getItem('user-role'),

    houseId: localStorage.getItem('house-id'),
    apartmentId: localStorage.getItem('user-apartment'),

    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
  };

  // ----------------------------------------------------------------------------------------------

  beforeArrival: Card = {
    title: 'Bevor Sie Ankommen',
    subtitle:
      'Teilen Sie uns einfach mit wie Sie ankommen möchten. Wir kümmern uns darum!',
    btnText: 'Nachricht',
    image: '/assets/images/mountain-person.jpg',
    route: 'before-arrival',
  };

  breakfastService: Card = {
    title: 'Frühstücks Service',
    subtitle:
      'Schreiben Sie uns einfach am Vortag eine Liste mit Brötchen, wir bringen Sie am nächsten Morgen vorbei!',
    btnText: 'Bestellen',
    image: '/assets/images/bread2.jpg',
    route: 'bread-order',
  };

  saunaService: Card = {
    title: 'Sauna Reservieren',
    subtitle:
      'Reservieren Sie ganz einfach unsere hauseigene Sauna während Ihres Aufenthaltes!',
    btnText: 'Reservieren',
    image: '/assets/images/sauna3.jpg',
    route: 'sauna-reservation',
  };

  feedbackService: Card = {
    title: 'Bewerten Sie uns',
    subtitle:
      'Teilen Sie doch Ihre Erfahrungen mit anderen und bewerten Sie uns auf Google.',
    btnText: 'Bewerten',
    image: '/assets/images/feedback-img.jpg',
    link: 'https://g.page/r/CcgiqX68TxgkEAg/review',
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private houseSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private houseService: HouseService,
    private platform: Platform,
    private storage: AngularFireStorage,
    private navCtrl: NavController,
    private userService: UserService
  ) {
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());

      this.validDevice = platform.width() <= 1000 ? true : false;
    });
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedUsers$ = this.userService.getActiveUsers();

    this.fetchHouse();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.houseSub) {
      this.houseSub.unsubscribe();
    }
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onOpenMaster() {
    this.router.navigate(['master']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenBeforeArrivalPage() {
    this.router.navigate(['before-arrival']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenBreadOrderPage() {
    this.router.navigate(['bread-order']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenReservationPage() {
    this.router.navigate(['sauna-reservation']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenFeedbackLink() {
    window.location.href = 'https://g.page/r/CcgiqX68TxgkEAg/review';
  }

  // ----------------------------------------------------------------------------------------------

  onLogout() {
    this.modalCtrl
      .create({
        component: LogoutModalComponent,
        cssClass: 'logout-modal-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  onOpenAdminPage(user?: User) {
    if (user) {
      this.navCtrl.navigateForward('admin', { state: user });
    } else {
      this.router.navigate(['admin']);
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private async fetchHouse() {
    this.isLoading = true;

    let img = document.querySelector('img');

    this.houseSub = this.houseService
      .getHouses(this.user.houseId)
      .subscribe(async (houses) => {
        for (const currentHouse of houses) {
          const fetchedHouse: House = {
            ...currentHouse,
          };

          this.house = fetchedHouse;

          this.backgroundImage = await this.storage
            .ref(fetchedHouse.backgroundImage)
            .getDownloadURL()
            .toPromise();

          console.log(this.house.backgroundImage);
        }

        this.isLoading = false;
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
