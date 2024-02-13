<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


var roundCounter = ref(0);
var sequence = ref([]);
var displayedSequence = ref([]);
var displayedIndices = ref([]);
var showStartButton = ref(true);
var showLoose = ref(false);
var phase = ref(null);

function hideStartButton() {
    document.getElementById('startButton').classList.add('hidden'); // Cacher le bouton de démarrage lorsqu'il est cliqué
    startTest(); // Commencez le test une fois le bouton de démarrage cliqué
}

function startTest() {
    showStartButton.value = false;
    showLoose.value = false;
    roundCounter.value++; // Incrémenter le compteur de manches
    document.getElementById('roundsCounter').textContent = `Nombre de manche : ${roundCounter.value}`; // Mettre à jour le texte du paragraphe
    const numbersContainer = document.getElementById('numbersContainer');

    // Vérifier si numbersContainer est null
    if (numbersContainer === null) {
        console.error("Element 'numbersContainer' non trouvé dans le DOM.");
        return;
    }

    numbersContainer.innerHTML = ''; // Nettoie l'affichage précédent
    sequence.value = generateSequence(roundCounter.value); // Génère une nouvelle séquence avec un chiffre supplémentaire
    let shuffledSequence = shuffleArray([...sequence.value]); // Mélange la séquence

    displayNumbersAsCards(shuffledSequence, numbersContainer); // Affiche les chiffres mélangés sous forme de cartes

    setTimeout(() => {
        numbersContainer.innerHTML = ''; // Cache les chiffres après un court délai
        // Réutilise les chiffres mélangés pour créer des boutons cliquables pour la sélection de l'utilisateur
        shuffledSequence.forEach(number => {
            let button = document.createElement('button');
            button.addEventListener('click', function () { checkNumber(button, number); });
            button.style.backgroundColor = '#222222'; // Appliquer le style directement dans JavaScript
            button.style.color = '#FFB800'; // Appliquer le style directement dans JavaScript
            button.style.borderLeft = '2px'; // Appliquer le style directement dans JavaScript
            button.style.borderRight = '2px'; // Appliquer le style directement dans JavaScript
            button.style.borderRadius = '5px'; // Appliquer le style directement dans JavaScript
            button.style.borderColor = '#FFB800'; // Appliquer le style directement dans JavaScript
            button.style.padding = '20px 20px'; // Appliquer le style directement dans JavaScript
            button.style.margin = '5px'; // Appliquer le style directement dans JavaScript
            button.style.cursor = 'pointer'; // Appliquer le style directement dans JavaScript
            button.style.transition = 'background-color 0.3s ease'; // Appliquer le style directement dans JavaScript

            // Effet de survol (hover)
            button.addEventListener('mouseenter', function () {
                button.style.backgroundColor = '#FFB800';
                button.style.color = '#222222';
            });
            button.addEventListener('mouseleave', function () {
                button.style.backgroundColor = '#222222';
                button.style.color = '#FFB800';
            });

            numbersContainer.appendChild(button);
        });
    }, 3000); // Attend 3 secondes avant de cacher les chiffres
}


function generateSequence(length) {
    let numbers = [];
    for (let i = 1; i <= length; i++) {
        numbers.push(i); // Ajoute des chiffres de 1 à length à la séquence
    }
    return numbers;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
    }
    return array;
}

function displayNumbersAsCards(numbers, container) {
    numbers.forEach(number => {
        let element = document.createElement('button');
        element.textContent = number;
        element.disabled = true; // Désactive le bouton pour éviter les clics pendant cette phase
        container.appendChild(element);

        // Définir les styles directement dans JavaScript
        element.style.backgroundColor = '#222222'; // Appliquer le style directement dans JavaScript
        element.style.color = '#FFB800'; // Appliquer le style directement dans JavaScript
        element.style.borderLeft = '2px'; // Appliquer le style directement dans JavaScript
        element.style.borderRight = '2px'; // Appliquer le style directement dans JavaScript
        element.style.borderRadius = '5px'; // Appliquer le style directement dans JavaScript
        element.style.borderColor = '#FFB800'; // Appliquer le style directement dans JavaScript
        element.style.padding = '20px 20px'; // Appliquer le style directement dans JavaScript
        element.style.margin = '5px'; // Appliquer le style directement dans JavaScript
        element.style.cursor = 'pointer'; // Appliquer le style directement dans JavaScript
        element.style.transition = 'background-color 0.3s ease'; // Appliquer le style directement dans JavaScript


    });
}


let currentIndex = 0; // Suivi de l'indice du chiffre actuel à vérifier
function checkNumber(button, selectedNumber) {
    if (selectedNumber === sequence.value[currentIndex]) {
        console.log("Correct!");
        currentIndex++;
        if (currentIndex === sequence.value.length) {
            currentIndex = 0; // Réinitialise pour le prochain tour
            startTest(); // Génère une nouvelle séquence pour le prochain tour
        }
    } else {
        console.log("roundCounter", roundCounter.value)
        score.value.score_time = roundCounter.value;
        showLoose.value = true;

        addScore(); // Appel à la fonction addScore
        currentIndex = 0; // Réinitialise pour recommencer
        numbersContainer.innerHTML = ''; // Efface l'affichage
        sequence.value = generateSequence(0); // Réinitialise la longueur de la séquence à zéro
        roundCounter.value = 0; // Réinitialise le compteur de manches à zéro
        showStartButton.value = true;
    }
}



const userId = ref(); // Utilisez ref() pour userId

const score = ref({
    score_time: roundCounter.value,
    user_id: userId.value,
    level_id: '3',
});
const message = ref('');

const addScore = async () => {
    score.value.user_id = userId.value;
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/score/add', score.value);
        message.value = 'Score ajouté avec succès!';
        // Réinitialiser le formulaire ou rediriger l'utilisateur si nécessaire
        score.value = { score_time: roundCounter.value, user_id: userId.value, level_id: '3' }; // Utilise userId.value pour user_id
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
<template>
    <div id="gameContainer" class="memory">
        <h1 class="memory__title">Test de Mémoire</h1>
        <p id="roundsCounter" class="memory__paragraph">Nombre de manche : {{ roundCounter }}</p>
        <div id="numbersContainer" class="memory__liste">
            <div v-if="phase === 'displayNumbers'" class="memory__liste--display">
                <!-- <button v-for="(number, index) in displayedSequence" :key="index" disabled
                    class="memory__liste--display--button">
                    {{ number }}
                </button> -->
            </div>
            <div v-if="phase === 'guessNumbers'" class="memory__liste--display">
                <!-- <button v-for="(index, number) in displayedIndices" :key="index" @click="() => checkNumber(index)">
                </button> -->
            </div>
        </div>
        <p v-if="showLoose" class="memory__paragraph">Vous avez perdu !</p>
        <button v-if="showStartButton" @click="startTest" class="memory__start">Commencer le test</button>
    </div>
</template>
<style lang="scss" scoped>
.memory {
    background-color: #222222;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;

    &__title {
        font-size: 28px;
        color: #FFB800;
    }

    &__paragraph {
        font-size: 16px;
        color: white;
    }

    &__liste {
        &--display {}

    }

    &__start {
        border: none;
        border-left: 3px solid #FFB800;
        border-right: 3px solid #FFB800;
        border-radius: 30px;
        background-color: #222222;
        color: white;
        font-size: 20px;
        padding: 10px;
        margin-top: 10rem;
    }
}
</style>
