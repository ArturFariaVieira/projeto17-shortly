import signinSchema from "../schemas/signinSchema.js";
import signupSchema from "../schemas/signupSchema.js";
import urlSchema from "../schemas/urlSchema.js";

export default function schemasValidationMiddleware(req, res, next) {

    const { confirmPassword, url } = req.body;

    if( !url && !confirmPassword){
        const validation = signinSchema.validate(req.body);
        if (validation.error) {
            return res.status(422).send(validation.error.message);
          }
    }
    if (url){
        const validation = urlSchema.validate(req.body);
        if (validation.error) {
            return res.status(422).send(validation.error.message);
          }
    }
    if(!url && confirmPassword) {
        const validation = signupSchema.validate(req.body);
        if (validation.error) {
            return res.status(422).send(validation.error.message);
          }
    }

  

  next();
}


