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

  getRequestPrice: (distance, tempo) => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
        };

        json.price = distance * tempo * 0.5;

        if (json.price < 5) {
          json.price = 5;
        }
        resolve(json);
      }, 1000);
    });
  },
});
