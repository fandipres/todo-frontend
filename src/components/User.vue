<template>
  <div>
    <h1>Berikut adalah daftar tugas kita</h1>
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.deskripsi}} <button @click="hapus(item.id)">x</button></li>
    </ul>
    <input v-model="username"/>
    <input v-model="password"/>
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
    axios.get('http://localhost:3000/user')
    .then((response) => {
      this.todos = response.data
    })
  },
  methods:{
    tambah: function(){
      const newItem = {deskripsi: this.myText}
      axios.post('http://localhost:3000/user', newItem)
      .then(() => {
        this.todos.push(newItem)
        window.location.reload()
      })
    },
    hapus: function(id){
      var index = this.todos.findIndex(obj => obj.id === id)
      axios.delete(`http://localhost:3000/user/${id}`)
      .then(() => {
        this.todos.splice(index, 1)
      })
    }
  }
}
</script>