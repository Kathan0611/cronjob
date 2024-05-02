const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      // req.flash("errorMessage", errorMessage);
      // res.clearCookie("userData")
      // return res.render("register", { message: errorMessage })
      return res.status(411).json({errorMessage:errorMessage})


    }
    next();
  };
};


module.exports = validateRequest;
