import { Component, Input, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { APIService } from "../services/api.service";
import { MatPaginator, MatSort } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'data-collection',
  styleUrls: ['./data-table.component.css'],
  templateUrl: './data-table.component.html',
})
export class DataCollectionComponent {
  @Input() path: string="test-local";
  @Input() displayedColumns: any[]=[];
  dataSource: MyDataSource;
  dataSubject = new BehaviorSubject<any[]>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.dataSource =  new MyDataSource(this.dataSubject, this.paginator, this.sort);
    this.apiService.getData(this.path).subscribe({
      next: value => this.dataSubject.next(value)
    });
    // Observable for the filter
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(100)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

// export class MyDataSource1 extends DataSource<any[]> {
//   constructor(private subject: BehaviorSubject<any[]>) {
//     super ();
//   }
//   connect (): Observable<any[]> {
//     return this.subject.asObservable();
//   }
//   disconnect (): void {}
// }

export class MyDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(private subject: BehaviorSubject<any[]>, private _paginator: MatPaginator, private _sort: MatSort) {
    super();

    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.subject,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this.subject.value.slice().filter((item: any) => {
        let searchStr = (item.first_name + item.last_name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  // connect(): Observable<any[]> {
  //   return this.subject.asObservable();
  // }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: any[]): any[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'first_name': [propertyA, propertyB] = [a.first_name, b.first_name]; break;
        case 'last_name': [propertyA, propertyB] = [a.last_name, b.last_name]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'gender': [propertyA, propertyB] = [a.gender, b.gender]; break;
        case 'ip_address': [propertyA, propertyB] = [a.ip_address, b.ip_address]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}