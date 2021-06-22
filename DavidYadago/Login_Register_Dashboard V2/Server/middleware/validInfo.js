module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  function validPassword(userPassword) {
    return /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}/.test(
      userPassword
    );
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials.");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email.");
    } else if (!validPassword(password)) {
      return res
        .status(401)
        .json(
          "Password must contain atleast one lowercase & uppercase letter, " +
            "a number and is at least 8 characters in length."
        );
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials.");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email.");
    } else if (!validPassword(password)) {
      return res
        .status(401)
        .json(
          "Password must contain atleast one lowercase & uppercase letter, " +
            "a number and is at least 8 characters in length."
        );
    }
  } else if (req.path === "/updatePasswordViaEmail") {
    if (!validPassword(password)) {
      return res.status(200).send({ message: "Password" });
    }
  }
  next();
};
