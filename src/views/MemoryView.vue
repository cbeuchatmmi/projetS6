<script setup>
import Game from '@/components/GameMemory/Game.vue'
import ListeScore from '@/components/GameMemory/ListeScore.vue';
</script>

<template>
    <div class="game">
        <Game />
        <div class="game__right">
            <div class="game__right--rules">
                <h2 class="game__right--rules--title">Règles</h2>
                <p class="game__right--rules--paragraph">Mémoriser les chiffres et cliquez sur les boutons dans l'ordre
                    croissant </p>
            </div>
            <ListeScore />
        </div>
    </div>
</template>

<style lang="scss"scoped>
.game {
    display: grid;
    grid-template-columns: 50% 50%;
    background-color: #222222;

    &__right {
        display: flex;
        flex-direction: column;
        align-items: center;

        &--rules {
            margin-bottom: 3rem;

            &--title {
                font-size: 24px;
                color: #FFB800;
            }

            &--paragraph {
                font-size: 16px;
                color: white;
            }
        }
    }
}
</style>
