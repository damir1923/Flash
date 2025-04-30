const subjects = {
    math: [
        {
            question: "Чему равна длина вектора (3, 4)?",
            options: ["5", "7", "4"],
            correct: 0,
            explanation: "Длина вектора вычисляется по формуле √(x^2 + y^2). Для (3, 4) это √(3^2 + 4^2) = 5."
        },
        {
            question: "Какой вектор является коллинеарным вектору (2, 3)?",
            options: ["(4, 6)", "(3, 2)", "(1, -1)"],
            correct: 0,
            explanation: "Вектор (4, 6) является коллинеарным вектору (2, 3), так как он пропорционален ему."
        },
        {
            question: "Чему равен скалярный произведение векторов (1, 2) и (3, 4)?",
            options: ["11", "10", "14"],
            correct: 0,
            explanation: "Скалярное произведение вычисляется как 1*3 + 2*4 = 3 + 8 = 11."
        },
        {
            question: "Какой угол между векторами (1, 0) и (0, 1)?",
            options: ["90°", "45°", "0°"],
            correct: 0,
            explanation: "Векторы (1, 0) и (0, 1) перпендикулярны, поэтому угол между ними равен 90°."
        },
        {
            question: "Чему равен векторное произведение векторов (1, 0, 0) и (0, 1, 0)?",
            options: ["(0, 0, 1)", "(1, 1, 0)", "(0, 1, 1)"],
            correct: 0,
            explanation: "Векторное произведение (1, 0, 0) и (0, 1, 0) равно (0, 0, 1)."
        }
    ],
    history: [
        {
            question: "Когда началась Вторая мировая война?",
            options: ["1939", "1941", "1945"],
            correct: 0,
            explanation: "Вторая мировая война началась 1 сентября 1939 года."
        }
    ],
    english: [
        {
            question: "Как переводится слово 'apple'?",
            options: ["яблоко", "апельсин", "груша"],
            correct: 0,
            explanation: "'Apple' — это 'яблоко' по-английски."
        }
    ],
    biology: [
        {
            question: "Что производит хлорофилл в растениях?",
            options: ["Кислород", "Углекислый газ", "Азот"],
            correct: 0,
            explanation: "Хлорофилл производит кислород при фотосинтезе."
        }
    ]
};

let currentSubject = null;
let currentIndex = 0;
let correctAnswers = 0;

function loadSubject(subject) {
    currentSubject = subjects[subject];
    currentIndex = 0;
    correctAnswers = 0;
    document.getElementById("subject-selection").classList.add("hidden");
    document.getElementById("flashcard-area").classList.remove("hidden");
    showCard();
}

function showCard() {
    const card = currentSubject[currentIndex];
    document.getElementById("question").textContent = card.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    card.options.forEach((option, idx) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => handleAnswer(idx);
        answersDiv.appendChild(btn);
    });

    document.getElementById("explanation").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
}

function handleAnswer(selectedIndex) {
    const card = currentSubject[currentIndex];
    const isCorrect = selectedIndex === card.correct;

    if (isCorrect) {
        correctAnswers++;
    }

    const explanationDiv = document.getElementById("explanation");
    explanationDiv.textContent = isCorrect
        ? "✅ Правильно! " + card.explanation
        : "❌ Неправильно. " + card.explanation;
    explanationDiv.classList.remove("hidden");

    document.getElementById("next-btn").classList.remove("hidden");
    document.querySelectorAll("#answers button").forEach((btn) => {
        btn.disabled = true;
    });
}

function showStatistics() {
    const statsDiv = document.createElement("div");
    statsDiv.id = "statistics";
    statsDiv.innerHTML = `
        <h2>Статистика</h2>
        <p>Правильных ответов: ${correctAnswers}</p>
        <p>Всего вопросов: ${currentSubject.length}</p>
        <p>Процент правильных ответов: ${((correctAnswers / currentSubject.length) * 100).toFixed(2)}%</p>
    `;
    document.body.appendChild(statsDiv);
}

function nextCard() {
    currentIndex++;
    if (currentIndex < currentSubject.length) {
        showCard();
    } else {
        document.getElementById("question").textContent = "Вы прошли все карточки!";
        document.getElementById("answers").innerHTML = "";
        document.getElementById("explanation").classList.add("hidden");
        document.getElementById("next-btn").classList.add("hidden");
        showStatistics();
    }
}

function goBack() {
    document.getElementById("flashcard-area").classList.add("hidden");
    document.getElementById("subject-selection").classList.remove("hidden");

    // Сброс текущего состояния
    currentIndex = 0;
    correctAnswers = 0;

    // Скрыть объяснение и кнопку "Следующий"
    document.getElementById("explanation").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
}
