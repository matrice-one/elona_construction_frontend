<template>
    <div class="page-sign-up">
        <div class="columns my-6">
            <div class="column is-4 is-offset-4 my-6">
                <h1 class="title">Inscription</h1>
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Email</label>
                        <div class="control">
                            <input type="email" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Mot de passe</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>
                    <div class="field">
                        <label>Répetez le mot de passe</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password2">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error"> {{ error }} </p>
                    </div>
                     <div class="field">

                        <div class="control">
                            <button class="button is-dark">S'inscrire</button>
                        </div>
                    </div>

                    <hr>

                    Ou <router-link to="/log-in">cliquez ici </router-link> pour vous connecter!


                </form>


            </div>

        </div>

    </div>

</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'SignUp',
    data(){
        return{
            username: '',
            password: '',
            password2:'',
            errors:[],
        }
    },
    methods:{
        submitForm(){
            this.errors = []

            if (this.username === ''){
                this.errors.push('The username is missing')
            }

            if (this.password === ''){
                this.errors.push('The password is missing')
            }

            if (this.password !== this.password2){
                this.errors.push("The password doesn't match")
            }

            if (!this.errors.length){
                const formData = {
                    username: this.username,
                    password: this.password
                }

               axios
                   .post("api/v1/users/", formData)
                   .then(reponse => {
                    toast({
                        message: 'Account created, please log in!',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })

                    this.$router.push('/log-in')

                   })
                   .catch(error => {
                       if (error.response) {
                           for (const property in error.response.data ){
                               this.errors.push(`${property}: ${error.response.data[property]}`)
                           }

                           console.log(JSON.stringify(error.response.data))
                       }
                       else if (error.message){
                           this.errors.push('Something went wrong. Please try again.' )
                           console.log(JSON.stringify(error))
                       }

                   })
            }

        }
    },
}
</script>