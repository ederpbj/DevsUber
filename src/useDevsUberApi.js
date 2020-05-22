export default () => ({
  signin: (email, password) => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
          token: '123',
          name: 'Paulo da Silva',
        };

        // if (email === 'erro@hotmail.com') {
        //   json.error = 'E-mail e / ou senha errados!';
        // } else {
        //   json.token = '123';
        // }
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
          json.name = 'Paulo da Silva';
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

  findDriver: options => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
        };

        json.driver = {
          name: 'Joseph Aquiles',
          avatar:
            'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          stars: 4,
          carName: 'Honda Civic',
          carColor: 'Branco',
          carPlates: 'AAA-0000',
        };

        // Erro
        // json.error = 'Nenhum motorista encontrado!';

        resolve(json);
      }, 3000);
    });
  },

  setingRating: rating => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
        };

        resolve(json);
      }, 1000);
    });
  },

  getRequestHistory: (driverInfo, infor) => {
    return new Promise((resolve, reject) => {
      //Login fake
      setTimeout(() => {
        let json = {
          error: '',
        };
        json.history = {
          name: driverInfo,
        };
        console.log()
        // console.log('Driver xxxxx', driverInfo);
        // console.log('Infor xxxxx', infor);

        // json.history.push()

        resolve(json);
      }, 1000);
    });
  },
});
