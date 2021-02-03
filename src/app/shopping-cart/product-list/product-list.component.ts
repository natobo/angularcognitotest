import { Component, OnInit } from '@angular/core';
import { Product } from '../../modules/product';
import { AuthorizationService } from "../../shared/authorization.service";
import { Http, Headers } from "@angular/http";

const apiUrl = "https://xewt0rniyc.execute-api.us-east-1.amazonaws.com/Prod/Lambda_api-lambda-db-tiendaback-nicotobo";
const proxyurl = "https://cors-anywhere.herokuapp.com/";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  _data: any;
  productList: Product[] = []
  constructor(private http: Http, private auth: AuthorizationService) { }
  ngOnInit(): void {
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
        this.http.post(proxyurl + apiUrl, {
          "operation": "list",
          "tableName": "Dynamo_api-lambda-db-tiendaback-nicotobo",
          "payload": {}
        }, { headers: headers })
          .subscribe(
            response => {
              that._data = response.json();
              that.productList = that._data.Items;
            },
            error => {
              console.log(error);
            }
          );
      });
    });
  }
}
