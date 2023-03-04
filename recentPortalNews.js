    import {
        LightningElement,
        track,
        wire
    } from 'lwc';
    import {
        NavigationMixin
    } from 'lightning/navigation';

    import getOpenOpps from '@salesforce/apex/recentPortalNewsController.getRecentNews';

    const newsColumns = [{
            label: 'Name',
            fieldName: 'Name'
        },
        {
            label: 'Account ID',
            fieldName: 'News_Title__c'
        },
        {
            label: 'Account ID',
            fieldName: 'News_Title__c'
        },
        {
            label: 'Created By',
            fieldName: 'CreatedById'
        },
        {
            label: 'Created Date',
            fieldName: 'CreatedDate'
        },
    ];

    export default class RecentPortalNews extends NavigationMixin(LightningElement) {
        @track tableData = [];

        @wire(getOpenOpps)
        wiredOpps(result) {
            if (result.data) {
                this.tableData = result.data;
            } else if (result.error) {
                this.tableData = undefined;
                console.log(result.error);
            }
        }
        navigateToWebPage(event) {
            //Trim the ID to 18 characters as the value being returned was 21 (had an '-51' appended to the end of it)
            var newRecId = event.currentTarget.id.substring(0, 18);
            this[NavigationMixin.Navigate]({
                type: 'standard__app',
                attributes: {
                    appTarget: '06m8d000000lyRAAAY',
                    pageRef: {
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: newRecId,
                            objectApiName: 'Portal_News__c',
                            actionName: 'view'
                        }
                    }
                }
            });
        }
    }