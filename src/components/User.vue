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

export default {
  data: function(){
    return {
      users: [],
      username: '',
      password: ''
    }
  },
  created: function(){
    const username = localStorage.getItem('usr')
    const password = localStorage.getItem('pwd')
    axios.get('http://localhost:3000/user', {headers: {username, password}})
    .then((response) => {
      this.users = response.data
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
      const newItem = {username: this.username, password: this.password}
      axios.post('http://localhost:3000/user', newItem, {headers: {username, password}})
      .then((response) => {
        this.users.push(response.data)
      })
      .catch((error) => {
          if(error.response.status === 401){
            alert("Please login to do this action.")
          }
          if(error.response.status === 405){
            alert("This username is already taken.")
          }
      })
    },
    hapus: function(id){
      const username = localStorage.getItem('usr')
      const password = localStorage.getItem('pwd')
      var index = this.users.findIndex(obj => obj.id === id)
      axios.delete(`http://localhost:3000/user/${id}`, {headers: {username, password}})
      .then((response) => {
        this.users.splice(index, 1)
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