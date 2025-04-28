document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const difficultySelector = document.getElementById('difficultySelector');
    const quizArea = document.getElementById('quizArea');
    const questionContainer = document.getElementById('questionContainer');
    const feedbackElement = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultScore = document.getElementById('resultScore');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const progressBar = document.getElementById('progressBar');
    const timerElement = document.getElementById('timer');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const difficultyError = document.getElementById('difficultyError');

    // Quiz Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedDifficulty = 'all';
    let timer;
    let timeLeft = 30;
    let questions = [];
    let filteredQuestions = [];

    // Expanded Quiz Questions Database with balanced difficulties
    const quizQuestions = [
        // Easy Questions (10)
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris",
            difficulty: "easy"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars",
            difficulty: "easy"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            answer: "Blue Whale",
            difficulty: "easy"
        },
        {
            question: "What is the square root of 144?",
            options: ["11", "12", "13", "14"],
            answer: "12",
            difficulty: "easy"
        },
        {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            answer: "7",
            difficulty: "easy"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            answer: "H2O",
            difficulty: "easy"
        },
        {
            question: "Which country is home to the kangaroo?",
            options: ["Brazil", "Australia", "South Africa", "India"],
            answer: "Australia",
            difficulty: "easy"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: "Pacific",
            difficulty: "easy"
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon Dioxide",
            difficulty: "easy"
        },
        {
            question: "What is the main language spoken in Brazil?",
            options: ["Spanish", "Portuguese", "English", "French"],
            answer: "Portuguese",
            difficulty: "easy"
        },

        // Medium Questions (10)
        {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            answer: "1945",
            difficulty: "medium"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            answer: "Leonardo da Vinci",
            difficulty: "medium"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            answer: "Au",
            difficulty: "medium"
        },
        {
            question: "Which language has the most native speakers?",
            options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
            answer: "Mandarin Chinese",
            difficulty: "medium"
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Liver", "Brain", "Skin", "Heart"],
            answer: "Skin",
            difficulty: "medium"
        },
        {
            question: "Which country invented tea?",
            options: ["India", "England", "China", "Japan"],
            answer: "China",
            difficulty: "medium"
        },
        {
            question: "How many bones are in the adult human body?",
            options: ["206", "300", "150", "412"],
            answer: "206",
            difficulty: "medium"
        },
        {
            question: "Which planet is closest to the sun?",
            options: ["Venus", "Mars", "Mercury", "Earth"],
            answer: "Mercury",
            difficulty: "medium"
        },
        {
            question: "What is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            answer: "Ottawa",
            difficulty: "medium"
        },
        {
            question: "Which element makes up about 21% of the Earth's atmosphere?",
            options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Argon"],
            answer: "Oxygen",
            difficulty: "medium"
        },

        // Hard Questions (10)
        {
            question: "In computer science, what does 'HTTP' stand for?",
            options: [
                "HyperText Transfer Protocol",
                "High-level Text Transmission Process",
                "Hyperlink Text Transmission Protocol",
                "Home Tool Transfer Protocol"
            ],
            answer: "HyperText Transfer Protocol",
            difficulty: "hard"
        },
        {
            question: "Which element has the atomic number 1?",
            options: ["Helium", "Hydrogen", "Lithium", "Oxygen"],
            answer: "Hydrogen",
            difficulty: "hard"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: [
                "Harper Lee",
                "J.D. Salinger",
                "Mark Twain",
                "Ernest Hemingway"
            ],
            answer: "Harper Lee",
            difficulty: "hard"
        },
        {
            question: "In physics, what does 'E=mc²' represent?",
            options: [
                "Einstein's theory of general relativity",
                "The photoelectric effect",
                "Mass-energy equivalence",
                "The uncertainty principle"
            ],
            answer: "Mass-energy equivalence",
            difficulty: "hard"
        },
        {
            question: "What is the largest desert in the world?",
            options: [
                "Sahara",
                "Arabian",
                "Antarctica",
                "Gobi"
            ],
            answer: "Antarctica",
            difficulty: "hard"
        },
        {
            question: "Which country has the most time zones?",
            options: [
                "United States",
                "Russia",
                "China",
                "France"
            ],
            answer: "France",
            difficulty: "hard"
        },
        {
            question: "What is the only mammal capable of true flight?",
            options: [
                "Flying squirrel",
                "Bat",
                "Colugo",
                "Sugar glider"
            ],
            answer: "Bat",
            difficulty: "hard"
        },
        {
            question: "Which planet has the most moons?",
            options: [
                "Jupiter",
                "Saturn",
                "Neptune",
                "Uranus"
            ],
            answer: "Saturn",
            difficulty: "hard"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: [
                "Gold",
                "Iron",
                "Diamond",
                "Quartz"
            ],
            answer: "Diamond",
            difficulty: "hard"
        },
        {
            question: "Which country is both an island and a continent?",
            options: [
                "Greenland",
                "Australia",
                "Madagascar",
                "New Zealand"
            ],
            answer: "Australia",
            difficulty: "hard"
        }
    ];

    // Initialize the quiz
    function initQuiz() {
        // Hide any previous error messages
        difficultyError.style.display = 'none';
        
        // Filter questions based on selected difficulty
        if (selectedDifficulty === 'all') {
            filteredQuestions = [...quizQuestions];
        } else {
            filteredQuestions = quizQuestions.filter(q => q.difficulty === selectedDifficulty);
        }

        // Check if we have enough questions (minimum 5 per difficulty)
        if (filteredQuestions.length < 5) {
            difficultyError.textContent = "Not enough questions for this difficulty. Please select another.";
            difficultyError.style.display = 'block';
            return;
        }

        // Shuffle questions and select first 10 (or less if not available)
        filteredQuestions = shuffleArray(filteredQuestions).slice(0, Math.min(10, filteredQuestions.length));
        
        // Update UI
        totalQuestionsElement.textContent = filteredQuestions.length;
        currentQuestionIndex = 0;
        score = 0;
        
        // Show quiz area and hide other sections
        difficultySelector.style.display = 'none';
        quizArea.style.display = 'block';
        resultContainer.style.display = 'none';
        
        // Load the first question
        loadQuestion();
    }

    // Shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        if (!array || array.length === 0) return [];
        
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Load a question into the UI
    function loadQuestion() {
        // Check if we have questions
        if (!filteredQuestions || filteredQuestions.length === 0) {
            showError("No questions available. Please try another difficulty.");
            return;
        }

        // Reset timer
        resetTimer();
        
        // Get current question
        const currentQuestion = filteredQuestions[currentQuestionIndex];
        
        // Update progress
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        progressBar.style.width = `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%`;
        
        // Create question HTML
        let questionHTML = `
            <div class="question-text">${currentQuestion.question}</div>
            <div class="options-container">
        `;
        
        // Shuffle options (but keep track of correct answer)
        const shuffledOptions = shuffleArray([...currentQuestion.options]);
        
        // Add each option to the HTML
        shuffledOptions.forEach((option, index) => {
            questionHTML += `
                <div class="option" data-answer="${option}">
                    <span class="option-prefix">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                </div>
            `;
        });
        
        questionHTML += `</div>`;
        questionContainer.innerHTML = questionHTML;
        
        // Add event listeners to options
        const options = document.querySelectorAll('.option');
        if (options) {
            options.forEach(option => {
                option.addEventListener('click', selectOption);
            });
        }
        
        // Disable next button until an option is selected
        nextBtn.disabled = true;
        feedbackElement.style.display = 'none';
    }

    // Handle option selection
    function selectOption(e) {
        // Check if we have a valid selection
        if (!e.currentTarget) return;
        
        // Stop timer
        clearInterval(timer);
        
        const selectedOption = e.currentTarget;
        const selectedAnswer = selectedOption.getAttribute('data-answer');
        const currentQuestion = filteredQuestions[currentQuestionIndex];
        
        // Disable all options
        const options = document.querySelectorAll('.option');
        if (options) {
            options.forEach(option => {
                option.classList.add('disabled');
                option.removeEventListener('click', selectOption);
            });
        }
        
        // Mark selected option
        selectedOption.classList.add('selected');
        
        // Check if answer is correct
        const isCorrect = selectedAnswer === currentQuestion.answer;
        
        if (isCorrect) {
            score++;
            feedbackElement.textContent = "Correct!";
            feedbackElement.className = "feedback correct";
        } else {
            feedbackElement.textContent = `Incorrect! The correct answer is: ${currentQuestion.answer}`;
            feedbackElement.className = "feedback incorrect";
            
            // Highlight correct answer
            options.forEach(option => {
                if (option.getAttribute('data-answer') === currentQuestion.answer) {
                    option.classList.add('correct');
                }
            });
            
            // Highlight incorrect selected answer
            selectedOption.classList.add('incorrect');
        }
        
        // Show feedback
        feedbackElement.style.display = 'block';
        
        // Enable next button
        nextBtn.disabled = false;
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < filteredQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Show quiz results
    function showResults() {
        quizArea.style.display = 'none';
        resultContainer.style.display = 'block';
        resultScore.textContent = `You scored ${score} out of ${filteredQuestions.length}`;
    }

    // Restart the quiz
    function restartQuiz() {
        // Show difficulty selector again
        difficultySelector.style.display = 'block';
        quizArea.style.display = 'none';
        resultContainer.style.display = 'none';
        difficultyError.style.display = 'none';
    }

    // Timer functions
    function startTimer() {
        timeLeft = 30;
        updateTimerDisplay();
        
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    function updateTimerDisplay() {
        if (!timerElement) return;
        
        timerElement.textContent = `${timeLeft}s`;
        
        // Change color when time is running low
        if (timeLeft <= 10) {
            timerElement.style.backgroundColor = 'var(--incorrect-color)';
        } else {
            timerElement.style.backgroundColor = 'var(--primary-color)';
        }
    }

    function timeUp() {
        // Check if we have questions and options
        if (!filteredQuestions || !filteredQuestions[currentQuestionIndex]) return;
        
        const options = document.querySelectorAll('.option');
        const currentQuestion = filteredQuestions[currentQuestionIndex];
        
        if (options && options.length > 0) {
            options.forEach(option => {
                option.classList.add('disabled');
                option.removeEventListener('click', selectOption);
                
                // Highlight correct answer
                if (option.getAttribute('data-answer') === currentQuestion.answer) {
                    option.classList.add('correct');
                }
            });
        }
        
        feedbackElement.textContent = `Time's up! The correct answer is: ${currentQuestion.answer}`;
        feedbackElement.className = "feedback incorrect";
        feedbackElement.style.display = 'block';
        
        nextBtn.disabled = false;
    }

    // Show error message
    function showError(message) {
        difficultyError.textContent = message;
        difficultyError.style.display = 'block';
        quizArea.style.display = 'none';
        resultContainer.style.display = 'none';
        difficultySelector.style.display = 'block';
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (restartQuizBtn) restartQuizBtn.addEventListener('click', restartQuiz);
    if (startQuizBtn) startQuizBtn.addEventListener('click', initQuiz);

    // Difficulty selection
    if (difficultyBtns && difficultyBtns.length > 0) {
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                difficultyBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Set selected difficulty
                selectedDifficulty = this.getAttribute('data-difficulty');
            });
        });
    }
});
