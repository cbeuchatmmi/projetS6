<script setup>
import { ref } from 'vue';
import axios from 'axios';

const user = ref({
    user_name: '',
    user_mdp: '',
});

const message = ref('');

// Fonction pour vérifier si le nom d'utilisateur existe déjà
const checkUsernameExists = async (username) => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user/exists/' + username);
        return response.data.exists;
    } catch (error) {
        console.error('Erreur lors de la vérification du nom d\'utilisateur:', error.response.data.error);
        return false;
    }
};

// Fonction pour ajouter un utilisateur
const addUser = async () => {
    try {
        // Vérifie d'abord si le nom d'utilisateur existe déjà
        const exists = await checkUsernameExists(user.value.user_name);
        if (exists) {
            message.value = 'Nom d\'utilisateur déjà utilisé';
            return;
        }

        // Si le nom d'utilisateur n'existe pas déjà, ajoute l'utilisateur
        const response = await axios.post(import.meta.env.VITE_API_URL + '/user/add', user.value);
        // Réinitialiser le formulaire ou rediriger l'utilisateur
        user.value = { user_name: '', user_mdp: '' };
        message.value = 'Utilisateur créé !';
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.response.data.error);
        message.value = 'Erreur lors de l\'ajout de l\'utilisateur';
    }
};
</script>
<template>
    <div class="user">
        <h2 class="user__title">Créer un compte</h2>
        <form class="user__form" @submit.prevent="addUser">
            <div class="user__form">
                <label for="user__name" class="user__form--label">Pseudo :</label>
                <input id="user__name" class="user__form--input" v-model="user.user_name" type="text" required>
            </div>
            <div class="user__form">
                <label for="user__mdp" class="user__form--label">Mot de passe :</label>
                <input id="user__mdp" class="user__form--input" v-model="user.user_mdp" type="password" required>
            </div>
            <button class="user__button" type="submit">Ajouter Utilisateur</button>
            <p v-if="message" class="user__message">{{ message }}</p>
        </form>
    </div>
</template>
  
  
<style lang="scss" scoped>
.user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;



    &__title {
        font-size: 28px;
        color: #FFB800;
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        color: #FFB800;


        &--label {
            margin-top: 16px;
            margin-bottom: 16px;

        }

        &--input {
            padding: 16px;
            width: 256px;
            border: none;

            border-radius: 16px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        margin-top: 16px;
        margin-bottom: 16px;
    }

    &__button {
        border: none;
        border-left: 3px solid #FFB800;
        border-right: 3px solid #FFB800;
        border-radius: 30px;
        background-color: #222222;
        color: white;
        font-size: 20px;
        padding: 10px;
        margin-top: 16px;
    }
}
</style>
  