// Main Application Entry Point

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    // Load existing game state
    const state = storageManager.getGameState();
    
    // Update UI with current stats
    uiManager.updateStats(storageManager.getStats());
    uiManager.updateDifficultyButtons(state.currentDifficulty);
    
    // Calculate project progress
    const nextProjectRequired = gameEngine.getNextProjectRequired();
    uiManager.updateProjectProgress(state.points, nextProjectRequired);
    
    // Update project info
    const currentProject = PROJECTS_DATABASE
        .filter(p => !state.completedProjects.includes(p.id))
        .sort((a, b) => a.pointsRequired - b.pointsRequired)[0];
    
    if (currentProject) {
        uiManager.elements.projectName.textContent = currentProject.name;
        uiManager.elements.projectDifficulty.textContent = currentProject.difficulty.toUpperCase();
        uiManager.elements.startProjectBtn.disabled = state.points < currentProject.pointsRequired;
    }

    // Show welcome screen if first time or show challenge if continuing
    if (state.totalQuestions === 0) {
        uiManager.showWelcomeScreen();
    } else {
        uiManager.hideWelcomeScreen();
        gameEngine.startGame();
    }

    // Log initialization
    console.log('🎮 CSS Arsenal initialized!');
    console.log('Current Stats:', storageManager.getStats());
}

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (document.getElementById('modalOverlay').classList.contains('active')) {
        if (e.key === 'Enter') {
            document.getElementById('nextChallengeBtn').click();
        }
    } else if (!document.getElementById('projectEditorOverlay').classList.contains('active')) {
        if (e.key === 'a' || e.key === 'A') {
            document.getElementById('optionA').click();
        } else if (e.key === 'b' || e.key === 'B') {
            document.getElementById('optionB').click();
        } else if (e.key === 'c' || e.key === 'C') {
            document.getElementById('optionC').click();
        }
    }
});

// Add animations styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}