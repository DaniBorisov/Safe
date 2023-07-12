import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructionWorkService {
  // private apiUrl = 'https://example.com/api/construction-work'; // Replace with API endpoint


  private constructionWork: ConstructionWork[] = [{id:0,
    street:'Test',
    city:'Horsens',
    startDate:'22.02.23',
    endDate:'08.08.23',
    status:'TILT'}]

  private signs: Signs[] = [{signId:0,
    workId: 0,
    issueDate: '10.05.23',
    issueTime: '23:32',
    issue: 'Tilt'}]

  // constructor(private http: HttpClient) { }
  constructor() { }

  private hasErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasError$ = this.hasErrorSubject.asObservable();

  setHasError(hasError: boolean) {
    this.hasErrorSubject.next(hasError);
  }

  // Add Construction Work
  // addConstructionWork(workData: any): Observable<any> {
  addConstructionWork(workData: ConstructionWork, signsData : Signs[]): Observable<ConstructionWork[]> {
    this.constructionWork.push(workData);
    signsData.forEach((sign) => {
      this.signs.push(sign);
    });
    return of(this.constructionWork);
    // return this.http.post(this.apiUrl, workData);
  }

  // Delete Construction Work
  deleteConstructionWork(workId: number): Observable<ConstructionWork[]> {
    this.constructionWork = this.constructionWork.filter(work => work.id !== workId);
    return of(this.constructionWork);
  }

  // Get Construction Work by ID
  // getConstructionWorkById(workId: number): Observable<ConstructionWork> {
  //   const work = this.constructionWork.find(work => work.id === workId);
  //   return of(work);
  // }

  // Get All Construction Work
  getAllConstructionWork(): Observable<ConstructionWork[]> {
    return of(this.constructionWork);
  }

  getSignsByWorkId(workId: number): Observable<Signs[]> {
    const signs = this.signs.filter((sign) => sign.workId === workId);
    return of(signs);
  }
}

interface ConstructionWork {
  id: number;
  street: string;
  city: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Signs {
  signId: number;
  workId:number;
  issueDate: string;
  issueTime: string;
  issue: string;
}


