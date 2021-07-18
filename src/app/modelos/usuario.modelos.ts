import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    id?: number;
    nombre?: string;
    apellido?: string;
    documento?: number;
    correo?: String;
    telefono?: String;
    role?: String;
    ciudadId?: number;

    clave?: String;
    tipoUsuarioId?: String;
    user?: UsuarioModule;
    tk?: String;
    isLoggedIn: boolean = false;
    isVendedor: boolean = false;
    isAdmin: boolean = false;
    username?: String;
}