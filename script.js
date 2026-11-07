// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

// Program finder (Programs page)
const quiz = document.getElementById("program-finder");
if (quiz) {
  quiz.addEventListener("submit", (e) => {
    e.preventDefault();
    const stage = quiz.stage.value;
    const hours = quiz.hours.value;
    let program, focus, step;

    if (stage === "idea") {
      program = "Small Business Unlocked (180 Days)";
      focus = "Validate your idea and set up the foundation: offer, pricing, and legal structure.";
      step = "Write down who your first customer is and the one problem you solve for them.";
    } else if (stage === "side") {
      program = "Side Hustle";
      focus = "Turn what you already know into a structured offer you can run alongside your 9-5.";
      step = "List three skills from your job that someone would pay for.";
    } else if (stage === "early") {
      program = "90-Day Roadmap";
      focus = "Get financial clarity and put simple systems in place so revenue becomes consistent.";
      step = "Pull your last 3 months of income and expenses into one sheet.";
    } else {
      program = "90-Day Roadmap";
      focus = "Fix margins, cash leaks, and bottlenecks so the business can scale without you.";
      step = "Write down the three tasks only you can do today, and who could take them over.";
    }

    if (hours === "under5" && stage !== "established") {
      step += " With under 5 hours a week, block one fixed time slot and protect it.";
    }

    document.getElementById("quiz-result").innerHTML =
      `<h3>Recommended: ${program}</h3>
       <p><strong>Focus first:</strong> ${focus}</p>
       <p><strong>Your next step this week:</strong> ${step}</p>
       <div class="btn-row"><a class="btn btn-gold" href="/contact">Talk to Glen</a></div>`;
  });
}

// Contact form: opens the visitor's email app with the message filled in
const contact = document.getElementById("contact-form");
if (contact) {
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contact.name.value.trim();
    const email = contact.email.value.trim();
    const phone = contact.phone.value.trim();
    const message = contact.message.value.trim();
    const subject = encodeURIComponent(`New inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:glen@trifectaadvisor.co?subject=${subject}&body=${body}`;
  });
}

// Welcome pop-up: shows once per visit, a moment after the page loads
(function () {
  const FORM = "https://docs.google.com/forms/d/1lLvw_jfb3Lylcxi_b9yChQI-BmFZvieyubU8OPuXAUA/edit";
  let seen = false;
  try { seen = sessionStorage.getItem("trifectaPopupSeen") === "1"; } catch (e) {}
  if (seen) return;

  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  overlay.innerHTML = `
    <div class="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <button class="popup-close" aria-label="Close">&times;</button>
      <span class="eyebrow">Start here</span>
      <h2 id="popup-title">Not sure where to begin?</h2>
      <p>Take the free assessment &mdash; two minutes, no cost &mdash; and see which program fits where you are right now.</p>
      <a class="btn btn-gold" href="${FORM}" target="_blank" rel="noopener">Take the free assessment</a>
      <a class="btn btn-outline" href="/contact">Or book a session with Glen</a>
      <small>No cost. No obligation.</small>
    </div>`;
  document.body.appendChild(overlay);

  function close() {
    overlay.classList.remove("show");
    try { sessionStorage.setItem("trifectaPopupSeen", "1"); } catch (e) {}
  }
  overlay.querySelector(".popup-close").addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  overlay.querySelectorAll(".popup .btn").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  setTimeout(() => overlay.classList.add("show"), 1500);
})();
