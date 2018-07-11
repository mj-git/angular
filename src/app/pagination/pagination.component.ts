import { Component, Input, Output, OnInit } from '@angular/core';

const data = [{
  id: 1,
  name: 'Karen'
},
{
  id: 2,
  name: 'Lucas'
},
{
  id: 3,
  name: 'Nathan'
},
{
  id: 4,
  name: 'Peyton'
},
{
  id: 5,
  name: 'Keith'
},
{
  id: 6,
  name: 'Dan'
},
{
  id: 7,
  name: 'Deb'
},
{
  id: 8,
  name: 'John'
},
{
  id: 9,
  name: 'Steve'
},
{
  id: 10,
  name: 'Michael'
}];

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit  {
  page = 1;
  count = data.length ;
  perPage = 3;
  data = data;
  loading: boolean;
  pagesToShow = 3;
  pageData = [];

  constructor() { }
  ngOnInit() {
    this.pageData = data.slice(0, this.page * this.perPage);
  }

  getMessages(): void {
    if (this.page === 1) {
      if (this.page * this.perPage <= this.pageData.length) {
        this.pageData = data.slice(0, this.page * this.perPage);
      } else {
        this.pageData = data.slice(0, this.pageData.length);
      }
    } else {
      this.pageData = data.slice((this.page - 1) * this.perPage, this.page * this.perPage);
    }
  }

  onPage(n: number): void {
    this.page = n;
    this.getMessages();
  }

  onPrev(): void {
    if (this.page === 1) {
      return;
    }
    this.page--;
    this.getMessages();
  }

  onNext(): void {
    if (this.lastPage()) {
      return;
    }
    this.page++;
    this.getMessages();
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.count;
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 3;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
