'use strict'

const loginUser = new UserForm();

loginUser.loginFormCallback = data => { ApiConnector.login(data, callback => {
    if(callback.success === true) {
      window.location.reload();
    } else {
      loginUser.setLoginErrorMessage(callback.error);
    }
  })
}

loginUser.registerFormCallback = data => { ApiConnector.register(data, callback => {
  if(callback.success === true) {
    window.location.reload();
  } else {
    loginUser.setRegisterErrorMessage(callback.error);
  }
})
}