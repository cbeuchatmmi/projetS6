<template>
    <div>
        <div v-if="scores.length">
            <ul>
                <li v-for="score in scores" :key="score.score_id">
                    {{ score.user_name }} {{ score.score_time }}
                </li>
            </ul>
        </div>
        <div v-else>
            Chargement des scores...
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const scores = ref([]);

// Fonction pour convertir une chaîne de temps mm:ss:msms en millisecondes
const timeToMilliseconds = (timeString) => {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
};

const getScore = async () => {
    try {
        const response = await client.get(`/score`);
        const allScores = response.data.games;
        scores.value = allScores
            .filter(score => score.level_id === 2)
            .sort((a, b) =>
                timeToMilliseconds(a.score_time) - timeToMilliseconds(b.score_time)
            );
    } catch (error) {
        console.error('Erreur lors de la récupération des scores :', error.message);
    }
};

onMounted(() => {
    getScore();
});
</script>



<style lang="scss" scoped></style>
  