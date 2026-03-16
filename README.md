# Architect GPT: The Codebase Anthropologist

Architect GPT is a deep-tissue diagnostic tool designed to uncover the **Semantic Intent** hidden within software architectures. Unlike standard documentation generators that simply summarize what code *does*, Architect GPT analyzes the *philosophy*—explaining why design patterns were chosen and how modules interact at a skeletal level.

## 🧠 The Philosophy: "Codebase Anthropology"

In the friction of feature requests and deadlines, the original architectural intent often becomes obscured. Architect GPT acts as an anthropologist, stripping back layers of technical debt to reveal:
- **Executive Intent:** The core value proposition of the system.
- **Modular Blueprint:** The "Contractual Responsibilities" of each module.
- **Reasoning Trace:** How complex logic flows through the system.
- **Architectural Health Audit:** Identifying risks and areas for modular improvement.

## 🚀 Features

- **Multi-File Analysis:** Upload multiple source files simultaneously or paste raw text using standardized separators (`--- filename ---`).
- **Semantic Inference:** Powered by Google Gemini 2.5 Flash via Genkit, performing multi-step reasoning:
  1. *Structural Inference:* Identifying the "Entry Point" and "Core Engine."
  2. *Logic Decomposition:* Breaking down "Jobs-to-be-Done."
  3. *Documentation Synthesis:* Generating a structured `SYSTEM_ARCHITECTURE.md`.
- **Professional Export:** Download the synthesized architecture document directly as Markdown.
- **Modern UI:** A high-fidelity, dark-themed interface built with ShadCN UI and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **AI Orchestration:** [Genkit 1.x](https://firebase.google.com/docs/genkit)
- **Model:** [Google Gemini 2.5 Flash](https://ai.google.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- A Google AI (Gemini) API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Zearf/Architect-GPT.git
   cd Architect-GPT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
   ```

### Running the App

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## 📦 Deployment

### Firebase App Hosting (Recommended)
This app is optimized for Firebase. To deploy:
1. Connect your GitHub repository in the [Firebase Console](https://console.firebase.google.com/).
2. Select **App Hosting** and follow the setup wizard.
3. Add your `GOOGLE_GENAI_API_KEY` to the environment variables in the App Hosting settings.

### Netlify
1. Push your code to GitHub.
2. Connect the repository to Netlify.
3. Ensure the Build Command is `npm run build` and the Publish Directory is `.next`.
4. Add `GOOGLE_GENAI_API_KEY` to your site's Environment Variables.

## 📂 Project Structure

- `src/ai/`: Genkit configuration and AI flows.
- `src/app/`: Next.js pages and Server Actions.
- `src/components/`: React components (UI and specialized analyzer components).
- `src/hooks/`: Custom React hooks for UI state.

---

*Built with ❤️ by Principia Architecture.*
