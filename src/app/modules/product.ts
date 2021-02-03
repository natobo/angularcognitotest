export class Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;

    constructor(id: number, nombre: string, descripcion: string = '', precio: number = 0, imagenUrl: string = '') {
        this.id = id;
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
    }
}
