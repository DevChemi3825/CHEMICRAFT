// tutorial.js

let tutorialSteps = [
  {
    element: ".language-selector",
    message:
      "🌐 This is the Language Selector. Switch between English (EN) and Indonesian (ID).",
  },
  {
    element: "#flaskii",
    message:
      "👋 Meet Flaskii! Flaskii is your chemistry buddy who reacts and gives you tips.",
  },
  {
    element: "#start-section",
    message:
      "📚 Here you can start challenges: Puzzle, Quiz, and Periodic Table Quiz.",
  },
  {
    element: "#periodic-table",
    message:
      "🧪 This is the Periodic Table. Click an element to unlock or add it to the mixing area.",
  },
  {
    element: "#mixing-area",
    message:
      "🧬 This is the Mixing Area. Drag or click elements here to prepare a combination.",
  },
  {
    element: "#mix-btn",
    message:
      "🎯 Press the Mix button to combine selected elements and see the result!",
  },
  {
    element: "#reset-btn",
    message: "❌ This button clears the Mixing Area.",
  },
  {
    element: "#vault-btn",
    message:
      "📦 This is the Element Vault. See all the compounds and elements you’ve discovered.",
  },
  {
    element: "#sound-toggle",
    message: "🔊 Use this to toggle music and sound effects.",
  },
  {
    element: "#flaskii",
    message:
      "🎉 That’s it! Flaskii wishes you fun exploring chemistry in Chemicraft!",
  },
];

let currentStep = 0;

function startTutorial() {
  currentStep = 0;
  showStep();
}

function showStep() {
  const step = tutorialSteps[currentStep];
  const target = document.querySelector(step.element);
  if (!target) return;

  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "tutorial-overlay";
  document.body.appendChild(overlay);

  // Highlight element
  target.classList.add("tutorial-highlight");
  target.scrollIntoView({ behavior: "smooth", block: "center" });

  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "tutorial-tooltip";
  tooltip.innerHTML = `
    <p>${step.message}</p>
    <button id="next-tutorial">Next</button>
    <button id="end-tutorial">End</button>
  `;
  document.body.appendChild(tooltip);

  // Button actions
  document.getElementById("next-tutorial").onclick = () => {
    target.classList.remove("tutorial-highlight");
    tooltip.remove();
    overlay.remove();
    currentStep++;
    if (currentStep < tutorialSteps.length) showStep();
  };

  document.getElementById("end-tutorial").onclick = () => {
    target.classList.remove("tutorial-highlight");
    tooltip.remove();
    overlay.remove();
  };
}

// Attach to button
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("open-tutorial")
    .addEventListener("click", startTutorial);
});
