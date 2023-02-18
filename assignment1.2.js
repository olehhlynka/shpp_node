const Validator = {
  validateEmail(email) {
    const emailRegex = new RegExp(
      [
        /^[a-zA-Z0-9][-.+a-zA-Z0-9]{1,19}@/, //firstpart
        /[\w.!$%&’*+/=?^-]{1,15}\./, //secondpart
        /[a-zA-Z]{1,5}$/, //end
      ]
        .map((exp) => exp.source)
        .join("")
    );
    return email.match(emailRegex) ? true : false;
  },

  validatePhone(phone) {
    if (phone.length > 25) {
      return false;
    }
    const phoneRegex = new RegExp(
      [
        /^[-\s]*([-\s]*\+[-\s]*3[-\s]*8[-\s]*)?[-\s]*/, //country code
        /\(?([-\s]*\d[-\s]*){3}\)?/, //3-digit carrier code
        /([-\s]*\d[-\s]*){7}$/, //7-digit number
      ]
        .map((exp) => exp.source)
        .join("")
    );
    return phone.match(phoneRegex) ? true : false;
  },

  validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w{8,}$/;
    return password.match(passwordRegex) ? true : false;
  },
};
