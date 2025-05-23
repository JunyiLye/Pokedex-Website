<script setup lang="ts">
    import {ref, type Ref, computed, onMounted} from 'vue';
    const props = defineProps<{
        SortByValue:number;
        InputValue:string;
    }>()
    let emit = defineEmits(["redirect"])
    const MaxPokemon:number = 151;
    let name: Ref<string[]> = ref([]);
    onMounted(async function(){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MaxPokemon}`)
        let data = await response.json();
        for(let i=0;i<data.results.length;i++){
            name.value[i] = data.results[i].name;
        }
    })

    type PokemonEntry = {
        id: number;
        name: string;
    };

    let filteredPokemon = computed<PokemonEntry[]>(() => {
        console.log(props.InputValue)
        return name.value
            .map((n, i) => ({ id: i + 1, name: n }))
            .filter(pokemon => {
            if (props.SortByValue === 0) {
                return pokemon.name.toLowerCase().startsWith(props.InputValue.toLowerCase());
            } else {
                // Filter by ID (as string)
                return String(pokemon.id).startsWith(props.InputValue);
            }
            });
    });

    let CapitalizedName = function(name:string):string{
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    let PokemonDetails = function(pokemon:PokemonEntry){
        emit("redirect",pokemon);
    }
</script>
<template>
    <div class="Body">
        <div class="pokemon" v-for="pokemon in filteredPokemon" @click="PokemonDetails(pokemon)">
            <div class="pokemonId">#{{ pokemon.id }}</div>
            <div class="pokemonImg"><img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"></div>
            <div class="pokemonName">{{ CapitalizedName(pokemon.name) }}</div>
        </div>
    </div>
</template>
<style scoped>
    .Body{
        margin:10px 0px;
        width:100%;
        height: 600px;
        background-color: white;
        border-radius: 10px;
        flex-wrap: wrap;
        display: flex;
        justify-content: center;
        overflow-y: scroll;
    }
    .pokemon{
        margin: 10px;
        border:inset 5px;
        border-radius: 25px;
        height: 170px;
        width: 130px;
        flex-direction: column;
        cursor: pointer;
    }
    .pokemonId{
        height: 5%;
        text-align: right;
        padding: 5px 10px;
        background-color: lightgray;
        border-radius: 20px 20px 0px 0px;
        font-size: small;
        color:black;
        font-weight: bold;
        font-family: "Poppins", sans-serif;
        font-style: oblique;
    }
    .pokemonImg{
        width:auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60%;
        background-color: lightgray;
        border: none;
        border-radius:0px 0px 20px;
    }
    .pokemonName{
        text-align: center;
        height:30%;
        padding: auto 0px;
    }
    img{
        height:100px;
        width:80px;
    }
</style>