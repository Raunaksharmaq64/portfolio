/* =========================================
   Chatbot Logic - Trained on Raunak's Portfolio
   ========================================= */

const portfolioData = {
    identity: {
        name: "Raunak Sharma",
        role: "Aspiring Software Developer | Web Developer | Java Programmer",
        phone: "+91 8863073643",
        email: "raunaksharma88630mt@gmail.com",
        location: "India",
        availability: "Open to internships, learning opportunities, and collaborative projects"
    },
    bio: "Raunak Sharma is a passionate and self-motivated software developer with a strong interest in web development, Java programming, and modern digital solutions. He enjoys building interactive, realistic, and user-friendly applications that focus on both functionality and user experience. He approaches development with curiosity, patience, and a strong desire to understand how things work behind the scenes.",
    education: {
        academic: "Pursuing Computer Science and Software Development fundamentals.",
        philosophy: "Raunak actively invests time in self-learning. He studies programming fundamentals deeply, builds real-world projects, destroys and fixes systems to learn, and focuses on debugging and optimization."
    },
    projects: {
        web: [
            {
                name: "Personal Portfolio Website",
                tech: "HTML, CSS, JavaScript",
                details: "Fully responsive, dark/light mode toggle, dynamic time-based greetings, smooth animations, and hosted on GitHub Pages."
            },
            {
                name: "Contact & User Interaction System",
                tech: "HTML, JS, Google Forms",
                details: "Features email-based message delivery, Google Form integration for feedback, and realistic UI transitions."
            }
        ],
        java: [
            {
                name: "Number Game",
                tech: "Java Console",
                details: "Uses loops, conditionals, and user input to strengthen logical thinking and flow control."
            },
            {
                name: "Student Grade Calculator",
                tech: "Java",
                details: "Calculates grades based on conditions, demonstrating decision-making and input validation."
            },
            {
                name: "ATM Interface",
                tech: "Java",
                details: "Simulates real-world ATM operations (balance, deposit, withdrawal) using core Java concepts."
            }
        ]
    },
    skills: {
        languages: ["Java", "JavaScript", "HTML", "CSS"],
        concepts: ["Object-Oriented Programming (OOP)", "DOM Manipulation", "Responsive Web Design", "UI/UX Fundamentals", "Logic Building", "Debugging & Optimization"],
        tools: ["Git & GitHub", "GitHub Pages", "Replit", "Google Antigravity IDE", "VS Code"]
    },
    philosophy: "Raunak strongly believes that learning is an endless process. He continuously works on improving his skills, revisiting fundamentals, and exploring new tools. Mistakes are seen as learning opportunities, and growth is treated as a daily habit.",
    careerVision: "To become a proficient full-stack software developer, work on meaningful real-world applications, build intelligent AI-assisted systems, and contribute positively to the technology ecosystem."
};

// Response generators for variety
const responses = {
    greeting: [
        "Hello! 👋 I'm ready to answer questions about Raunak's Work, Skills, or Contact details.",
        "Hi there! I'm Raunak's AI assistant. Ask me anything about his coding journey! 🚀",
        "Greetings! 🌟 I can help you navigate Raunak's portfolio. What's on your mind?"
    ],
    identity: [
        "I am Raunak's personal AI Assistant, trained on his complete professional portfolio to give you accurate insights.",
        "I'm a virtual assistant designed to showcase Raunak's skills and projects. I know his professional bio inside out! 🤖",
    ],
    fallback: [
        "I can tell you about Raunak's **Skills**, **Projects**, **Education**, or **Career Vision**. What would you like to know?",
        "That's interesting! While I might not know everything, I can definitely tell you about Raunak's Java projects or Web development skills.",
        "I'm tuned to discuss Raunak's professional profile. Try asking about his **Projects** or **Contact Info**!"
    ]
};

const getRandomResponse = (key) => {
    const list = responses[key];
    return list[Math.floor(Math.random() * list.length)];
};

class Chatbot {
    constructor() {
        this.chatWindow = document.getElementById('chatbot-window');
        this.toggleBtn = document.getElementById('chatbot-toggle-btn');
        this.closeBtn = document.getElementById('close-chat');
        this.messagesContainer = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-chat-btn');

        this.isOpen = false;
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });

        // Add initial greeting with suggestions
        setTimeout(() => {
            this.addMessage("Hello! I'm Raunak's AI Assistant. I've been trained on his professional profile. How can I help you today? 🤖", 'bot');
            this.addSuggestions(["Tell me about Raunak", "Show his Projects", "What are his Skills?", "Contact Info"]);
        }, 500);
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.add('active');
            this.toggleBtn.classList.add('hidden');
            this.input.focus();
        } else {
            this.chatWindow.classList.remove('active');
            this.toggleBtn.classList.remove('hidden');
        }
    }

    handleUserMessage(msgText = null) {
        const message = msgText || this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';

        // Remove old suggestions
        this.removeSuggestions();

        // Simulate thinking delay
        this.showTypingIndicator();

        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response.text, 'bot');
            if (response.suggestions) {
                this.addSuggestions(response.suggestions);
            }
        }, 800 + Math.random() * 800);
    }

    addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('chat-message', sender);

        if (sender === 'bot') {
            div.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-robot bot-icon"></i>
                    <p>${text}</p>
                </div>
            `;
        } else {
            div.innerHTML = `<p>${text}</p>`;
        }

        this.messagesContainer.appendChild(div);
        this.scrollToBottom();
    }

    addSuggestions(suggestions) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.classList.add('chat-suggestions');
        suggestionsDiv.id = 'current-suggestions';

        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.textContent = suggestion;
            btn.classList.add('suggestion-chip');
            btn.addEventListener('click', () => this.handleUserMessage(suggestion));
            suggestionsDiv.appendChild(btn);
        });

        this.messagesContainer.appendChild(suggestionsDiv);
        this.scrollToBottom();
    }

    removeSuggestions() {
        const oldSuggestions = document.getElementById('current-suggestions');
        if (oldSuggestions) oldSuggestions.remove();
    }

    showTypingIndicator() {
        const div = document.createElement('div');
        div.classList.add('chat-message', 'bot', 'typing-indicator');
        div.id = 'typing-indicator';
        div.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot bot-icon"></i>
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(div);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    generateResponse(input) {
        const lowerInput = input.toLowerCase();
        let response = { text: "", suggestions: [] };

        // 1. Greetings
        if (lowerInput.match(/\b(hi|hello|hey|greetings|start|begin)\b/)) {
            response.text = getRandomResponse('greeting');
            response.suggestions = ["Who is Raunak?", "What projects has he made?", "Skills & Tools"];
            return response;
        }

        // 2. Identity / Bio
        if (lowerInput.match(/\b(who are you|your name)\b/)) {
            response.text = getRandomResponse('identity');
            response.suggestions = ["Tell me about Raunak", "Show me his projects"];
            return response;
        }
        if (lowerInput.match(/\b(who is raunak|about|bio|intro|profile)\b/)) {
            response.text = `${portfolioData.bio} He is open to internships and collaborative projects in ${portfolioData.identity.location}.`;
            response.suggestions = ["His Education", "His Career Vision", "Contact Him"];
            return response;
        }

        // 3. Education
        if (lowerInput.match(/\b(education|study|degree|college|university|learning)\b/)) {
            response.text = `🎓 **Education**: ${portfolioData.education.academic}\n\n💡 **Philosophy**: ${portfolioData.education.philosophy}`;
            response.suggestions = ["What are his skills?", "View Projects"];
            return response;
        }

        // 4. Skills
        if (lowerInput.match(/\b(skills|stack|tech|languages|tools|ide|concepts)\b/)) {
            const langs = portfolioData.skills.languages.join(", ");
            const concepts = portfolioData.skills.concepts.join(", ");
            response.text = `💻 **Tech Stack:**\n\n• **Languages**: ${langs}\n• **Concepts**: ${concepts}\n• **Tools**: VS Code, Replit, Google Antigravity IDE.`;
            response.suggestions = ["See Java Projects", "See Web Projects"];
            return response;
        }

        // 5. Projects
        if (lowerInput.match(/\b(projects|work|built|app|code|web|java)\b/)) {
            if (lowerInput.includes("java") || lowerInput.includes("console")) {
                response.text = "☕ **Java Projects:**\n\n• **ATM Interface**: Simulates banking operations (deposit, withdraw).\n• **Student Grade Calculator**: decision-making logic.\n• **Number Game**: Loop & conditional logic mastery.";
                response.suggestions = ["What about Web Projects?", "His Coding Philosophy"];
                return response;
            }
            if (lowerInput.includes("web") || lowerInput.includes("site") || lowerInput.includes("html")) {
                response.text = "🌐 **Web Projects:**\n\n• **Portfolio Website**: Responsive, dark mode, time-based greetings.\n• **Contact System**: Email delivery & Google Forms integration with realistic UI.";
                response.suggestions = ["What about Java Projects?", "Contact Info"];
                return response;
            }
            response.text = "Raunak has diverse projects in **Web Development** (Portfolio, Contact System) and **Java** (ATM, Number Game). Which area interests you?";
            response.suggestions = ["Show Web Projects", "Show Java Projects"];
            return response;
        }

        // 6. Philosophy
        if (lowerInput.match(/\b(philosophy|mindset|approach|style|process)\b/)) {
            response.text = `🧠 **Raunak's Philosophy:**\n"${portfolioData.philosophy}"`;
            response.suggestions = ["His Career Goals", "Projects"];
            return response;
        }

        // 7. Career Vision
        if (lowerInput.match(/\b(goal|vision|future|career|aim)\b/)) {
            response.text = `🚀 **Career Vision:**\n${portfolioData.careerVision}`;
            response.suggestions = ["Hire Him", "View Resume"];
            return response;
        }

        // 8. Contact
        if (lowerInput.match(/\b(contact|email|phone|call|hire|reach)\b/)) {
            response.text = `📬 **Get in Touch:**\n\n📧 Email: ${portfolioData.identity.email}\n📱 Phone: ${portfolioData.identity.phone}\n\nOr use the form below!`;
            response.suggestions = ["LinkedIn Profile", "GitHub Profile"];
            return response;
        }

        // 9. Resume
        if (lowerInput.match(/\b(resume|cv|download)\b/)) {
            response.text = "📄 You can download his resume from the top right button on the navbar!";
            return response;
        }

        // 10. Small Talk
        if (lowerInput.match(/\b(cool|awesome|great|thanks|thank you|good job)\b/)) {
            response.text = "You're welcome! Glad I could help. 😊 Is there anything else you'd like to know?";
            response.suggestions = ["Show Projects", "Contact Info"];
            return response;
        }

        // Default
        response.text = getRandomResponse('fallback');
        response.suggestions = ["Tell me about Raunak", "Show Projects", "Contact Info"];
        return response;
    }
}

// Initialize Chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
