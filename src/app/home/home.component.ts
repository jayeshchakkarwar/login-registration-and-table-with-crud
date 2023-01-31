// import { Component } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, PayeeObj } from './../_models';
import { AccountService } from './../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    @ViewChild('form') form: any;
    user: User | null;

    //new table code

    PayeeObj: PayeeObj;
    searchText: string;
    PayeeArr: PayeeObj[] = [];
    selectedItem: any | null;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;

        //new table code
        this.PayeeObj = new PayeeObj();
    }
    // ------------------


    users?: any[];


    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
        // new table code
        this.getAllEmpoyee();
    }

    // new table code

    onSave() {
        const isData = localStorage.getItem("PayeeData");

        if (isData == null) {
            const newArr = [];
            this.PayeeObj.PayeeId = 0;
            newArr.push(this.PayeeObj);
            localStorage.setItem("PayeeData", JSON.stringify(newArr));
        } else {
            const oldData = JSON.parse(isData);
            if (this.selectedItem) {

                for (let index = 0; index < oldData.length; index++) {
                    if (oldData[index].PayeeId == this.selectedItem.PayeeId) {

                        oldData.splice(index, 1, this.PayeeObj);
                        localStorage.setItem("PayeeData", JSON.stringify(oldData));
                    }
                }
                this.selectedItem = null;

            }
            else {
                const newId = oldData.length + 1;
                this.PayeeObj.PayeeId = newId;
                oldData.push(this.PayeeObj);
                localStorage.setItem("PayeeData", JSON.stringify(oldData));
            }
        }
        this.form.reset();
        this.PayeeObj = new PayeeObj();
        this.getAllEmpoyee();
    }
    onCancel() {
        this.form.reset();
        this.selectedItem = null;
        this.getAllEmpoyee();
    }

    getAllEmpoyee() {
        const isData = localStorage.getItem("PayeeData");
        if (isData != null) {
            const localData = JSON.parse(isData);
            this.PayeeArr = localData;
        }
    }

    onEdit(item: PayeeObj) {
        this.selectedItem = item;
        this.PayeeObj = item;
    }

    onDelete(item: PayeeObj) {
        const isData = localStorage.getItem("PayeeData");
        if (isData != null) {
            const localData = JSON.parse(isData);
            for (let index = 0; index < localData.length; index++) {
                if (localData[index].PayeeId == item.PayeeId) {
                    localData.splice(index, 1);
                }
            }
            localStorage.setItem("PayeeData", JSON.stringify(localData));
            this.getAllEmpoyee();
        }
    }

    onSearch() {
        const isData = localStorage.getItem("PayeeData");
        if (isData != null) {
            const localData = JSON.parse(isData);

            const filteredData = localData.filter((m: PayeeObj) => m.FirstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()))
            this.PayeeArr = filteredData;
        }
    }

}

