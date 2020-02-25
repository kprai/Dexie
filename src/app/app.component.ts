import {Component, OnInit} from '@angular/core';
import Dexie from '@dpogue/dexie';
import {Product} from "./product";
//----import {DexieService} from "@dpogue/DexieService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  db: any;
  newProduct: Product = new Product("", "");
  rows: Product[] = [];

  ngOnInit() {
    this.makeDatabase();
    this.connectToDatabase();
  }

  makeDatabase(): void {
    this.db = new Dexie('MyDatabase');
    this.db.version(1).stores({
      //products: 'name, description'
    products: '++id,name, description'
    });
    this.loadRows();
  }
  connectToDatabase(): void {
    this.db.open().catch((error) => {
      alert("Errod during connecting to database : " + error);
    });
  }

  clearRows(): void {
    this.db.products.clear().then(result => console.log(result));
    this.loadRows();
  }

  loadRows(): void {
    this.db.products.toArray().then(p => this.rows = p);
  }

  addRow(product: Product): void {
    console.log(product);
    this.db.products.add({id:661,
      name: product.name,
      description: product.description
    });

    this.loadRows();
    this.newProduct = new Product("", "");
  }
UpdateRow(product: Product): void {
      console.log(product);
      this.db.products.update(6,{id : 88,
        name: 'Updated Product Name',
        description: 'I Want Testing Product'
      }).then(function (updated)
      {
        if (updated)
        console.log('Product has Changed');
        else
        console.log('Key Not Found Product can not be updated');
      });
this.loadRows();
}


}
