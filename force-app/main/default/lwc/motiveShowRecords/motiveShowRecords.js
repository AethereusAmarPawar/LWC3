/*
* Description: This is child 2 Component. It will display all records in Table and update in Real time.
*/

import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getRecords from '@salesforce/apex/MotiveTask27_2_23.getRecords';

export default class MotiveShowRecords extends LightningElement {
    @api objName = '';
    @track record = [];
    @track error = [];

    _wiredResult;


    columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name' }
    ];

    @wire(getRecords, { objName: '$objName' })
    wiredRecords(result) {
        this._wiredResult = result;
        if (result.data) {
            this.error = undefined;
            this.record = result.data;

        } else if (result.error) {
            this.error = error;
            this.record = undefined;
        }
    }

    @api refreshData() {
        return refreshApex(this._wiredResult);
    }

}