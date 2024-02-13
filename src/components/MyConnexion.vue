<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Client axios global
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Stocke l'id de l'utilisateur connecté et le token comme références réactives
const userId = ref(null);
const userToken = ref(null);

// Exécuté uniquement côté client, après le montage du composant
onMounted(() => {
    userId.value = localStorage.getItem('userId') || null;
    userToken.value = localStorage.getItem('userToken') || null;
});

// Informations de connexion
const loginData = ref({
    user_name: '',
    user_mdp: '',
});

// Fonction de connexion
const login = async () => {
    try {
        const response = await client.post('/login', loginData.value);

        // Met à jour et stocke l'identifiant utilisateur et le token dans le localStorage
        userId.value = response.data.user.user_id;
        userToken.value = response.data.token; // Assurez-vous que la réponse contient un token
        if (typeof window !== 'undefined') {
            localStorage.setItem('userId', userId.value);
            localStorage.setItem('userToken', userToken.value);
        }

        console.log('Connecté avec succès', response.data);
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
    }
};

// Fonction de déconnexion
const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
    }
    userId.value = null;
    userToken.value = null;
    console.log('Déconnecté avec succès');
};
</script>


<template>
    <div class="connexion">
        <h2 class="connexion__title">Se Connecter</h2>
        <form class="connexion__form" @submit.prevent="login">
            <label class="connexion__form--label" for="user_name">Pseudo:</label>
            <input class="connexion__form--input" v-model="loginData.user_name" required>

            <label class="connexion__form--label" for="user_mdp">Mot de passe:</label>
            <input class="connexion__form--input" v-model="loginData.user_mdp" type="password" required>

            <p class="connexion__form--content" v-if="userId">Utilisateur connecté!
                <button class="connexion__form--button" @click="logout">Se déconnecter</button>
            </p>
            <p class="connexion__form--content" v-else>Veuillez vous connecter.
                <button class="connexion__form--button" type="submit">Se connecter</button>
            </p>
        </form>
    </div>
</template>
<style lang="scss" scoped>
.connexion {
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

    &__form {


        &--content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-items: center;
            margin-top: 16px;
            margin-bottom: 16px;
        }

        &--button {
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
}
</style>
