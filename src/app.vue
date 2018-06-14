<template>
    <div id = 'app'>
        <h1>{{ msg }}</h1>
        <router-link to="/recorder">Go to recorder</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to My Recorder App'
            }
        }
    }
</script>