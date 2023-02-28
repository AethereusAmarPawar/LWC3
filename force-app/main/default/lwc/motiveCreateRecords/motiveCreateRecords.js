/*
* Description: This is Child 1 Component. It will create New Records.
*/

import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CreateRecord from '@salesforce/apex/MotiveTask27_2_23.CreateRecord';

export default class MotiveCreateRecords extends LightningElement {

    @track nameValue = '';
    @api objName = '';

    handleInput(event) {
        this.nameValue = event.detail.value;
    }

    handleClick() {
        CreateRecord({ Name: this.nameValue, objName: this.objName })
            .then(results => {
                console.log('res>' + results);

                if (results == 'Record Created Successfully') {
                    const event = new ShowToastEvent({
                        variant: 'success',
                        message: results,
                    });
                    this.dispatchEvent(event);

                    const custEvent = new CustomEvent('senddetailstoparent', { detail: true });
                    this.dispatchEvent(custEvent);
                    console.log('custEvent' + custEvent);
                }

            })

    }
}