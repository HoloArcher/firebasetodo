<template lang='pug'>
  v-content
    v-container( grid-list-xs  fill-height)
      v-row(align='center' justify='center')
        v-col( cols='12' md='11')
          v-card
            v-app-bar(color="primary" dark ) todos
              v-spacer
              v-dialog( v-model="dialog.on" width='500')
                template( v-slot:activator='{ on }')
                  v-btn( rounded color="success" v-on='on') 
                    v-icon add
                v-card
                  v-app-bar( color='primary' dark ) new todo
                  v-card-text
                    v-container( grid-list-xs )
                    v-row()
                      v-col()
                        v-text-field( label='todo' v-model="dialog.todo"  )
                      //- v-col()
                      //-   v-text-field( label='other' )
                  v-card-actions
                    v-spacer
                    v-btn( @click="addtodo" color="primary" outlined rounded  ) add todo
            v-container
              v-data-table( calculate-widths :items='todos' :headers='headers' :search='search' )
                template( v-slot:top )
                  v-text-field( solo v-model='search' label='search' prepend-icon="search" )
                template( v-slot:no-data )
                  v-row(justify='center')
                    v-col 
                      v-btn( @click="dialog.on = true" color="primary"  rounded  ) new todo
                //- template( v-slot:header="{props}")
                //-   v-row( justify='left') 
                //-     v-col( v-for="n of props.headers") {{ n.text }}
                   
                template( v-slot:item.action='{ item }')
                  
                  v-icon( small @click="deleteTodo(item.id, todos.indexOf(item))" ) delete
                
</template>

<script lang='coffee'>

fire = require("firebase");
firebaseui = require("firebaseui");

firebaseConfig = 
  apiKey: "AIzaSyD-_8yty6d8oUJ99NA56qXBylYxgOXJOj4",
  authDomain: "todo-app-kek.firebaseapp.com",
  databaseURL: "https://todo-app-kek.firebaseio.com",
  projectId: "todo-app-kek",
  storageBucket: "todo-app-kek.appspot.com",
  messagingSenderId: "781014454227",
  appId: "1:781014454227:web:5335ee21a7e6e21771e926",
  measurementId: "G-E50Y0TVVTP"


firebase = fire.initializeApp firebaseConfig
db = firebase.firestore();
export default 
  name: "app"
  data: () ->
    return 
      todos: []
      search: ""
      dialog: 
        on: false,
        todo: ""
      headers: [
        { value: "data", text: "todo", width: '90%' }
        { text: "Actions", value: "action", sortable: false,  }
      ]
  mounted: () ->
    this.set_login_variables();
    storage = await db
      .collection("users")
      .doc(this.user.uid)
      .collection("todos")
      .get();

    data = [];

    storage.forEach( (el) ->
      data.push {data: el.data().data, id: el.id})
      

    this.todos = data;
    this.dialog.on = false;
  
  methods: 
    set_login_variables: () ->
      this.user = JSON.parse(localStorage.getItem("user"));
    addtodo: () ->
      data =
        data: this.dialog.todo 
      temp = await db
        .collection("users")
        .doc(this.user.uid)
        .collection("todos")
        .add(data);

      data.id = temp.id;
      this.todos.push data
      this.dialog.on = false

    deleteTodo: (id, index) ->
      console.log id
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("todos")
        .doc(id)
        .delete();
      this.todos.splice index, 1

</script>
 