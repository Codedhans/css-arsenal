// UI Manager - Handles all DOM interactions

class UIManager {
    constructor() {
        this.elements = this.cacheElements();
        this.bindEvents();
    }

    cacheElements() {
        return {
            // Header Elements
            pointsDisplay: document.getElementById('pointsDisplay'),
            levelDisplay: document.getElementById('levelDisplay'),
            difficultyDisplay: document.getElementById('difficultyDisplay'),

            // Challenge Section
            questionText: document.getElementById('questionText'),
            questionContext: document.getElementById('questionContext'),
            challengeImage: document.getElementById('challengeImage'),
            imagePlaceholder: document.getElementById('imagePlaceholder'),
            optionA: document.getElementById('optionA'),
            optionB: document.getElementById('optionB'),
            optionC: document.getElementById('optionC'),
            textA: document.getElementById('textA'),
            textB: document.getElementById('textB'),
            textC: document.getElementById('textC'),
            challengeSection: document.getElementById('challengeSection'),

            // Welcome Screen
            welcomeScreen: document.getElementById('welcomeScreen'),
            startGameBtn: document.getElementById('startGameBtn'),
            continueGameBtn: document.getElementById('continueGameBtn'),

            // Sidebar
            projectName: document.getElementById('projectName'),
            projectDifficulty: document.getElementById('projectDifficulty'),
            projectProgress: document.getElementById('projectProgress'),
            progressText: document.getElementById('progressText'),
            startProjectBtn: document.getElementById('startProjectBtn'),
            correctAnswers: document.getElementById('correctAnswers'),
            totalQuestions: document.getElementById('totalQuestions'),
            accuracy: document.getElementById('accuracy'),
            streak: document.getElementById('streak'),
            resetGameBtn: document.getElementById('resetGameBtn'),

            // Difficulty Buttons
            difficultyBtns: document.querySelectorAll('.difficulty-btn'),

            // Modal
            modalOverlay: document.getElementById('modalOverlay'),
            modalTitle: document.getElementById('modalTitle'),
            modalMessage: document.getElementById('modalMessage'),
            modalExplanation: document.getElementById('modalExplanation'),
            pointsEarned: document.getElementById('pointsEarned'),
            nextChallengeBtn: document.getElementById('nextChallengeBtn'),

            // Project Modal
            projectModalOverlay: document.getElementById('projectModalOverlay'),
            projectModalTitle: document.getElementById('projectModalTitle'),
            projectModalMessage: document.getElementById('projectModalMessage'),
            projectDetails: document.getElementById('projectDetails'),
            startNewProjectBtn: document.getElementById('startNewProjectBtn'),
            continuePlayingBtn: document.getElementById('continuePlayingBtn'),

            // Project Editor
            projectEditorOverlay: document.getElementById('projectEditorOverlay'),
            projectEditorTitle: document.getElementById('projectEditorTitle'),
            projectHTML: document.getElementById('projectHTML'),
            projectCSS: document.getElementById('projectCSS'),
            previewContainer: document.getElementById('previewContainer'),
            submitProjectBtn: document.getElementById('submitProjectBtn'),
            closeProjectEditorBtn: document.getElementById('closeProjectEditorBtn'),
            closeProjectEditor: document.getElementById('closeProjectEditor')
        };
    }

    bindEvents() {
        // Start Game
        this.elements.startGameBtn.addEventListener('click', () => {
            gameEngine.startGame();
            this.hideWelcomeScreen();
        });

        this.elements.continueGameBtn.addEventListener('click', () => {
            const state = storageManager.getGameState();
            if (state.totalQuestions > 0) {
                gameEngine.startGame();
                this.hideWelcomeScreen();
            }
        });

        // Answer Options
        [this.elements.optionA, this.elements.optionB, this.elements.optionC].forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.option;
                gameEngine.submitAnswer(option);
            });
        });

        // Modal
        this.elements.nextChallengeBtn.addEventListener('click', () => {
            this.closeModal();
            gameEngine.nextQuestion();
        });

        // Difficulty Selection
        this.elements.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.currentTarget.dataset.difficulty;
                gameEngine.changeDifficulty(difficulty);
                this.updateDifficultyButtons(difficulty);
            });
        });

        // Reset Game
        this.elements.resetGameBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
                storageManager.resetGame();
                gameEngine.restartGame();
            }
        });

        // Project Buttons
        this.elements.startProjectBtn.addEventListener('click', () => {
            gameEngine.startProject();
        });

        this.elements.startNewProjectBtn.addEventListener('click', () => {
            this.closeProjectModal();
            gameEngine.startProject();
        });

        this.elements.continuePlayingBtn.addEventListener('click', () => {
            this.closeProjectModal();
            gameEngine.nextQuestion();
        });

        this.elements.submitProjectBtn.addEventListener('click', () => {
            gameEngine.submitProject();
        });

        this.elements.closeProjectEditorBtn.addEventListener('click', () => {
            this.closeProjectEditor();
        });

        this.elements.closeProjectEditor.addEventListener('click', () => {
            this.closeProjectEditor();
        });

        // CSS Preview Update
        this.elements.projectCSS.addEventListener('input', () => {
            this.updateProjectPreview();
        });
    }

    // Display Methods
    displayQuestion(question) {
        this.elements.questionText.textContent = question.question;
        this.elements.questionContext.textContent = question.context;
        
        this.elements.textA.textContent = question.options.A;
        this.elements.textB.textContent = question.options.B;
        this.elements.textC.textContent = question.options.C;

        // Reset button states
        [this.elements.optionA, this.elements.optionB, this.elements.optionC].forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });

        // Load image
        this.loadChallengeImage();
    }

    async loadChallengeImage() {
        this.elements.imagePlaceholder.classList.remove('hidden');
        try {
            const imageUrl = await unsplashAPI.getWebUIImage();
            await unsplashAPI.loadImage(imageUrl);
            this.elements.challengeImage.src = imageUrl;
            this.elements.challengeImage.classList.add('loaded');
            this.elements.imagePlaceholder.classList.add('hidden');
        } catch (error) {
            console.error('Error loading image:', error);
            this.elements.imagePlaceholder.classList.add('hidden');
        }
    }

    showCorrectAnswer(points, explanation) {
        this.elements.modalTitle.textContent = '✓ CORRECT!';
        this.elements.modalTitle.style.color = 'var(--success-color)';
        this.elements.modalMessage.textContent = 'Great job! You earned points.';
        this.elements.modalExplanation.textContent = explanation;
        this.elements.pointsEarned.textContent = `+${points} POINTS`;
        this.elements.pointsEarned.style.color = 'var(--success-color)';
        this.openModal();
    }

    showIncorrectAnswer(explanation) {
        this.elements.modalTitle.textContent = '✗ INCORRECT';
        this.elements.modalTitle.style.color = 'var(--error-color)';
        this.elements.modalMessage.textContent = 'Try the next question!';
        this.elements.modalExplanation.textContent = explanation;
        this.elements.pointsEarned.textContent = '+0 POINTS';
        this.elements.pointsEarned.style.color = 'var(--error-color)';
        this.openModal();
    }

    updateStats(stats) {
        this.elements.pointsDisplay.textContent = stats.points;
        this.elements.levelDisplay.textContent = stats.level;
        this.elements.difficultyDisplay.textContent = stats.difficulty.toUpperCase();
        this.elements.correctAnswers.textContent = stats.correctAnswers;
        this.elements.totalQuestions.textContent = stats.totalQuestions;
        this.elements.accuracy.textContent = stats.accuracy + '%';
        this.elements.streak.textContent = stats.streak;
    }

    highlightOption(option, isCorrect) {
        const btn = document.getElementById('option' + option);
        btn.disabled = true;
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
    }

    showProjectUnlock(project) {
        this.elements.projectModalTitle.textContent = '🎉 PROJECT UNLOCKED!';
        this.elements.projectModalMessage.textContent = `You've earned enough points to unlock: ${project.name}`;
        this.elements.projectDetails.innerHTML = `
            <p><strong>Difficulty:</strong> ${project.difficulty.toUpperCase()}</p>
            <p><strong>Description:</strong> ${project.description}</p>
        `;
        this.openProjectModal();
    }

    showProjectEditor(project) {
        this.elements.projectEditorTitle.textContent = project.name.toUpperCase();
        this.elements.projectHTML.value = project.htmlTemplate;
        this.elements.projectCSS.value = project.defaultCSS;
        this.updateProjectPreview();
        this.openProjectEditor();
    }

    updateProjectPreview() {
        const html = this.elements.projectHTML.value;
        const css = this.elements.projectCSS.value;
        
        const preview = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: Arial, sans-serif; margin: 10px; background: white; }
                    ${css}
                </style>
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;
        
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '4px';
        
        this.elements.previewContainer.innerHTML = '';
        this.elements.previewContainer.appendChild(iframe);
        
        iframe.contentDocument.write(preview);
        iframe.contentDocument.close();
    }

    updateProjectProgress(currentPoints, requiredPoints) {
        const percentage = Math.min((currentPoints / requiredPoints) * 100, 100);
        this.elements.projectProgress.style.width = percentage + '%';
        this.elements.progressText.textContent = `${currentPoints} / ${requiredPoints} points`;
    }

    updateDifficultyButtons(activeDifficulty) {
        this.elements.difficultyBtns.forEach(btn => {
            if (btn.dataset.difficulty === activeDifficulty) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    showWelcomeScreen() {
        const state = storageManager.getGameState();
        if (state.totalQuestions > 0) {
            this.elements.continueGameBtn.style.display = 'block';
        } else {
            this.elements.continueGameBtn.style.display = 'none';
        }
        this.elements.welcomeScreen.classList.add('active');
        this.elements.challengeSection.style.display = 'none';
    }

    hideWelcomeScreen() {
        this.elements.welcomeScreen.classList.remove('active');
        this.elements.challengeSection.style.display = 'flex';
    }

    openModal() {
        this.elements.modalOverlay.classList.add('active');
    }

    closeModal() {
        this.elements.modalOverlay.classList.remove('active');
    }

    openProjectModal() {
        this.elements.projectModalOverlay.classList.add('active');
    }

    closeProjectModal() {
        this.elements.projectModalOverlay.classList.remove('active');
    }

    openProjectEditor() {
        this.elements.projectEditorOverlay.classList.add('active');
    }

    closeProjectEditor() {
        this.elements.projectEditorOverlay.classList.remove('active');
    }

    showNotification(message, type = 'success') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff00' : '#ff0055'};
            color: #000;
            padding: 15px 20px;
            border-radius: 4px;
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Create global instance
const uiManager = new UIManager();