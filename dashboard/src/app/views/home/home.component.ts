import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { CommonService } from 'src/app/services/common.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { resultSet } from 'src/app/model/item.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('pagination') pagination: any;
  user: any;
  loading: boolean = false;
  form: FormGroup;
  userDetail: any;
  subsciption: Subscription[] = [];
  sort = ['asc', 'desc'];
  currentPage = 1;
  data: resultSet;
  itemsPerPage = 10;
  isDesc: boolean = false;
  column: string = "itemname";
  constructor(
    private title: Title,
    private authService: AuthService,
    private fb: FormBuilder,
    private itemService: ItemService,
    private commonService: CommonService,
    private route: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.title.setTitle('Dashboard - Home');
    let navbar: any = document.querySelector('#navbarText');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
    this.subsciption.push(
      this.authService.currentUser.subscribe((data) => {
        this.userDetail = data;
      })
    );
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({
      itemname: [''],
      price: [''],
      userId: [this.userDetail.id]
    });
  }

  ngOnDestroy() {
    this.subsciption.forEach((sub) => sub.unsubscribe());
  }

  exportcsv() {
    let data = {
      userId: '63cd17a32e671549f079f736'
    } as const;
    this.subsciption.push(
      this.itemService.exportcsv(data).subscribe({
        next: (value) => {
          const name = `Result_${+new Date()}.csv`;
          importedSaveAs(value, name);
        },
        error: (e) => this.commonService.handleError(e),
      })
    );
  }

  search(page = 1) {
    if(page === 1 && this.pagination) {
      this.pagination._currentPage = 1;
    }
    const formValue = this.form.value;
    const sort = this.isDesc ? 'desc':'asc';
    const query = `${this.userDetail.id}?sortBy=${this.column}:${sort}&page=${page}`;
    this.subsciption.push(
      this.itemService.queryItems(query, formValue).subscribe({
        next: (value) => {
          if(value.totalPages == 0) {
            value.totalPages = 1;
          }
          this.data = value;
        },
        error: (e) => this.commonService.handleError(e),
      })
    );
  }

  deleteItem(id: string) {
    this.loading = true;
    this.subsciption.push(
      this.itemService.deleteItem(id).subscribe({
        next: (value) => {
          this.loading = false;
          this.search();
        },
        error: (e) => {
          this.commonService.handleError(e)
          this.loading = false;
        },
      })
    );
  }

  onPageChange(page: number = 1): void {
    this.search(page);
  }

  viewItem(id: string) {
    this.route.navigate(["items", id]);
  }

  sortItems(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.search();
  }
}
