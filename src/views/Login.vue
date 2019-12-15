<template lang='pug'>
  v-content
    v-row(algin='center' justify='center')
      v-col( cols='12' md='4') 
        v-card(   )
          v-card-title Please log in 
          v-card-actions
            v-btn(@click="login" color="success" ) login 
              v-icon( right) person
</template>

<script>
var firebase = require("firebase");
var firebaseui = require("firebaseui");

var db = firebase.firestore();

export default {
  data() {
    return {
      token: "",
      user: ""
    };
  },
  methods: {
    async login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      var result = await firebase.auth().signInWithPopup(provider);

      this.token = result.credential.accessToken;
      this.user = result.user;
      localStorage.setItem("token", JSON.stringify(this.token));
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$emit("set_login_variables");
      this.$router.push("/todos");
    }
  }
};
</script>