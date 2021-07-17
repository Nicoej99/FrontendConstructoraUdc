import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    id?: String;
    correo?: String;
    clave?: String;
    tipoUsuarioId?: String;
    telefono?: String;
    user?: UsuarioModule;
    documento?: number;
    nombre?: string;
    apellido?: string;
    ciudadId?: number;
    tk?: String;
    isLoggedIn: boolean = false;
    role?: number;
    isVendedor: boolean = false;
    isAdmin: boolean = false;
}