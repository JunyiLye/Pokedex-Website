<script setup lang="ts">
    import {ref ,onMounted, watch} from 'vue';
    import { useRouter } from "vue-router";

    const router = useRouter();

    const props = defineProps<{
        id: string
    }>()

    let data:any = ref(null);
    let data2:any = ref(null);

    let CapitalizedName = function(name:string):string{
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    let fetchData = async function(){
        data.value = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)).json();
        data2.value = await (await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`)).json()
        console.log("hi")
    }

    onMounted(fetchData);

    let redirect = function(){
        router.push("/")
    }
    let next = function(i:number){
        data.value = null;
        data2.value = null;
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
</script>

<template>
    <div class="body" v-if="data && data2">
        <div class="pokemonlogo"><img src="@/assets/pokeball.svg" ></div>
        <div class="flex">
            <div class="back_to_home_but" @click="redirect"><img src="@/assets/back-to-home.svg"></div>
            <div class="name">{{ CapitalizedName(data.name) }}</div>
            <div class="id">#{{ props.id.padStart(3, '0') }}</div>
        </div>
        <div class="flex">
            <div class="nextbut" @click="next(0)"><img src="@/assets/chevron_left.svg"></div>
            <div class="play"><img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`"></div>
            <div class="nextbut" @click="next(1)"><img src="@/assets/chevron_right.svg"></div>
        </div>
        <div class="flex-horizontal">
            <div class="types">
                <div class="type" v-for="i in data.types">{{ CapitalizedName(i.type.name) }}</div>
            </div>
            <div class="about">About</div>
            <div class="details_wrapper">
                <div class="details_wrap">
                    <div class="details">{{ data.weight/10 }}kg</div>
                    <div class="details">{{ data.height/10 }}m</div>
                    <div class="ability">
                        <div v-for="i in data.abilities">{{ i.ability.name }}</div>
                    </div>
                </div>
                <div class="details_wrap">
                    <div class="details">Weight</div>
                    <div class="details">Height</div>
                    <div class="ability">Ability</div>
                </div>
            </div>
            <div class="text_entries">{{ data2.flavor_text_entries[0].flavor_text.replace(/[\n\f\r\u000c]/g, ' ') }}</div>
            <div class="base_stats">Base Stats</div>
            <div>hp:{{ data.stats[0].base_stat }}</div>
            <div>atk:{{ data.stats[1].base_stat }}</div>
            <div>def:{{ data.stats[2].base_stat }}</div>
            <div>satk:{{ data.stats[3].base_stat }}</div>
            <div>sdef:{{ data.stats[4].base_stat }}</div>
            <div>spd:{{ data.stats[5].base_stat }}</div>
        </div>
    </div>
</template>

<style scoped>
    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
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
    .flex{
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
    }
    .name{
        margin: 10px;
        color: White;
        font-weight: bolder;
        font-size: 30px;
        text-align: center;
    }
    .id{
        margin: 10px;
        text-align: center;
        color: white;
        font-weight: bolder;
    }
    .flex-horizontal{
        display: flex;
        flex-direction: column;
        text-align: center;
        background-color: white;
        width: 493px;
        height: 600px;
        border-radius: 10px;
    }
    .play{
        position: relative;
    }
    .play img{
        width: 200px;
        height: 200px;
        
    }
    .nextbut img{
        filter: brightness(0) grayscale(1) invert(1);
        cursor: pointer;
    }
    .types{
        display: flex;
        justify-content: center;
        margin: 10px 0px;
    }
    .type{
        border-radius: 50px;
        width: fit-content;
        padding: 2px 10px;
        margin: 5px;
        background-color: green;
        color: white;
        font-weight: bold;
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
    }
    .details{
        width: 30%;
        border-right: solid lightgray 1px;
    }
    .ability{
        width: 30%;
        display: flex;
        flex-direction: column;
    }
    .text_entries{
        font-size: 10px;
        margin: 10px 0px;
    }
    .about,.base_stats{
        font-weight: bolder;
        margin: 10px 0px;
    }
</style>