<script setup lang="ts">
    import {ref ,onMounted, watch} from 'vue';
    import { useRouter } from "vue-router";

    const router = useRouter();

    const props = defineProps<{
        id: string
    }>()

    const Color:any={
        grass   : "rgb(120, 200, 80)",
        fire    : "rgb(240, 128, 48)",
        water   : "rgb(104, 144, 240)",
        bug     : "rgb(168, 184, 32)",
        normal  : "rgb(168, 168, 120)",
        poison  : "rgb(160, 64, 160)",
        electric: "rgb(248, 208, 48)",
        ground  : "rgb(224, 192, 104)",
        fairy   : "rgb(238, 153, 172)",
        fighting: "rgb(192, 48, 40)",
        psychic : "rgb(248, 88, 136)",
        rock    : "rgb(184, 160, 56)",
        ghost   : "rgb(112, 88, 152)",
        ice     : "rgb(152, 216, 216)",
        dragon  : "rgb(112, 56, 248)"
    }

    let pokemonDetails:any = ref(null);
    let flavorText:any = ref(null);

    let fetchData = async function(){
        pokemonDetails.value = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)).json();
        flavorText.value = await (await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`)).json()
    }

    onMounted(fetchData);

    let goHome = function(){
        router.push("/")
    }

    let next = function(i:number){
        pokemonDetails.value = null;
        flavorText.value = null;
        if(i===0){
            if(props.id==='1'){
                router.push(`/details/151`)
            }
            else{
                router.push(`/details/${parseInt(props.id)-1}`)
            }
        }
        else{
            if(props.id==='151'){
                router.push("/details/1")
            }
            else{
                router.push(`/details/${parseInt(props.id)+1}`)
            }
        }
    }

    watch(()=>props.id,async()=>{
        await fetchData();
    });
    
    let CapitalizedName = function(name:string):string{
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    let getEnglishText = function(obj:any){
        for(let i of obj){
            if(i.language.name === "en"){
                return i.flavor_text.replace(/[\n\f\r\u000c]/g, ' ');
            }
        }
    }
</script>

<template>
    <div class="body" :style="{'--color': Color[pokemonDetails.types[0].type.name]}" v-if="pokemonDetails && flavorText">
        <div class="pokemonlogo"><img src="@/assets/pokeball.svg" ></div>
        <div class="NameWrapper">
            <div class="back_to_home_but" @click="goHome"><img src="@/assets/back-to-home.svg"></div>
            <div class="name">{{ CapitalizedName(pokemonDetails.name) }}</div>
            <div class="id">#{{ props.id.padStart(3, '0') }}</div>
        </div>
        <div class="NavigationWrapper">
            <div class="nextbut" @click="next(0)"><img src="@/assets/chevron_left.svg"></div>
            <div class="PokemonImg"><img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`"></div>
            <div class="nextbut" @click="next(1)"><img src="@/assets/chevron_right.svg"></div>
        </div>
        <div class="PokemonDetails">
            <div class="types">
                <div class="type" v-for="i in pokemonDetails.types">{{ CapitalizedName(i.type.name) }}</div>
            </div>
            <div class="about">About</div>
            <div class="details_wrapper">
                <div class="details_wrap">
                    <div class="details"><img src="@/assets/weight.svg">{{ pokemonDetails.weight/10 }}kg</div>
                    <div class="details"><img src="@/assets/height.svg">{{ pokemonDetails.height/10 }}m</div>
                    <div class="abilities">
                        <div class="ability" v-for="i in pokemonDetails.abilities">{{ CapitalizedName(i.ability.name) }}</div>
                    </div>
                </div>
                <div class="details_wrap">
                    <div class="details_title">Weight</div>
                    <div class="details_title">Height</div>
                    <div class="ability_title">Move</div>
                </div>
            </div>
            <div class="text_entries">{{ getEnglishText(flavorText.flavor_text_entries) }}</div>
            <div class="base_stats">Base Stats</div>
            <div class="stats" >
                <div class="stat">
                    <div class="stat_name">HP</div>
                    <div class="stat_value">{{ String(pokemonDetails.stats[0].base_stat).padStart(3, '0') }}</div>
                    <progress :value="pokemonDetails.stats[0].base_stat" max="100"></progress>
                </div>
                <div class="stat">
                    <div class="stat_name">ATK</div>
                    <div class="stat_value">{{ String(pokemonDetails.stats[1].base_stat).padStart(3, '0') }}</div>
                    <progress :value="pokemonDetails.stats[1].base_stat" max="100"></progress>
                </div>
                <div class="stat">
                    <div class="stat_name">DEF</div>
                    <div class="stat_value">{{ String(pokemonDetails.stats[2].base_stat).padStart(3, '0') }}</div>
                    <progress :value="pokemonDetails.stats[2].base_stat" max="100"></progress>
                </div>
                <div class="stat">
                    <div class="stat_name">SATK</div>
                    <div class="stat_value">{{ String(pokemonDetails.stats[3].base_stat).padStart(3, '0') }}</div>
                    <progress :value="pokemonDetails.stats[3].base_stat" max="100"></progress>
                </div>
                <div class="stat">
                    <div class="stat_name">SDEF</div>
                    <div class="stat_value">{{ String(pokemonDetails.stats[4].base_stat).padStart(3, '0') }}</div>
                    <progress :value="pokemonDetails.stats[4].base_stat" max="100"></progress>
                </div>
                <div class="stat">
                    <div class="stat_name">SPD</div>
                    <div class="stat_value">{{ String(pokemonDetails.stats[5].base_stat).padStart(3, '0') }}</div>
                    <progress :value="pokemonDetails.stats[5].base_stat" max="100"></progress>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "Poppins", sans-serif;
        height: 100vh;
        background-color: var(--color);
    }
    .pokemonlogo{
        position: absolute;
        right: 0px;
        width: 200px;
    }
    .pokemonlogo img{
        width: 200px;
        opacity: 0.1;
    }
    .NameWrapper{
        width: 240px;
        display: flex;
        justify-content: center;
        margin: 20px 0px;
        align-items: center;
    }
    .back_to_home_but{
        display: flex;
        justify-content: center;
        margin: 10px;
        cursor: pointer;
        width: 20%;
    }
    .name{
        margin: 10px;
        color: White;
        font-weight: bolder;
        transform: scaleX(1.1);
        font-size: 23px;
        text-align: center;
        width: 60%;
    }
    .id{
        margin: 10px;
        text-align: center;
        color: white;
        font-weight:bolder;
        transform: scaleX(1.1);
        font-size: 12px;
        width: 20%;
    }
    .NavigationWrapper{
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .PokemonImg{
        position: relative;
        width: 200px;
        height: 180px;
    }
    .PokemonImg img{
        top: 20px;
        position: absolute;
        width: 200px;
        height: 200px;
        
    }
    .nextbut img{
        filter: brightness(0) grayscale(1) invert(1);
        cursor: pointer;
    }
    .PokemonDetails{
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: white;
        width: 480px;
        height: 500px;
        border-radius: 10px;
        padding: 56px 20px 20px 20px;
        border: solid 2px white;
        box-shadow: 0px 0px 10px darkgray;
    }
    .types{
        display: flex;
        justify-content: center;
        margin: 10px 0px;
    }
    .type{
        border-radius: 50px;
        width: fit-content;
        padding: 4px 8px;
        margin: 5px;
        color: white;
        font-weight: bolder;
        transform: scaleX(1.1);
        font-size: 9.5px;
        background-color: var(--color);
    }
    .about,.base_stats{
        font-weight: bolder;
        transform: scaleX(1.1);
        margin: 5px 0px;
        font-size: 12px;
    }
    .details_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 10px 0px;
    }
    .details_wrap{
        display: flex;
        justify-content: center;
        align-items: end;
    }
    .details{
        width: 33%;
        height: fit-content;
        border-right: solid lightgray 1px;
        padding: 10px 0px;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .details img{
        padding: 0px 5px;
    }
    .details_title{
        width: 33%;
        padding: 15px 0px;
        font-size: 9px;
        height: fit-content;
        border-right: solid lightgray 1px;
        color: gray;
    }
    .abilities{
        width: 33%;
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
    }
    .ability{
        padding-top: 15px;
        font-size: 10px;
    }
    .ability_title{
        width: 33%;
        padding: 15px 0px;
        font-size: 9px;
        color: gray;
    }
    .text_entries{
        font-size: 10px;
        transform: scaleX(1.1);
        margin: 0px 0px 20px 0px;
    }
    .stat{
        display: flex;
        justify-content: center;
        margin: 28px 0px;
    }
    .stat_name{
        border-right: solid 1px lightgray;
        width: 10%;
        font-size: 9px;
        font-weight: 800;
        color: var(--color);
    }
    .stat_value{
        width: 10%;
        font-size: 10px;
    }
    progress {
        appearance: none;
        width: 400px;
        height: 4px;
    }
    progress::-webkit-progress-bar {
        background-color: color-mix(in srgb, var(--color) 25%, white);
        border-radius: 20px;
        overflow: hidden;
    }
    progress::-webkit-progress-value {
        background-color: var(--color);
        border-radius: 20px;
    }
    progress::-moz-progress-bar {
        background-color: var(--color);
        border-radius: 20px;
    }
</style>