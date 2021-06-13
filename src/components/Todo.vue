<template>
  <div>
    <h1>Berikut adalah daftar tugas kita</h1>
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.deskripsi}} <button @click="hapus(item.id)">x</button></li>
    </ul>
    <input v-model="myText"/>
    <button @click="tambah">Add</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function(){
    return {
      todos: [],
      myText: ''
    }
  },
  created: function(){
    const username = localStorage.getItem('usr')
    const password = localStorage.getItem('pwd')
    axios.get('http://localhost:3000/todo', {headers: {username, password}})
    .then((response) => {
      this.todos = response.data
    })
    .catch((error) =>{
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
        this.todos.push(response.data)
      })
      .catch((error) =>{
        if(error.response.status === 401){
          alert("Please login to do this action.")
        }
      })
    },
    hapus: function(id){
      const username = localStorage.getItem('usr')
      const password = localStorage.getItem('pwd')
      var index = this.todos.findIndex(obj => obj.id === id)
      axios.delete(`http://localhost:3000/todo/${id}`, {headers: {username, password}})
      .then(() => {
        this.todos.splice(index, 1)
      })
      .catch((error) =>{
        if(error.response.status === 401){
          alert("Please login to see this page.")
        }
      })
    }
  }
}
</script>