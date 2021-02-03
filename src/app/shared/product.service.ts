import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Product } from '../modules/product';
import { AuthorizationService } from "../shared/authorization.service";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://xewt0rniyc.execute-api.us-east-1.amazonaws.com/Prod/Lambda_api-lambda-db-tiendaback-nicotobo";

@Injectable()
export class ProductService {
  _data: any;
  products: Product[] = [];
  // products: Product[] = [
  //   new Product(1, 'Carne', 'La mejor carne para una parrillada', 15000, "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"),
  //   new Product(2, 'Pan2', 'Recien horneado', 2000),
  //   new Product(3, 'Pan3', 'Recien horneado', 3000),
  //   new Product(4, 'Pan4', 'Recien horneado', 4000),
  //   new Product(5, 'Pan5', 'Recien horneado', 5000),
  //   new Product(6, 'Pan6', 'Recien horneado', 6000),
  //   new Product(7, 'Pan7', 'Recien horneado', 7000),
  // ]
  constructor(public http: Http, private auth: AuthorizationService) { }

  getProducts(): any {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    if (authenticatedUser == null) {
      return;
    }
    authenticatedUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      const token = session.getIdToken().getJwtToken();
      const headers = new Headers();
      headers.append('Authorization', token);
      var that = this;
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        const token = session.getIdToken().getJwtToken();
        const headers = new Headers();
        headers.append('Authorization', token);
        return this.http.post(proxyurl + apiUrl, {
          "operation": "list",
          "tableName": "Dynamo_api-lambda-db-tiendaback-nicotobo",
          "payload": {}
        }, { headers: headers })
          .subscribe(
            response => {
              that._data = response.json();
              console.log(that._data);
              that.products = that._data.Items;
            },
            error => {
              console.log(error);
            }
          );
      });
    });
    // Poblar los productos de un API y retornar un Observable
    //this.uploadProducts();
  }
}
