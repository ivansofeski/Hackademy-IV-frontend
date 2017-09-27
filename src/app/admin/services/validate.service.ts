import { Injectable } from '@angular/core';

@Injectable()

export class OrgValidateService {
    typeValidate: Object = {
        organization: (org: Object) => {
            if (org === undefined || typeof org !== 'object') {
                return false;
            }

            let _validation = false;

            if (Object.keys(org).length > 0) {
                // tslint:disable-next-line:prefer-const
                for (let key in org) {
                    if (org.hasOwnProperty(key)) {
                        switch (key) {
                            case 'id':
                                _validation = typeof org[key] !== 'number' ? false : true;
                                break;
                            case 'orgId':
                            case 'name':
                            case 'address':
                            case 'password':
                            case 'billing':
                            case 'description':
                                _validation = typeof org[key] !== 'string' ? false : true;
                                break;
                            case 'contact':
                                // tslint:disable-next-line:prefer-const
                                for (let subKey in org[key]) {
                                    if (org[key].hasOwnProperty(subKey)) {
                                        _validation = typeof org[key][subKey] !== 'string' ? false : true;
                                    }
                                }
                                break;
                        }
                    }
                }
            }

        }
        /* email: (email: string) => {
            const symp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return symp.test(email);
        } */
    };

    // Now when you want to validate you call typeValidate.organization(someOrg <- should be object!)

    constructor() { }
}
