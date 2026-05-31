# CSS ARSENAL 🎮

A retro-themed, web-based educational game designed to improve CSS skills through gamified challenges and projects.

## Features

- **🎯 Progressive Challenges**: Questions organized by difficulty (Beginner → Intermediate → Advanced)
- **🏆 Points & Leveling System**: Earn points and unlock projects
- **🖼️ Dynamic Images**: Real unsplash images for each challenge
- **📊 Statistics Tracking**: Track accuracy, streaks, and progress
- **🎨 Project Builder**: Complete CSS projects to master real-world skills
- **💾 Persistent Storage**: All progress saved to localStorage
- **🎭 Retro Aesthetic**: 80s arcade-style dark theme with neon colors
- **📱 Responsive Design**: Works on desktop and mobile devices

## How to Play

1. **Start the Game**: Click "START GAME" on the welcome screen
2. **Answer Questions**: Select the correct CSS solution (A, B, or C)
3. **Earn Points**: Correct answers award points based on difficulty
4. **Change Difficulty**: Switch between Beginner, Intermediate, and Advanced
5. **Unlock Projects**: Accumulate points to unlock projects
6. **Build Projects**: Complete CSS projects to apply your knowledge

## Game Difficulty Levels

### Beginner (10 points per question)
- Basic CSS properties
- Colors, sizing, spacing
- Text alignment and styling

### Intermediate (25 points per question)
- Flexbox and positioning
- Pseudo-elements and animations
- Gradients and shadows

### Advanced (50 points per question)
- CSS Grid and subgrid
- Custom properties and containment
- Responsive design techniques

## Projects

1. **Profile Page Builder** (100 points)
   - Learn basic CSS layout
   - Style profile information

2. **Responsive Blog Card** (250 points)
   - Master Flexbox
   - Responsive component design

3. **Dashboard Layout** (500 points)
   - CSS Grid mastery
   - Complex multi-section layouts

## Files Structure

```
css-arsenal/
├── index.html                 # Main HTML file
├── css/
│   ├── retro-theme.css       # Retro 80s theme
│   └── style.css             # Main game styles
├── js/
│   ├── main.js               # Application entry point
│   ├── gameEngine.js         # Core game logic
│   ├── questionDatabase.js   # Questions and projects
│   ├── storageManager.js     # localStorage management
│   ├── uiManager.js          # DOM and UI management
│   └── unsplashAPI.js        # Image fetching
└── README.md                 # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Animations, Custom Properties
- **Vanilla JavaScript (ES6+)**: No frameworks or dependencies
- **localStorage API**: Client-side data persistence
- **Unsplash API**: Free, unlimited stock images

## Installation

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Start playing!

No build process, no dependencies, no server required!

## Usage Tips

- Use **A**, **B**, **C** keys as keyboard shortcuts to answer
- Press **Enter** to go to the next challenge
- Click difficulty buttons to change challenge levels
- Reset your progress anytime with the "RESET GAME" button

## Customization

### Adding More Questions

Edit `js/questionDatabase.js` and add questions to the appropriate difficulty level:

```javascript
{
    id: 9,
    question: "Your question here?",
    context: "Context or scenario...",
    options: {
        A: "Option A",
        B: "Option B",
        C: "Option C"
    },
    correct: "A",
    explanation: "Why A is correct..."
}
```

### Changing Theme Colors

Edit `:root` variables in `css/retro-theme.css`:

```css
:root {
    --primary-color: #00ff00;      /* Change green */
    --secondary-color: #ff00ff;    /* Change magenta */
    --tertiary-color: #00ffff;     /* Change cyan */
    /* ... other colors */
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Images are loaded asynchronously
- Lazy loading of challenge images
- Efficient DOM caching in UIManager
- Minimal repaints and reflows

## Future Enhancements

- [ ] Multiplayer leaderboard
- [ ] Custom challenge builder
- [ ] CSS animation challenges
- [ ] Sound effects and background music
- [ ] Mobile app version
- [ ] Accessibility challenges
- [ ] Advanced CSS features (backdrop-filter, mask-image, etc.)
- [ ] Progress export/sharing

## Contributing

Contributions are welcome! Feel free to:
- Add more questions and projects
- Improve the UI/UX
- Add new features
- Report bugs

## License

This project is open source and available for educational purposes.

## Author

Created as an educational game to help developers master CSS skills.

---

**Happy Learning! 🚀 Level Up Your CSS Skills!**