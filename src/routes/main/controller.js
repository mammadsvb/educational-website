const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const Recaptcha = require("express-recaptcha").RecaptchaV2;
const fs = require('fs');
require('dotenv').config()


module.exports = class {
  constructor() {
    autoBind(this);
    this.setRecaptcha();
  }

  setRecaptcha() {
    this.recaptcha = new Recaptcha(
      process.env.RECAPTCHA_SITE_KEY,
      process.env.RECAPTCHA_SECRET_KEY
      
    );
  }

  RecaptchaVaildation(req, res) {
    return new Promise((resolve, reject) => {
      this.recaptcha.verify(req, (err, data) => {
        if (err) {
          req.flash("errors", "ROBOT");
          this.back(req, res);
        } else {
          resolve(true);
        }
      });
    });
  }

  validation(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = result.array();
      const massages = [];
      errors.forEach((err) => massages.push(err.msg));

      req.flash("errors", massages);
      
      if(req.file)
        fs.unlink(req.file.path,(err) => err);

      return this.back(req, res);
    }

    next();
  }

  back(req, res) {
    return res.redirect(req.header("Referer") || "/");
  }


};
