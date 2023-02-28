/*
* Description: This is Parent Component. It will fetch all standard and custom objects in salesforce
*/

import { LightningElement, wire, api, track } from 'lwc';
import getObjects from '@salesforce/apex/MotiveTask27_2_23.getObjects';

export default class MotiveGetObjects extends LightningElement {

    @track record = [];
    @track value = '';
    childVisible = false;

    @wire(getObjects)
    wiredObjects({ error, data }) {
        if (data) {

            this.error = undefined;
            let recs = [];
            for (let i = 0; i < data.length; i++) {
                recs.push({ label: data[i], value: data[i] });
            }
            this.record = recs;

        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }
    handleChange(event) {
        this.childVisible = true;
        this.value = event.detail.value;
    }

    get(event) {
        this.template.querySelector('c-motive-show-records').refreshData();

    }

}