import { Injectable } from '@angular/core';

@Injectable()

export class OrgValidateService{
    constructor(){}
    validateRegister(org){
        if (typeof org.id !="number" ||typeof org.orgId!="string" || typeof org.name!="string" ||typeof org.address!="string" ||typeof org.contact.phone!="string" ||typeof org.contact.email!="string" ||typeof org.contact.person!="string" ||typeof org.password!="string" ||typeof org.billing!="string" ||typeof org.description!="string" ){
            return false;
        }else{
            return true;
        }

    }
    validateEmail(email){
        const symp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return symp.test(email);
      }
}