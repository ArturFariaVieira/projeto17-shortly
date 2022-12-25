import signinSchema from "../schemas/signinSchema.js";
import signupSchema from "../schemas/signupSchema.js";
import urlSchema from "../schemas/urlSchema.js";

export default function schemasValidationMiddleware(req, res, next) {

    const { name, email, password, confirmPassword, url } = req.body;

    if( !url && !confirmPassword){
        const validation = signinSchema.validate(req.body);
        if (validation.error) {
            return res.send(validation.error.message).status(422);
          }
    }
    if (url){
        const validation = urlSchema.validate(req.body);
        if (validation.error) {
            return res.send(validation.error.message).status(422);
          }
    }
    if(!url && confirmPassword) {
        const validation = signupSchema.validate(req.body);
        if (validation.error) {
            return res.send(validation.error.message).status(422);
          }
    }

  

  next();
}


