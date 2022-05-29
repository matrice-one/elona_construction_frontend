<template>
    <div class="tableau-de-bord">
        <div class="columns is-multiline is-centered">
            <div class="column is-9 py-6">
                <div class="content p-6">
                    <h1 class="title">Tableau de bord</h1>
                    <p class="my-6">Vous êtes connecté avec l'email: </p>
                    <button @click="logout()" class="button is-danger">Log out</button>
                </div>
                
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