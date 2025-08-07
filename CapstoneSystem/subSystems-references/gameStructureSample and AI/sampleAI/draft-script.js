class SmartAI {
    constructor() {
        this.dataset = [];  // Stores { input, response }
    }

    // Basic tokenizer
    tokenize(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    }

    // Jaccard similarity for simple NLP
    similarity(a, b) {
        const setA = new Set(this.tokenize(a));
        const setB = new Set(this.tokenize(b));
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        return intersection.size / union.size;
    }

    // Find best matching response
    getResponse(input) {
        if (this.dataset.length === 0) {
            return "I don't know anything yet. Can you teach me?";
        }

        let bestMatch = null;
        let bestScore = 0;

        for (let pair of this.dataset) {
            const score = this.similarity(input, pair.input);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = pair;
            }
        }

        if (bestScore > 0.3) {
            return bestMatch.response;
        } else {
            return "I'm not sure how to respond to that. Want to teach me?";
        }
    }

    // Learn from new input-response pair
    learn(input, response) {
        this.dataset.push({ input, response });
        return "Got it! I've learned something new.";
    }
}

// Example usage:
const ai = new SmartAI();

// Learn something
ai.learn("What is your name?", "I'm SmartAI.");
ai.learn("How are you doing?", "I'm functioning within normal parameters.");
ai.learn("Tell me a joke", "Why don't programmers like nature? Too many bugs.");

// Try inputs
console.log(ai.getResponse("What's your name?"));         // Similar to: What is your name?
console.log(ai.getResponse("Tell a joke."));              // Similar to: Tell me a joke
console.log(ai.getResponse("What is love?"));             // Not learned yet

// Teach it dynamically
console.log(ai.learn("What is love?", "Love is a human emotion I can't fully understand."));
console.log(ai.getResponse("What is love?"));             // Now it can respond!
