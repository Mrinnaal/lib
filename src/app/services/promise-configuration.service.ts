// import { Injectable } from '@angular/core';

// @Injectable()
// export class PromiseConfigurationService {

//   constructor() { }

export function setPromise(http): void {
    http.get('../../assets/userRestriction.json')
        .subscribe(
        response => { sessionStorage.setItem('promise', JSON.stringify(response)); },
        errorMsg => { console.log('session storage failed - setPromise'); }
        );
}

export function getPromise(): Promise<any> {
    try {
        const data = sessionStorage.getItem('promise');
        return Promise.resolve(JSON.parse(data));
    } catch (errorMsg) {
        return Promise.reject('session storage failed - getPromise');
    }
}

export function updatePromise(data): Promise<any> {
    try {
        sessionStorage.setItem('promise', JSON.stringify(data));
        return Promise.resolve('data updated successfully');
    } catch (errorMsg) {
        return Promise.reject('session storage failed - updatePromise');
    }
}

// }
