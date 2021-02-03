import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { Http, Headers } from "@angular/http";

const apiUrl = "https://xewt0rniyc.execute-api.us-east-1.amazonaws.com/Prod/Lambda_api-lambda-db-tiendaback-nicotobo";
const proxyurl = "https://cors-anywhere.herokuapp.com/";


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {

  constructor(private http: Http, private auth: AuthorizationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const id = form.value.id;
    const precio = form.value.precio;
    const descripcion = form.value.descripcion;
    const nombre = form.value.nombre;
    const imagenUrl = form.value.imagenUrl;

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
          "operation": "create",
          "tableName": "Dynamo_api-lambda-db-tiendaback-nicotobo",
          "payload": {
            "Item": {
              "id": id,
              "descripcion": descripcion,
              "precio": precio,
              "nombre": nombre,
              "imagenUrl": imagenUrl
            }
          }
        }, { headers: headers })
          .subscribe(
            response => {
              alert('Su producto fue creado con exito')
            },
            error => {
              console.log(error);
            }
          );
      });
    });




    console.log(id, precio, descripcion, nombre, imagenUrl);
  }


}
