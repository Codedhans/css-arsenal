// Local Storage Manager

class StorageManager {
    constructor() {
        this.storageKey = 'cssArsenalGameState';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!this.getGameState()) {
            const initialState = {
                points: 0,
                currentLevel: 1,
                currentDifficulty: 'beginner',
                correctAnswers: 0,
                totalQuestions: 0,
                currentStreak: 0,
                bestStreak: 0,
                completedQuestions: [],
                completedProjects: [],
                unlockedProjects: [],
                projectProgress: {},
                stats: {
                    beginner: { correct: 0, total: 0 },
                    intermediate: { correct: 0, total: 0 },
                    advanced: { correct: 0, total: 0 }
                },
                lastPlayed: new Date().toISOString()
            };
            this.saveGameState(initialState);
        }
    }

    getGameState() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey));
        } catch (error) {
            console.error('Error retrieving game state:', error);
            return null;
        }
    }

    saveGameState(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    }

    updateGameState(updates) {
        const currentState = this.getGameState();
        const newState = { ...currentState, ...updates };
        this.saveGameState(newState);
        return newState;
    }

    addPoints(points, difficulty) {
        const state = this.getGameState();
        state.points += points;
        state.currentLevel = Math.floor(state.points / 100) + 1;
        
        // Update stats
        state.stats[difficulty].correct += 1;
        state.stats[difficulty].total += 1;
        state.correctAnswers += 1;
        state.totalQuestions += 1;
        state.currentStreak += 1;
        
        if (state.currentStreak > state.bestStreak) {
            state.bestStreak = state.currentStreak;
        }

        this.saveGameState(state);
        return state;
    }

    recordIncorrectAnswer(difficulty) {
        const state = this.getGameState();
        state.stats[difficulty].total += 1;
        state.totalQuestions += 1;
        state.currentStreak = 0;
        this.saveGameState(state);
        return state;
    }

    recordCompletedQuestion(questionId) {
        const state = this.getGameState();
        if (!state.completedQuestions.includes(questionId)) {
            state.completedQuestions.push(questionId);
        }
        this.saveGameState(state);
    }

    checkProjectUnlock(points) {
        const state = this.getGameState();
        const projects = PROJECTS_DATABASE;
        
        projects.forEach(project => {
            if (!state.unlockedProjects.includes(project.id) && points >= project.pointsRequired) {
                state.unlockedProjects.push(project.id);
                state.projectProgress[project.id] = 0;
            }
        });
        
        this.saveGameState(state);
        return state.unlockedProjects;
    }

    updateProjectProgress(projectId, progress) {
        const state = this.getGameState();
        state.projectProgress[projectId] = progress;
        this.saveGameState(state);
    }

    completeProject(projectId) {
        const state = this.getGameState();
        if (!state.completedProjects.includes(projectId)) {
            state.completedProjects.push(projectId);
        }
        this.saveGameState(state);
    }

    getStats() {
        const state = this.getGameState();
        const accuracy = state.totalQuestions > 0 
            ? Math.round((state.correctAnswers / state.totalQuestions) * 100) 
            : 0;
        
        return {
            points: state.points,
            level: state.currentLevel,
            correctAnswers: state.correctAnswers,
            totalQuestions: state.totalQuestions,
            accuracy: accuracy,
            streak: state.currentStreak,
            bestStreak: state.bestStreak,
            difficulty: state.currentDifficulty,
            stats: state.stats
        };
    }

    changeDifficulty(difficulty) {
        const state = this.getGameState();
        state.currentDifficulty = difficulty;
        this.saveGameState(state);
    }

    resetGame() {
        localStorage.removeItem(this.storageKey);
        this.initializeStorage();
    }

    exportStats() {
        const state = this.getGameState();
        return JSON.stringify(state, null, 2);
    }
}

// Create global instance
const storageManager = new StorageManager();