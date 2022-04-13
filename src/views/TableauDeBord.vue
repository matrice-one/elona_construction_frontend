<template>
    <div class="tableau-de-bord">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Tableau de bord</h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>

            <hr>


        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'TableauDeBord',
    components: {

    },
    data() {
        return {
            orders: []
        }
    },
    mounted() {
        document.title = 'Tableau de bord | Elona Construction'

    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")
            this.$store.commit('removeToken')
            this.$router.push('/')
        },

    }
}
</script>