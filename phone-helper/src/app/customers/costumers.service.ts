import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Campaign, Status } from '../campaign/campaign'
import { UsersService } from '../users/users.service';
import { WorkSpace } from '../users/user';
import { Customer } from './customer'
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CostumersService {

  private customerCollection: AngularFirestoreCollection<Customer>;


  constructor(private firestore: AngularFirestore,usersService:UsersService) { }

  // this method takes an campaign object and 
  // add a new campaign to Firestore database collection
  async addCustomer(campaignID: string, workspaceID:string, customer:Customer) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const customerObject = {...customer};
    const ref = await this.firestore.collection('workSpace/'+ workspaceID + '/Campaigns/' + campaignID + '/Customers').add(customerObject).then(ref => {
      return  ref.id
    });
    return ref
  }

  // this method returns list of campaigns document,
  // fetched from Firestore database collection
  getCustomers(campaignID: string, workspaceID:string) {
    this.customerCollection = this.firestore.collection<Customer>('workSpace/' + workspaceID + '/Campaigns/' + campaignID + '/Customers');
    return this.customerCollection.snapshotChanges()
  }

  getRandomCustomer(campaignID: string, workspaceID:string):any{

      const random = this.firestore.createId();

      const  customerCollection  = this.firestore
        .collection<Customer>('workSpace/' + workspaceID + '/Campaigns/' + campaignID + '/Customers', ref => ref
          .where('__name__', '>=', random)
          .where('status', '==', 'פתוח')
          .limit(1)).snapshotChanges()

      const revCustomerCollection = this.firestore
      .collection<Customer>('workSpace/' + workspaceID + '/Campaigns/' + campaignID + '/Customers', ref => ref
        .where('__name__', '<=', random)
        .where('status', '==', 'פתוח')
        .limit(1)).snapshotChanges()
    const comb =combineLatest(customerCollection,revCustomerCollection).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur) ) ),
    )
       return  comb
  }

  getCustomer(campaignID: string,workSpaceID:string,customerID:string): any  {
    return this.firestore.collection<Campaign>('workSpace/' + workSpaceID + '/Campaigns/' + campaignID + '/Customers').doc(customerID).snapshotChanges();
  }
        

   // this method takes an campaign object and
  // update an object of campaign to the Firestore document
  updateCustomer(campaignID: string,workSpaceID:string,customer:Customer) {
    // convert object of type Campaign to JSON object
    // because Firestore understand JSON
    const customerObject = {...customer};
    this.firestore.doc('workSpace/' + workSpaceID + '/Campaigns/' + campaignID + '/Customers/'+customer.id).update(customerObject);
  }

  changeCustomerStatus(campaignID: string,workSpaceID:string,customerID:string,status:Status) {
    // convert object of type Campaign to JSON object
    // because Firestore understand JSON
    this.firestore.doc('workSpace/' + workSpaceID + '/Campaigns/' + campaignID + '/Customers/'+customerID+'/status').update(status);
  }

  // this method takes an campaign Id and
  // delete an employee document from the Firestore collection
  deleteCustomer(campaignID: string,workSpaceID:string,customerID:string) {
    this.firestore.doc('workSpace/' + workSpaceID + '/Campaigns/' + campaignID + '/Customers/'+customerID).delete();
  }



  }
