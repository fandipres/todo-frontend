<template>
  <div>
    <h1>Berikut adalah daftar tugas kita</h1>
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.deskripsi}} <button @click="hapus(item.id)">x</button></li>
    </ul>
    <input v-model="myText" placeholder="todo"/>
    <button @click="tambah">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
var wsClient

export default {
  data: function(){
    return {
      todos: [],
      myText: ''
    }
  },
  created: function(){
    wsClient = new WebSocket("ws://localhost:3000/todo")
    wsClient.onopen = function() {
      console.log("connected")
    }
    wsClient.onmessage = (event) => {
      // console.log(event.data)
      var msg = JSON.parse(event.data)
      this.todos = msg
    }
    wsClient.onclose = function() {
      wsClient = null
    }

    const username = localStorage.getItem('usr')
    const password = localStorage.getItem('pwd')
    axios.get('http://localhost:3000/todo', {headers: {username, password}})
    .then((response) => {
      this.todos = response.data
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
      const newItem = {deskripsi: this.myText}
      axios.post('http://localhost:3000/todo', newItem, {headers: {username, password}})
      .then((response) => {
        wsClient.send(JSON.stringify(response.data))
      })
      .catch((error) =>{
        if(error.response.status === 401){
          alert("Please login to do this action.")
        }
      })
      this.myText = ''
    },
    hapus: function(id){
      const username = localStorage.getItem('usr')
      const password = localStorage.getItem('pwd')
      axios.delete(`http://localhost:3000/todo/${id}`, {headers: {username, password}})
      .then((response) => {
        wsClient.send(JSON.stringify(response.data))
      })
      .catch((error) => {
        if(error.response.status === 401){
          alert("Please login to see this page.")
        }
      })
    }
  }
}
</script>