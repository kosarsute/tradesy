"use strict";

class Login {

    get $emailTxt() { return $('[name="login_modal_email"]'); }
    get $passwordTxt() { return $('[name="login_password"]'); }
    get $logInWithEmailBtn() { return $('[id="login-button"]'); }
    get $logInBtn() { return $('button=Login'); }

    login({ email, password }) {
        this.$emailTxt.setValue(email);
        this.$passwordTxt.setValue(password);
        this.$logInWithEmailBtn.click();
    }
}
module.exports = new Login();

