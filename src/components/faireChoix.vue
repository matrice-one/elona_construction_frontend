
<template>
<form class="faireChoix" @submit.prevent="onSubmit">
<div class="select">
    <select id="champ" v-model="champ" >
        <option
        v-for="(selection, $selection) of choix.profiles[0].selections"
        :key="$selection"
        :value="selection.name"
        >
        {{ selection.name }}
        </option>
        <option> TEST</option>

    </select>
<input type="button" value="Ajouter au profil" class="button is-dark my-1" @click="onSubmit" >
</div>
</form>
</template>

<script>

export default {
    name: 'faireChoix',
    data(){
        return{
    champ:'',

    }
 },
    props: {
        choix: {
            type:Object,
            required:true,
        }
    },

methods:{
onSubmit(){
    let choixChamp = {
        champ: this.champ,

}
this.$emit('choix-submitted', choixChamp)

this.champ=''


}
},

}






</script>