const firebase = require('../helpers/firebaseConfig.js');

export default function logout() {
    firebase.auth
      .signOut()
      .then(() => {
        this.$store.dispatch('clearData');
        this.$router.push('/login');
      })
      .catch(err => {
        console.log(err);
      });
}