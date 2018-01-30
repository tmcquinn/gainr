import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gainr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user: object;
  plansRef: AngularFireList<any>;
  plans: Observable<any[]>;
  username: string;

  constructor (
    private auth: AuthService,
    public db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user;
        this.username = user.displayName;
      });
      

    this.plansRef = this.db.list('plans');
    
    this.plans = this.plansRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
