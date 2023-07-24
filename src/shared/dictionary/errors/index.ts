export const ErrorCodes = (error: string, obj: any, msg: string = ''): any => {
  const object = {
    title: 'Error al realizar la solicitud',
    message: '',
    obj: null
  };
  switch (error) {
    case 'ER-Login-001':
      object.title = 'Error al iniciar sesión';
      object.message = 'Las credenciales no son válidas';
      break;
    case 'ER-LOGIN-002':
      object.message =
        'Su usuario está inactivo, póngase en contacto con el administrador del sistema';
      break;
    case 'ER-LOGIN-003':
      object.message = 'No tienes acceso a esta plataforma';
      break;
    // case for users
    case 'ER-USER':
      object.title = '¡Error inesperado!';
      object.message =
        'Código: "ER-USER", Contacte al administrador del Sistema:';
      object.obj = obj;
      break;
    case 'ER-USER-000':
      object.title = 'Error al procesar la solicitud.';
      object.message = `No se encontró el Usuario con el identificador: ${String(
        obj
      )}`;
      break;
    case 'ER-USER-001':
      object.message = '¡La solicitud no cumple con los parámetros requeridos!';
      break;
    case 'ER-USER-002':
      object.message =
        'El campo que indica si el Usuario está o no activo, no se está añadiendo a la solicitud.';
      break;
    case 'ER-USER-003':
      object.message = '¡El Nombre de Usuario es un campo requerido!';
      break;
    case 'ER-USER-004':
      object.message = '¡El Correo electronico es un campo requerido!';
      break;
    case 'ER-USER-005':
      object.message = '¡La Contraseña es requerida!';
      break;
    // case for vehicles
    case 'ER-VEHICLE':
      object.title = '¡Error inesperado!';
      object.message =
        'Código: "ER-VEHICLE", Contacte al administrador del Sistema:';
      object.obj = obj;
      break;
    case 'ER-VEHICLE-000':
      object.title = 'Error al procesar la solicitud.';
      object.message = `No se encontró el Usuario con el identificador: ${String(
        obj
      )}`;
      break;
    case 'ER-VEHICLE-001':
      object.message = '¡La solicitud no cumple con los parámetros requeridos!';
      break;
    case 'ER-VEHICLE-002':
      object.message =
        'El campo que indica si el Usuario está o no activo, no se está añadiendo a la solicitud.';
      break;
    case 'ER-VEHICLE-003':
      object.message = '¡El Nombre de Usuario es un campo requerido!';
      break;
    case 'ER-VEHICLE-004':
      object.message = '¡El Correo electronico es un campo requerido!';
      break;
    case 'ER-VEHICLE-005':
      object.message = '¡La Contraseña es requerida!';
      break;
    default:
      object.title = '¡Error inesperado!';
      object.message = 'Póngase en contacto con el administrador de su sistema';
      break;
  }
  return object;
};
