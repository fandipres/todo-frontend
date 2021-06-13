<template>
<router-link to="/">Halaman Auth</router-link>
&nbsp
<router-link to="/todo">Halaman Todo</router-link>
&nbsp
<router-link to="/user">Halaman User</router-link>
<router-view></router-view>
</template>

<script setup>
import Todo from './components/Todo.vue'
import User from './components/User.vue'
</script>