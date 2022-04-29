<template>
<div>
    <div class="control">
        <button class="button is-medium is-primary is-rounded mb-2">Profile 1</button>
    </div>
<ul>
    <li v-for="(choixselected, index) in choixselected" :key="index" >
              <div class="control">
                <button class="button is-primary is-light is-rounded my-1">{{ choixselected.champ }}</button>
              </div>

    </li>
</ul>
    <div class="control">
        <button class="button is-primary is-rounded my-1">Sauvegarder</button>
    </div>


</div>
</template>

<script>

export default {
    name: 'displayChoix',
    props: {
        choixselected: {
            type:Array,
            required:true,
        }
    },
 

methods:{


},

}






</script>