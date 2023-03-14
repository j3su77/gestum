export interface User {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  tipo_documento: Tipo_doc;
  documento: string;
  rol: Rol;
  direccion: string;

  [key: string]: any;
}
export enum Tipo_doc {
  CC = 'Cedula de Ciudadania',
  CE = 'Cedula de Extranjeria',
  PA = 'Pasaporte',
}

export enum Rol {
  Admin = 'admin',
  Executor = 'executor',
  Client = 'client',
}
