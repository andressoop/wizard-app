const fb = require('../helpers/firebaseConfig.js');

export default function logout() {
    fb.auth
      .signOut()
      .then(() => {
        this.$store.dispatch('clearData');
        this.$router.push('/login');
      })
      .catch(err => {
        console.log(err);
      });
}