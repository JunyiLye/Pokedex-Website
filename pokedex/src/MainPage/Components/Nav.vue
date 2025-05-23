<script setup lang="ts">
    import {ref, type Ref, watch} from "vue"
    let emit = defineEmits(["InputChange"])
    let searchInput:Ref<string> =ref("")
    let searchOption:Ref<string> = ref("Close")
    let SortBy:Ref<number> = ref(0);
    let clearSearchInput = function():void{
        searchInput.value = ""
    }
    watch([searchInput,SortBy], ([newVal,newSortBy]) => {
        emit('InputChange', newVal, newSortBy)
    })
    
    let ToggleSearchOption = function():void{
        if(searchOption.value==="Close"){searchOption.value = "Open";}
        else{searchOption.value = "Close";}
    }
</script>

<template>
    <nav>
        <div class="searchBox">
            <img src="@/assets/search.svg">
            <input type="text" placeholder="Search" v-model="searchInput" >
            <img class="clearBtn" v-if="searchInput!==''" @click="clearSearchInput" src="@/assets/cross.svg">
        </div>
        <div class="searchCategory" @click="ToggleSearchOption">
            <img class="sorting" src="@/assets/sorting.svg">
        </div>
        <div :class="searchOption">
            <div class="SortBy">Sort By:</div>
            <div class="Selections">
                <div class="Selection"><input type="radio" name="searchOption" :value="0" checked v-model="SortBy"><label>Name</label></div>
                <div class="Selection"><input type="radio" name="searchOption" :value="1" v-model="SortBy"><label>ID</label></div>   
            </div>
        </div>
    </nav>
</template>

<style scoped>
    input{
        background-color: transparent;
        border:none;
        width: 80%;
        height: 30px;
        font-size: 13px;
    }
    input:focus{
        outline: none;
    }
    nav{
        display:flex;
        justify-content: center;
    }
    .searchBox{
        background-color: white;
        border-radius: 50px;
        display:flex;
        padding: 2px 15px;
        border:inset gray;
        box-shadow: inset 4px ;
        width:80%;
        justify-content: center;
        gap: 10px;
    }
    .searchCategory{
        width: 38px;
        background-color: white;
        margin: 0% 1%;
        border-radius: 40px;
        border:inset gray;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .sorting{
        width: 20px;
    }
    .clearBtn{
        cursor: pointer;
    }
    .Close{
        overflow: hidden;
        border: none;
        width: 0px;
        height: 0px;
    }
    .Open{
        position: absolute;
        right: 7%;
        background-color: #dc0a2d;
        width: 150px;
        height: 160px;
        margin: 50px 0px;
        border: inset 3px lightgray;
        border-radius: 20px 0px;
    }
    .SortBy{
        height: 10%;
        text-align: center;
        color: white;
        font-weight: bold;
        padding: 15px;
    }
    .Selections{
        background-color: white;
        height: 60%;
        display: flex;
        flex-direction: column;
        margin: 5%;
        border-radius: inherit;
        justify-content: center;
    }
    .Selection{
        padding-left: 10%;
        display: flex;
        justify-items: center;
    }
    .Selection label{
        padding: 10px;
        font-family: inherit;
    }
    .Selection input{
        width: 12px;
    }

</style>