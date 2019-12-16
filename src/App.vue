<template lang='pug'>
  v-app
    v-content
      v-app-bar( v-if='user' dark color="primary" small dense)
        v-toolbar-title logged in as {{ user.displayName }}
        v-spacer
        v-toolbar-items
          v-btn( @click="logout" dark text prepend-icon="logout") logout
      router-view(v-on:set_login_variables="set_login_variables")
</template>

<script lang='coffee'>
export default
  data: () ->
    return 
      user: ""
  mounted: () ->
    this.set_login_variables();
  methods: 
    logout: () ->
      localStorage.clear();
      this.set_login_variables();
      this.$router.push("/");
    set_login_variables: () ->
      this.user = JSON.parse(localStorage.getItem("user"));
</script>
