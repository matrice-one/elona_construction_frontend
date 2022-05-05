
<template>


<form class="faireChoix" @submit.prevent="onSubmit">
<div class="select">
    <select id="champ" v-model="champ" >
        <option
        v-for="(selection, $selectionIndex) of reference.profiles[0].selections"
        :key="$selectionIndex"
        :value="selection"
        >
        {{ selection.name }}
        </option>

    </select>
<input type="button" value="Ajouter au profil" class="button is-dark mt-2 mb-4" @click="onSubmit()" >
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
        reference: {
            type:Object,
            required:true,
        }
    },

methods:{
onSubmit(){
    if (this.champ === ''){
        return
    }

    let choixChamp = {
        champ: this.champ,

}
this.$emit('choix-submitted', this.champ)

this.champ=''


}
},

}







</script>