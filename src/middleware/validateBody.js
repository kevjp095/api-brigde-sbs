export const validateLogin = (req, res, next) => {
    const { body } = req;
  
    if (!body.key) {
      const error = new Error("Invalid value for 'key' parameter");
      error.statusCode = 400;
      error.code = 'invalid_parameter';
      return next(error);
    }
  
    if (!body.tipo_documento || !body.numero_documento || !body.contrasenia) {
      const error = new Error("Parameter 'tipo_documento, numero_documento, contrasenia' can not be empty");
      error.statusCode = 400;
      error.code = 'missing_parameter';
      return next(error);
    }
  
    next();
  };
  
  export const validateExchange = (req, res, next) => {
    const { body } = req;

    if(!body.fecha || !body.moneda){
      const error = new Error("Parameter 'fecha' or 'moneda' can not be empty");
      error.statusCode = 400;
      error.code = 'missing_parameter';
      return next(error);
  }
  
    next();
  };

  export const validateDocument = (req, res, next) => {
    const { body } = req;

    if(!body.tipo_documento || !body.numero_documento){
      const error = new Error("Parameter 'tipo_documento or numero_documento' can not be empty");
      error.statusCode = 400;
      error.code = 'missing_parameter';
      return next(error);
  }
    next();
  };

  export const validateDocumentMembership = (req, res, next) => {
    const { body } = req;

    if(!body.id_tipo_documento || !body.numero_documento){
      const error = new Error("Parameter 'id_tipo_documento or numero_documento' can not be empty");
      error.statusCode = 400;
      error.code = 'missing_parameter';
      return next(error);
  }
    next();
  };


  