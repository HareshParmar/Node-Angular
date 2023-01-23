import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  loading = false;
  title = "Create Item";
  constructor(private fb: FormBuilder, private authService: AuthService,
    private itemService: ItemService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute){}

  userDetail: any;
  subsciption: Subscription[] = [];
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.subsciption.push(
      this.authService.currentUser.subscribe((data) => {
        this.userDetail = data;
      })
    );
    if(id) {
      this.title = "View Item";
      this.fetchData(id);
    }
    this.loadForm();
  }

  loadForm() {
    this.itemForm = this.fb.group({
      itemname: ['', Validators.required],
      price: ['', Validators.required],
      userId: [this.userDetail.id, Validators.required],
    })

  }

  get formControls() {
    return this.itemForm['controls'];
  }

  createItem() {
    this.itemForm.markAllAsTouched();
    if(this.itemForm.valid){
      let value = this.itemForm.value;
      value.price = `${value.price}`;
      this.loading = true;
      this.subsciption.push(
       this.itemService.createItem(value).subscribe({
        next: (value) => {
          this.router.navigate(["/home"])
        },
        error: (err) => {
          this.commonService.handleError(err);
        }
       })
      );
    }
  }

  ngOnDestroy(): void {
    this.subsciption.forEach(sub => sub.unsubscribe());
  }  

  fetchData(id: string) {
    this.subsciption.push(
      this.itemService.getItem(id).subscribe({
       next: (value) => {
        this.itemForm.patchValue({
          itemname: value.itemname,
          price: value.price,
          userId: value.userId
        });
        this.itemForm.disable();
       },
       error: (err) => {
         this.commonService.handleError(err);
       }
      })
     );
  }

  goBack() {
    this.router.navigate(["/home"]);
  }
}
