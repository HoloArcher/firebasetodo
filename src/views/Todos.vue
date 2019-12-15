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
              v-data-table( :items='todos' :headers='headers' :serach='search')
                template( v-slot:top )
                  v-text-field( solo v-model='search' label='search' prepend-icon="search" )
                template( v-slot:item.action='{ item }')
                  v-icon( small @click="deleteTodo(item.id, todos.indexOf(item))" ) delete

            //-       <template v-slot:item.action="{ item }">
            //-   <v-icon
            //-     small
            //-     class="mr-2"
            //-     @click=" editing= true; dialog_obj = item; dialog = true;"
            //-   >edit</v-icon>
            //-   <v-icon small @click="deleteTodo(todos.indexOf(item))">delete</v-icon>
            //- </template>

              //- v-data-iterator(:items="todos" :search='search')
              //-   template( v-slot:header )
              //-     v-text-field( solo v-model='search' label='search' prepend-icon="search" )
              //-   template(v-slot:default='props')
              //-     v-row(wrap )
              //-       v-col(v-for="item in props.items" :key="item.id" md='2' )
              //-         v-card()
              //-           v-app-bar(dark color="purple" )
              //-             v-spacer
              //-             v-app-bar-nav-icon( @click="deleteTodo(item.id, todos.indexOf(item))")
              //-               v-icon delete
              //-           v-card-text  {{ item.data }}
</template>

<script>
var fire = require("firebase");
var firebaseui = require("firebaseui");

const firebaseConfig = {
  apiKey: "AIzaSyD-_8yty6d8oUJ99NA56qXBylYxgOXJOj4",
  authDomain: "todo-app-kek.firebaseapp.com",
  databaseURL: "https://todo-app-kek.firebaseio.com",
  projectId: "todo-app-kek",
  storageBucket: "todo-app-kek.appspot.com",
  messagingSenderId: "781014454227",
  appId: "1:781014454227:web:5335ee21a7e6e21771e926",
  measurementId: "G-E50Y0TVVTP"
};

var firebase = fire.initializeApp(firebaseConfig);
var db = firebase.firestore();
export default {
  name: "app",
  data() {
    return {
      todos: [],
      search: "",
      dialog: {
        on: false,
        todo: ""
      },
      headers: [
        { value: "data", text: "todo" },
        { text: "Actions", value: "action", sortable: false,  }
      ]
    };
  },
  async mounted() {
    this.set_login_variables();
    var storage = await db
      .collection("users")
      .doc(this.user.uid)
      .collection("todos")
      .get();
    var data = [];
    storage.forEach(el => {
      data.push({ data: el.data(), id: el.id });
    });
    data.map(el => {
      el.data = el.data.data;
    });
    this.todos = data;
    this.dialog.on = false;
  },
  methods: {
    set_login_variables() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    async addtodo() {
      var data = { data: this.dialog.todo };

      var temp = await db
        .collection("users")
        .doc(this.user.uid)
        .collection("todos")
        .add(data);
      // .set(data);
      console.log(temp);

      data.id = temp.id;

      this.todos.push(data);

      this.dialog.on = false;
    },
    async deleteTodo(id, index) {
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("todos")
        .doc(id)
        .delete();
      this.todos.splice(index, 1);
    }
  }
};
</script>
 