export default () => ({
  signin: (email, password) => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
        };

        if (email === 'erro@hotmail.com') {
          json.error = 'E-mail e / ou senha errados!';
        } else {
          json.token = '123';
        }
        resolve(json);
      }, 1000);
    });
  },

  signup: (name, email, password) => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
        };

        if (email === 'erro@hotmail.com') {
          json.error = 'E-mail e / ou senha errados!';
        } else {
          json.token = '123';
        }
        resolve(json);
      }, 1000);
    });
  },
});
