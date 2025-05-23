<script setup lang="ts">
  import {ref,type Ref} from "vue"
  import Nav from "./Components/Nav.vue";
  import Body from "./Components/Body.vue";
  import { useRouter } from "vue-router";

  let InputValue:Ref<string> = ref("");
  let SortByValue = ref(0);

  let InputChange = function(SearchInput:string,SortBy:number){
    InputValue.value = SearchInput;
    SortByValue.value = SortBy;
  }

  type PokemonEntry = {
    id: number;
    name: string;
  };

  const router = useRouter();

  let redirect = function(pokemon:PokemonEntry){
    router.push(`/details/${pokemon.id}`)
    console.log(pokemon);
  }
</script>

<template>
  <div class="title">
    <img class="logo" src="@/assets/pokeball.svg">
    <h1>Pokédex</h1>
  </div>
  <Nav @InputChange="InputChange"></Nav>
  <Body :SortByValue="SortByValue" :InputValue="InputValue" @redirect="redirect"></Body>
</template>

<style scoped>
  .title{
    width: 100%;
    padding-left: 5%;
    display: flex;
  }
  h1,.logo{
    margin: 10px;
    color: white;
    font-size: 25px;
    font-family: "Poppins", sans-serif;
  }
</style>
