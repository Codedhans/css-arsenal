// Question Database organized by difficulty level

const QUESTIONS_DATABASE = {
    beginner: [
        {
            id: 1,
            question: "What CSS property changes the text color?",
            context: "You need to make all text red on the webpage.",
            options: {
                A: "color: red;",
                B: "text-color: red;",
                C: "font-color: red;"
            },
            correct: "A",
            explanation: "The 'color' property sets the text color in CSS. Options B and C are not valid CSS properties."
        },
        {
            id: 2,
            question: "Which property adds space outside an element's border?",
            context: "You want to create distance between this element and other elements.",
            options: {
                A: "padding",
                B: "margin",
                C: "border"
            },
            correct: "B",
            explanation: "The 'margin' property creates space outside the border. 'Padding' creates space inside, and 'border' creates the edge."
        },
        {
            id: 3,
            question: "How do you change the background color of an element?",
            context: "The webpage background should be blue.",
            options: {
                A: "background-color: blue;",
                B: "bg-color: blue;",
                C: "back-color: blue;"
            },
            correct: "A",
            explanation: "The correct property is 'background-color'. This sets the background color of any element."
        },
        {
            id: 4,
            question: "What does the 'display' property do?",
            context: "You want to control how elements appear on the page.",
            options: {
                A: "Controls element visibility",
                B: "Controls how an element is rendered/laid out",
                C: "Controls the font size"
            },
            correct: "B",
            explanation: "The 'display' property controls how an element is rendered in the layout (block, inline, flex, grid, etc.)."
        },
        {
            id: 5,
            question: "Which value makes an element disappear completely?",
            context: "You need to hide an element so it doesn't take up space.",
            options: {
                A: "display: none;",
                B: "visibility: hidden;",
                C: "opacity: 0;"
            },
            correct: "A",
            explanation: "'display: none;' removes the element from the document flow completely. The other options hide it but still reserve its space."
        },
        {
            id: 6,
            question: "What property controls the size of text?",
            context: "The heading text is too small and needs to be larger.",
            options: {
                A: "text-size",
                B: "font-size",
                C: "size"
            },
            correct: "B",
            explanation: "The 'font-size' property controls the size of text. 'text-size' and 'size' are not valid CSS properties."
        },
        {
            id: 7,
            question: "How do you center text horizontally in an element?",
            context: "The paragraph text should be centered on the page.",
            options: {
                A: "text-align: center;",
                B: "align: center;",
                C: "center-text: true;"
            },
            correct: "A",
            explanation: "The 'text-align: center;' property centers text horizontally within its container."
        },
        {
            id: 8,
            question: "What property adds a border around an element?",
            context: "You want to add a visible border around the content box.",
            options: {
                A: "outline",
                B: "border",
                C: "frame"
            },
            correct: "B",
            explanation: "The 'border' property adds a border around an element. 'Outline' is different, and 'frame' is not a valid CSS property."
        }
    ],
    intermediate: [
        {
            id: 101,
            question: "Which layout method provides the most control for complex layouts?",
            context: "You're building a responsive dashboard with multiple sections.",
            options: {
                A: "CSS Grid",
                B: "Flexbox",
                C: "Float"
            },
            correct: "A",
            explanation: "CSS Grid is best for complex 2D layouts. Flexbox excels at 1D layouts, and Float is older and less flexible."
        },
        {
            id: 102,
            question: "What does 'justify-content' do in Flexbox?",
            context: "You need to align items horizontally along the main axis.",
            options: {
                A: "Aligns items vertically",
                B: "Aligns items horizontally along the main axis",
                C: "Aligns items to the center only"
            },
            correct: "B",
            explanation: "'justify-content' aligns flex items along the main axis (horizontal by default). 'align-items' aligns vertically."
        },
        {
            id: 103,
            question: "How do you create a pseudo-element in CSS?",
            context: "You want to add decorative content before an element without changing HTML.",
            options: {
                A: ":before and :after",
                B: "::before and ::after",
                C: "Both A and B work"
            },
            correct: "C",
            explanation: "Both syntaxes work, but '::' is the newer CSS3 standard. Pseudo-elements allow you to style parts of elements."
        },
        {
            id: 104,
            question: "What property creates a shadow effect?",
            context: "The box needs depth with a shadow beneath it.",
            options: {
                A: "box-shadow",
                B: "text-shadow",
                C: "shadow-effect"
            },
            correct: "A",
            explanation: "'box-shadow' creates shadows around elements. 'text-shadow' is for text specifically."
        },
        {
            id: 105,
            question: "How do you apply a gradient background?",
            context: "The background should transition smoothly from blue to purple.",
            options: {
                A: "background: linear-gradient(blue, purple);",
                B: "background: gradient(blue to purple);",
                C: "gradient-background: blue to purple;"
            },
            correct: "A",
            explanation: "'linear-gradient()' creates smooth color transitions. This is the correct CSS function for gradients."
        },
        {
            id: 106,
            question: "What does 'position: relative' do?",
            context: "You need to offset an element from its normal position.",
            options: {
                A: "Removes element from document flow",
                B: "Positions element relative to its normal position",
                C: "Positions element relative to viewport"
            },
            correct: "B",
            explanation: "'position: relative' offsets an element but keeps it in the document flow. 'absolute' removes it from flow."
        },
        {
            id: 107,
            question: "How do you make an element responsive to screen size?",
            context: "The layout should adapt to different device sizes.",
            options: {
                A: "Using media queries",
                B: "Using viewport meta tag",
                C: "Using absolute positioning"
            },
            correct: "A",
            explanation: "Media queries allow different styles for different screen sizes. The viewport tag helps with mobile rendering."
        },
        {
            id: 108,
            question: "What does 'z-index' control?",
            context: "Two elements are overlapping and you need to control which appears on top.",
            options: {
                A: "Stacking order (depth) of elements",
                B: "Zoom level of elements",
                C: "Element positioning"
            },
            correct: "A",
            explanation: "'z-index' controls the stacking order. Higher values appear on top. Only works with positioned elements."
        }
    ],
    advanced: [
        {
            id: 201,
            question: "What is CSS containment and why use it?",
            context: "Performance optimization for complex nested components.",
            options: {
                A: "Limits scope of styles using 'contain' property",
                B: "Only about containing elements in a parent",
                C: "A deprecated CSS feature"
            },
            correct: "A",
            explanation: "CSS containment isolates an element's layout and styling from the rest of the document, improving performance significantly."
        },
        {
            id: 202,
            question: "How does CSS custom properties (variables) work?",
            context: "Maintaining consistent theming across the entire site.",
            options: {
                A: "Define with -- prefix and access with var()",
                B: "Define with $ prefix like SCSS",
                C: "Not natively supported in CSS"
            },
            correct: "A",
            explanation: "CSS custom properties use -- prefix: --color: blue; and var(--color) to access. They're natively supported in modern browsers."
        },
        {
            id: 203,
            question: "What does 'will-change' property do?",
            context: "Optimizing animation performance for smooth transitions.",
            options: {
                A: "Hints browser to optimize for upcoming changes",
                B: "Changes element properties automatically",
                C: "Forces GPU acceleration always"
            },
            correct: "A",
            explanation: "'will-change' hints to the browser that an element will change, allowing optimization. Use sparingly as it has performance costs."
        },
        {
            id: 204,
            question: "How do CSS Grid template areas work?",
            context: "Creating complex layouts with named grid regions.",
            options: {
                A: "Names grid cells for easier layout reference",
                B: "Only for naming rows and columns",
                C: "Not supported in modern browsers"
            },
            correct: "A",
            explanation: "Grid template areas let you name regions and place items using those names, making complex layouts readable and maintainable."
        },
        {
            id: 205,
            question: "What is the CSS cascade and specificity?",
            context: "Debugging style conflicts in large projects.",
            options: {
                A: "Order of rules and selector weight determine which styles apply",
                B: "All CSS rules have equal weight",
                C: "Only inline styles matter"
            },
            correct: "A",
            explanation: "Cascade means later rules override earlier ones. Specificity determines which rule wins (ID > class > element). Inline styles override both."
        },
        {
            id: 206,
            question: "How do you create responsive typography?",
            context: "Font sizes should scale with viewport width.",
            options: {
                A: "Using 'clamp()' with vw units",
                B: "Only using media queries",
                C: "Only using fixed pixel sizes"
            },
            correct: "A",
            explanation: "'clamp(min, preferred, max)' allows fluid sizing. Example: clamp(16px, 5vw, 32px) scales font smoothly."
        },
        {
            id: 207,
            question: "What does 'aspect-ratio' property do?",
            context: "Maintaining image and video proportions responsively.",
            options: {
                A: "Maintains width-to-height ratio automatically",
                B: "Only works with images",
                C: "Requires JavaScript to work"
            },
            correct: "A",
            explanation: "'aspect-ratio' maintains proportions. Example: aspect-ratio: 16/9; keeps elements in that ratio regardless of size."
        },
        {
            id: 208,
            question: "How do subgrid in CSS Grid improve layout?",
            context: "Aligning nested grid items with parent grid lines.",
            options: {
                A: "Child grids inherit parent's grid lines for alignment",
                B: "Subgrid is the same as regular grid",
                C: "Only works with 2-level nesting"
            },
            correct: "A",
            explanation: "'display: subgrid' makes child grid items align with parent grid lines, enabling complex multi-level layouts."
        }
    ]
};

// Projects Database
const PROJECTS_DATABASE = [
    {
        id: 1,
        name: "Profile Page Builder",
        difficulty: "beginner",
        pointsRequired: 100,
        description: "Build a simple profile page with HTML and CSS",
        htmlTemplate: `<div class="profile-container">
    <img src="https://via.placeholder.com/150" alt="Profile Picture" class="profile-pic">
    <h1 class="profile-name">John Doe</h1>
    <p class="profile-title">Web Developer</p>
    <p class="profile-bio">Passionate about CSS and web design.</p>
    <div class="social-links">
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">LinkedIn</a>
        <a href="#" class="social-link">GitHub</a>
    </div>
</div>`,
        defaultCSS: `/* Add your CSS here */
.profile-container {
    text-align: center;
    padding: 20px;
}

.profile-pic {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

.profile-name {
    margin: 10px 0;
}

.profile-title {
    color: #666;
}

.social-links {
    margin-top: 20px;
}

.social-link {
    margin: 0 10px;
    text-decoration: none;
}`
    },
    {
        id: 2,
        name: "Responsive Blog Card",
        difficulty: "intermediate",
        pointsRequired: 250,
        description: "Create a responsive blog card with Flexbox",
        htmlTemplate: `<div class="blog-card">
    <img src="https://via.placeholder.com/400x200" alt="Blog Image" class="blog-image">
    <div class="blog-content">
        <h2 class="blog-title">Understanding CSS Grid</h2>
        <p class="blog-excerpt">Learn how to create powerful layouts with CSS Grid...</p>
        <div class="blog-meta">
            <span class="author">By Jane Smith</span>
            <span class="date">March 15, 2024</span>
        </div>
        <button class="read-more">Read More</button>
    </div>
</div>`,
        defaultCSS: `/* Add your CSS here */
.blog-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    max-width: 400px;
}

.blog-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.blog-content {
    padding: 20px;
}

.blog-title {
    margin: 10px 0;
}

.blog-meta {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    font-size: 12px;
}

.read-more {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}`
    },
    {
        id: 3,
        name: "Dashboard Layout",
        difficulty: "advanced",
        pointsRequired: 500,
        description: "Build a complex dashboard using CSS Grid and custom properties",
        htmlTemplate: `<div class="dashboard">
    <header class="dashboard-header">Dashboard Analytics</header>
    <nav class="dashboard-nav">
        <a href="#" class="nav-item active">Home</a>
        <a href="#" class="nav-item">Analytics</a>
        <a href="#" class="nav-item">Settings</a>
    </nav>
    <main class="dashboard-main">
        <div class="card">
            <h3>Total Users</h3>
            <p class="stat">1,234</p>
        </div>
        <div class="card">
            <h3>Revenue</h3>
            <p class="stat">$45,678</p>
        </div>
        <div class="card">
            <h3>Growth</h3>
            <p class="stat">+23%</p>
        </div>
    </main>
</div>`,
        defaultCSS: `/* Add your CSS here */
:root {
    --primary-color: #007bff;
    --bg-color: #f5f5f5;
}

.dashboard {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
}

.dashboard-header {
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
}

.dashboard-nav {
    display: flex;
    gap: 10px;
    padding: 10px 0;
}

.nav-item {
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 4px;
}

.nav-item.active {
    background: var(--primary-color);
    color: white;
}

.dashboard-main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat {
    font-size: 28px;
    font-weight: bold;
    margin: 10px 0;
}`
    }
];

// Helper function to get questions by difficulty
function getQuestionsByDifficulty(difficulty) {
    return QUESTIONS_DATABASE[difficulty] || [];
}

// Helper function to get all questions (random order)
function getAllQuestions() {
    const allQuestions = [
        ...QUESTIONS_DATABASE.beginner,
        ...QUESTIONS_DATABASE.intermediate,
        ...QUESTIONS_DATABASE.advanced
    ];
    return allQuestions.sort(() => Math.random() - 0.5);
}

// Helper function to get random question by difficulty
function getRandomQuestion(difficulty) {
    const questions = getQuestionsByDifficulty(difficulty);
    return questions[Math.floor(Math.random() * questions.length)];
}

// Helper function to get project by id
function getProjectById(id) {
    return PROJECTS_DATABASE.find(p => p.id === id);
}

// Helper function to get projects by difficulty
function getProjectsByDifficulty(difficulty) {
    return PROJECTS_DATABASE.filter(p => p.difficulty === difficulty);
}