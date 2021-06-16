<template>
  <div>
    <h1>Berikut adalah semua pengguna kita</h1>
    <ul>
      <li v-for="item in users" :key="item.id">{{item.username}} <button @click="hapus(item.id)">x</button></li>
    </ul>
    <input v-model="username" placeholder="username"/>
    &nbsp
    <input v-model="password" placeholder="password"/>
    <button @click="tambah">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
var wsClient

export default {
  data: function(){
    return {
      users: [],
      username: '',
      password: ''
    }
  },
  created: function(){
    wsClient = new WebSocket("ws://localhost:3000/user")
    wsClient.onopen = function() {
      console.log("connected")
    }
    wsClient.onmessage = (event) => {
      // console.log(event.data)
      var msg = JSON.parse(event.data)
      this.users = msg
    }
    wsClient.onclose = function() {
      wsClient = null
    }

    const username = localStorage.getItem('usr')
    const password = localStorage.getItem('pwd')
    axios.get('http://localhost:3000/user', {headers: {username, password}})
    .then((response) => {
      this.users = response.data
    })
    .catch((error) => {
      if(error.response.status === 401){
        alert("Please login to see this page.")
      }
    })
  },
  methods:{
    tambah: function(){
      const username = localStorage.getItem('usr')
      const password = localStorage.getItem('pwd')
      const newItem = {username: this.username, password: this.password}
      axios.post('http://localhost:3000/user', newItem, {headers: {username, password}})
      .then((response) => {
        wsClient.send(JSON.stringify(response.data))
      })
      .catch((error) => {
          if(error.response.status === 401){
            alert("Please login to do this action.")
          }
          if(error.response.status === 405){
            alert("This username is already taken.")
          }
      })
      this.username = ''
      this.password = ''
    },
    hapus: function(id){
      const username = localStorage.getItem('usr')
      const password = localStorage.getItem('pwd')
      axios.delete(`http://localhost:3000/user/${id}`, {headers: {username, password}})
      .then((response) => {
        wsClient.send(JSON.stringify(response.data))
      })
      .catch((error) => {
        if(error.response.status === 401){
          alert("Please login to see this page.")
        }
        if(error.response.status === 405){
          alert("Can't delete, only 1 user in database.")
        }
      })
    }
  }
}
</script>