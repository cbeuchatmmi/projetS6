<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const scores = ref([]);

const getScore = async () => {
    try {
        const response = await client.get(`/score`);
        const allScores = response.data.games;
        scores.value = allScores
            .filter(score => score.level_id === 3)
            // Tri décroissant basé sur score_time en tant que nombre
            .sort((a, b) => b.score_time - a.score_time);
    } catch (error) {
        console.error('Erreur lors de la récupération des scores :', error.message);
    }
};

onMounted(() => {
    getScore();
});
</script>


<template>
    <div class="liste">
        <h2 class="liste__title">Record</h2>
        <table v-if="scores.length" class="liste__table">
            <thead class="liste__thead">
                <tr class="liste__thead--tr">
                    <th class="liste__thead--th"></th>
                    <th class="liste__thead--th">Name</th>
                    <th class="liste__thead--th">Score</th>
                </tr>
            </thead>
            <tbody class="liste__tbody">
                <tr class="liste__tbody--tr" v-for="(score, index) in scores.slice(0, 20)" :key="score.score_id">
                    <td class="liste__tbody--td">{{ index + 1 }}</td>
                    <td class="liste__tbody--td">{{ score.user_name }}</td>
                    <td class="liste__tbody--td">{{ score.score_time }}</td>
                </tr>

            </tbody>

        </table>
        <div v-else>
            Chargement des scores...
        </div>

    </div>
</template>




<style lang="scss" scoped>
.liste {
    display: flex;
    flex-direction: column;
    text-align: center;

    border-left: 3px solid #FFB800;
    border-right: 3px solid #FFB800;
    border-radius: 30px;
    width: 75%;
    margin: auto;

    background-color: #222222;

    &__title {
        font-size: 28px;
        color: #FFB800;
    }

    &__table {
        color: white;
    }

    &__thead {

        &--tr {}

        &--th {
            color: #FFB800;
        }
    }

    &__tbody {
        &--tr {}

        &--td {}
    }
}
</style>
  