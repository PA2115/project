module.exports = function (req, res, next) {
  //grab the inputed form fields from server req.body.
  const { email, name, password } = req.body;

  //email validation func with regex pattern to check if inputed email field matches
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  /* if the server req path is register page, a check against the server req body 
    is made to check if the inputted register form field values are not empty and the email
    meets validation regex pattern above otherwise to display mising creden or invalid email
    error.
    */
  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }

    /* if the server req path is login page, a check against the server req body 
    is made to check if the inputted login form field values are not empty and the email
    meets validation regex pattern above otherwise to display mising creden or invalid email
    error.
    */
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  //if every validation is okay it continues with the route.
  next();
};
