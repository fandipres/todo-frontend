<template>
  <div>
    <div>Selamat Datang</div>
    <ul>
      <li v-for="item in todos">{{item.desc}}</li>
    </ul>
    <input v-model="myText"/>
    <button @click="addTodos">Add</button>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      todos: [
        {desc: 'Makan Durian'},
        {desc: 'Makan Tempe'},
        {desc: 'Coding JS'}
      ],
      myText: ""
    }
  },
  methods:{
    addTodos: function(){
      this.todos.push({desc: this.myText})    
    }
  }
}
</script>