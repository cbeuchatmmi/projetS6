<script setup>
import { ref } from 'vue'
import MyConnexion from '@/components/MyConnexion.vue';
import AddUser from '@/components/AddUser.vue';

// Variables réactives pour gérer l'état des divs
const showConnexion = ref(true)
const showAddUser = ref(false)

// Fonction pour afficher la div MyConnexion
const showConnexionDiv = () => {
    showConnexion.value = true
    showAddUser.value = false
}

// Fonction pour afficher la div AddUser
const showAddUserDiv = () => {
    showConnexion.value = false
    showAddUser.value = true
}
</script>

<template>
    <div>
        <!-- Div MyConnexion -->
        <div v-if="showConnexion" class="content">
            <MyConnexion />
            <button @click="showAddUserDiv" class="content__button">Je souhaite créer un compte</button>
        </div>

        <!-- Div AddUser -->
        <div v-if="showAddUser" class="content">
            <AddUser />
            <button @click="showConnexionDiv" class="content__button">Je souhaite me connecter </button>
        </div>
    </div>
</template>

<style lang="scss">
.content {
    text-align: center;

    &__button {
        margin-top: 16px;
        background-color: #222222;
        border: none;
        color: white;

        &:hover {
            color: #ffb800;
        }
    }
}
</style>
