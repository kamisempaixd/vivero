export interface respuestaProductos {
    items: Producto[];
}

export interface Producto {
    id: number;
    cantidad: number;
    codigo: String;
    nombre: String;
    preciop: number;
    precio_venta: number;
    stock: number;
    descripcion: String;
    imagen: String;
    categoria: number;
    estado: number;
  }