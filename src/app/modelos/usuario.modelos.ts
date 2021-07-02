import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    id?: String;
    correo?: String;
    clave?: String;
    tipoUsuarioId?: String;
    telefono?: String;
    user?: UsuarioModule;
    tk?: String;
    isLoggedIn: boolean = false;
}