// Game Engine - Core game logic

class GameEngine {
    constructor() {
        this.currentQuestion = null;
        this.questionsUsed = [];
        this.currentDifficulty = 'beginner';
        this.currentProject = null;
        this.isAnswering = false;
    }

    startGame() {
        const state = storageManager.getGameState();
        this.currentDifficulty = state.currentDifficulty;
        this.questionsUsed = [...state.completedQuestions];
        this.loadNextQuestion();
    }

    restartGame() {
        this.questionsUsed = [];
        this.currentDifficulty = 'beginner';
        uiManager.showWelcomeScreen();
        uiManager.updateStats(storageManager.getStats());
    }

    loadNextQuestion() {
        const questions = getQuestionsByDifficulty(this.currentDifficulty);
        const availableQuestions = questions.filter(q => !this.questionsUsed.includes(q.id));

        if (availableQuestions.length === 0) {
            // All questions used, reset for this difficulty
            this.questionsUsed = [];
        }

        const shuffled = availableQuestions.length > 0 ? availableQuestions : questions;
        this.currentQuestion = shuffled[Math.floor(Math.random() * shuffled.length)];
        
        uiManager.displayQuestion(this.currentQuestion);
    }

    nextQuestion() {
        this.isAnswering = false;
        this.loadNextQuestion();
    }

    submitAnswer(selectedOption) {
        if (this.isAnswering) return;
        this.isAnswering = true;

        const isCorrect = selectedOption === this.currentQuestion.correct;
        const points = this.calculatePoints(this.currentDifficulty);

        uiManager.highlightOption(selectedOption, isCorrect);
        uiManager.highlightOption(this.currentQuestion.correct, true);

        if (isCorrect) {
            const newState = storageManager.addPoints(points, this.currentDifficulty);
            storageManager.recordCompletedQuestion(this.currentQuestion.id);
            
            // Check for project unlocks
            const unlockedProjects = storageManager.checkProjectUnlock(newState.points);
            
            uiManager.updateStats(storageManager.getStats());
            uiManager.updateProjectProgress(newState.points, this.getNextProjectRequired());
            
            uiManager.showCorrectAnswer(points, this.currentQuestion.explanation);

            // Check if new project was unlocked
            if (unlockedProjects.length > newState.completedProjects.length) {
                const lastUnlockedId = unlockedProjects[unlockedProjects.length - 1];
                const lastCompletedId = newState.completedProjects.length > 0 
                    ? newState.completedProjects[newState.completedProjects.length - 1] 
                    : null;
                
                if (lastUnlockedId !== lastCompletedId) {
                    setTimeout(() => {
                        const project = getProjectById(lastUnlockedId);
                        uiManager.showProjectUnlock(project);
                    }, 1500);
                }
            }
        } else {
            storageManager.recordIncorrectAnswer(this.currentDifficulty);
            uiManager.updateStats(storageManager.getStats());
            uiManager.showIncorrectAnswer(this.currentQuestion.explanation);
        }
    }

    calculatePoints(difficulty) {
        const pointsMap = {
            beginner: 10,
            intermediate: 25,
            advanced: 50
        };
        return pointsMap[difficulty] || 10;
    }

    getNextProjectRequired() {
        const state = storageManager.getGameState();
        const nextProject = PROJECTS_DATABASE
            .filter(p => !state.completedProjects.includes(p.id))
            .sort((a, b) => a.pointsRequired - b.pointsRequired)[0];
        
        return nextProject ? nextProject.pointsRequired : 1000;
    }

    changeDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        storageManager.changeDifficulty(difficulty);
        this.questionsUsed = [];
        this.loadNextQuestion();
    }

    startProject() {
        const state = storageManager.getGameState();
        
        // Find first unlocked uncompleted project
        const unlockedProjects = state.unlockedProjects;
        const completedProjects = state.completedProjects;
        
        const projectToStart = PROJECTS_DATABASE.find(p => 
            unlockedProjects.includes(p.id) && !completedProjects.includes(p.id)
        );

        if (projectToStart) {
            this.currentProject = projectToStart;
            uiManager.showProjectEditor(projectToStart);
        } else {
            uiManager.showNotification('No projects available yet. Keep playing!', 'info');
        }
    }

    submitProject() {
        if (this.currentProject) {
            storageManager.completeProject(this.currentProject.id);
            uiManager.closeProjectEditor();
            uiManager.showNotification(`${this.currentProject.name} completed! Great work!`, 'success');
        }
    }
}

// Create global instance
const gameEngine = new GameEngine();