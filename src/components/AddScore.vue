<template>
    <div class="add-score">
        <h2>Ajouter un nouveau score</h2>
        <form @submit.prevent="addScore">
            <div>
                <label for="score_time">Temps du score :</label>
                <input id="score_time" v-model="score.score_time" type="text" required>
            </div>
            <div>
                <label for="level_id">ID du niveau :</label>
                <input id="level_id" v-model="score.level_id" type="text" required>
            </div>
            <button type="submit">Ajouter Score</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userId = ref(); // Utilisez ref() pour userId

const score = ref({
    score_time: '',
    user_id: userId.value,
    level_id: ''
});
const message = ref('');

const addScore = async () => {
    score.value.user_id = userId.value;
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/score/add', score.value);
        message.value = 'Score ajouté avec succès!';
        // Réinitialiser le formulaire ou rediriger l'utilisateur si nécessaire
        score.value = { score_time: '', user_id: userId.value, level_id: '' }; // Utilise userId.value pour user_id
        console.log('userId', userId.value); // Utilisez userId.value pour accéder à la valeur
    } catch (error) {
        message.value = 'Erreur lors de l\'ajout du score : ' + error.response.data.error;
    }
};
onMounted(() => {
    // Vérifier si `localStorage` est disponible (côté client)
    if (typeof localStorage !== 'undefined') {
        // Accéder à `localStorage` uniquement si disponible
        userId.value = localStorage.getItem('userId') || null;
    } else {
        console.error('localStorage is not available in this environment.');
    }
});
</script>

  
<style scoped>
/* Vos styles CSS ici */
</style>
