import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MailBoxInterface } from '../models/mailBox.interface';

@Injectable({
  providedIn: 'root',
})
export class MailBoxService {
  constructor(private angularFirestore: AngularFirestore) {}

  getCollection() {
    return this.angularFirestore.collection('MailBox').snapshotChanges();
  }

}
