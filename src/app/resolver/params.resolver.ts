import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {QueFaire$Request} from "../models/queFaire.interfaces";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamsResolver implements Resolve<QueFaire$Request> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QueFaire$Request> {
    const paramList = <string>route.paramMap.get('params');
    var request : QueFaire$Request = JSON.parse(paramList);
    return request as any;
  }
}
