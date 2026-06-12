// Banco de dados de perguntas e lógica de pontuação
const quizData = [
    {
        question: "Como é feita a irrigação ou gestão de água na sua propriedade?",
        options: [
            { text: "Visualmente, ligo o pivô/aspersor quando o solo parece seco.", score: 1 },
            { text: "Sigo um calendário fixo baseado na época do ano.", score: 2 },
            { text: "Uso sensores de umidade no solo ou dados meteorológicos.", score: 3 }
        ]
    },
    {
        question: "Qual ferramenta você mais usa para gerenciar as finanças e o estoque?",
        options: [
            { text: "Caderno de anotações ou quase tudo de cabeça.", score: 1 },
            { text: "Planilhas eletrônicas no computador (Excel).", score: 2 },
            { text: "Aplicativos ou softwares de gestão agrícola específicos.", score: 3 }
        ]
    },
    {
        question: "Como você lida com a aplicação de defensivos e fertilizantes?",
        options: [
            { text: "Aplico a mesma quantidade de forma uniforme em todo o talhão.", score: 1 },
            { text: "Faço análise de solo a cada poucos anos para ajustar a média.", score: 2 },
            { text: "Uso mapas de aplicação em taxa variável baseados em drones ou satélites.", score: 3 }
        ]
    }
];

// Mapeamento de elementos HTML
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const resultText = document.getElementById('result-text');

let currentQuestionIndex = 0;
let totalScore = 0;

// Eventos de início e reinício
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = '';

    // Atualiza a barra de progresso
    const progress = ((currentQuestionIndex) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Cria os botões das alternativas
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-card');
        button.addEventListener('click', () => selectOption(option.score));
        optionsContainer.appendChild(button);
    });
}

function selectOption(score) {
    totalScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    progressBar.style.width = '100%';
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    // Lógica para definir o perfil com base nos pontos somados
    if (totalScore <= 4) {
        resultText.innerText = "Perfil: Agro Tradicional. Sua propriedade foca nos métodos clássicos de manejo. Há uma grande oportunidade de começar a introduzir pequenas ferramentas digitais gratuitas para aumentar suas margens de lucro.";
    } else if (totalScore <= 7) {
        resultText.innerText = "Perfil: Agro em Transição. Você já utiliza tecnologias essenciais (como planilhas ou análises básicas) para otimizar o dia a dia. O próximo passo é integrar os dados para tomar decisões ainda mais rápidas.";
    } else {
        resultText.innerText = "Perfil: Agro Tecnológico (Agro 4.0). Parabéns! Você utiliza ferramentas de precisão, dados em tempo real e busca o máximo de eficiência e sustentabilidade no campo. Continue liderando a inovação.";
    }
}
