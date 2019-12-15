<template lang='pug'>
  v-content 
    v-card(  )
      v-btn( @click="login" ) login
      span {{ token }} {{ user }}
</template>

<script>
var firebase = require("firebase");
var firebaseui = require("firebaseui");

export default {
  data() {
    return {
      token: "",
      user: ""
    };
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase.auth().languageCode = "pt";
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          console.log(result);
          
          this.token = result.credential.accessToken;
          // The signed-in user info.
          this.user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
  }
};
</script>