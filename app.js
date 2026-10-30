/* ==========================================================================
   PORTFOLIO INTERACTIVITY SCRIPT — ROHIT KUMAR KUNCHA
   Cloud & DevOps Engineer | Platform Engineer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSkillsFilters();
  initPipelineSimulator();
  initContactCopy();
  initInteractiveAvatar();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('rohit_theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('rohit_theme', next);
      showToast(`Switched to ${next === 'dark' ? 'DevOps Dark' : 'Console Light'} mode`);
    });
  }
}

/* ==========================================================================
   2. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   3. Technical Skills Filter
   ========================================================================== */
function initSkillsFilters() {
  const filterButtons = document.querySelectorAll('.s-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filterValue === 'all' || cat === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive Cloud & DevOps Pipeline Simulator
   ========================================================================== */
const SIM_CONFIG = {
  cicd: {
    title: "Azure DevOps Multi-Stage CI/CD Pipeline (Space Defender)",
    stages: [
      { id: "s1", name: "1. Build & Lint", duration: "18s", icon: "📦" },
      { id: "s2", name: "2. Docker Containerize", duration: "42s", icon: "🐳" },
      { id: "s3", name: "3. ACR Push & Tag", duration: "25s", icon: "☁️" },
      { id: "s4", name: "4. App Service Smoke Test", duration: "19s", icon: "🚀" }
    ],
    logs: [
      "[00:00:01] ⚡ Webhook Triggered: commit 8f9b2c (main branch) by rj1825",
      "[00:00:04] 🔍 Linting HTML5/JS codebase & security scanning... 0 vulnerabilities found.",
      "[00:00:18] 🐳 Building multi-stage Docker image with Nginx base...",
      "[00:00:32] 🛡️ Injecting custom OWASP security headers (X-Frame-Options, CSP, HSTS)...",
      "[00:00:45] 🔑 Authenticating to Azure Container Registry via Entra ID Service Principal...",
      "[00:01:05] 📤 Pushing spacedefender:v2026.1.4 to spacedefenderacr.azurecr.io",
      "[00:01:25] 🚀 Executing rolling deployment to Azure App Service (Linux B1 tier)...",
      "[00:01:40] 🩺 Running automated smoke tests against /health and /metrics endpoints...",
      "[00:01:44] ✅ HTTP 200 OK — Latency 42ms. Zero downtime deployment verified!",
      "[00:01:45] 🎉 Deployment Succeeded. Mean Time to Detect (MTTD): < 2 minutes."
    ],
    note: "Demonstrates automated zero-touch delivery from code push to production with vulnerability scanning, Entra ID authentication, and automated smoke testing."
  },
  ha: {
    title: "Azure High-Availability Load Balancer & Availability Set",
    stages: [
      { id: "s1", name: "1. IaC Provisioning", duration: "3m 40s", icon: "📜" },
      { id: "s2", name: "2. Availability Set", duration: "Target 99.95%", icon: "🛡️" },
      { id: "s3", name: "3. TCP Health Probe", duration: "Every 5s", icon: "🩺" },
      { id: "s4", name: "4. Auto Failover", duration: "< 10s", icon: "⚖️" }
    ],
    logs: [
      "[00:00:00] 📜 Executing automated provisioning script: deploy-azure-infra.ps1",
      "[00:01:10] 🌐 Provisioned VNet (10.0.0.0/16) and Subnet (10.0.1.0/24) with strict NSG rules.",
      "[00:02:30] 🖥️ Created VM-Web-01 and VM-Web-02 inside Azure Availability Set (Fault Domain 2).",
      "[00:03:45] ⚖️ Configured Azure Standard Load Balancer (Public IP: 20.198.45.12).",
      "[00:04:15] 🩺 Health Probe: VM-Web-01 [HEALTHY], VM-Web-02 [HEALTHY] — Traffic 50/50.",
      "[SIMULATION] ⚠️ Simulating host hardware failure on VM-Web-01...",
      "[00:04:22] 🚨 Health Probe detected VM-Web-01 TCP:80 timeout (3 consecutive failed probes).",
      "[00:04:25] 🔄 ALB automatically redirected 100% incoming traffic to healthy VM-Web-02.",
      "[00:04:26] ✅ Zero packet drops for external users. 99.95% Availability SLA preserved!"
    ],
    note: "Highlights infrastructure resilience using Azure Availability Sets and Standard Load Balancer health probes to protect uptime during hardware failure."
  },
  mlops: {
    title: "Lumpy Skin Disease Deep Learning Pipeline (93% Accuracy)",
    stages: [
      { id: "s1", name: "1. Dataset Prep", duration: "5,000+ images", icon: "🖼️" },
      { id: "s2", name: "2. U-Net Segmentation", duration: "Dice Loss", icon: "🔬" },
      { id: "s3", name: "3. ResNet-50 Classifier", duration: "93% Acc", icon: "🧠" },
      { id: "s4", name: "4. Docker & FastAPI", duration: "Sub-second", icon: "⚡" }
    ],
    logs: [
      "[00:00:01] 📂 Ingesting cattle dermatological image dataset (5,000+ high-res samples)...",
      "[00:00:05] 🔄 Applying data augmentation (affine transforms, color jitter, normalization)...",
      "[00:00:15] 🔬 Executing U-Net segmentation branch for skin nodule boundary detection...",
      "[00:00:28] 🎯 Lesion mask calculated (Dice similarity score: 0.892).",
      "[00:00:40] 🧠 Running transfer learning classification with ResNet-50 backbone...",
      "[00:00:52] 📊 Model Output: Positive for Lumpy Skin Disease (Confidence: 94.8%).",
      "[00:01:05] 📦 PyTorch inference packaged into Docker container with FastAPI server.",
      "[00:01:12] ☁️ Checkpoints synced with AWS S3 bucket s3://cattle-disease-models/checkpoints/",
      "[00:01:15] ✅ Inference API Response Time: 340ms per image. Production ready."
    ],
    note: "Proves machine learning engineering depth: combining computer vision modeling (segmentation + classification) with production containerization and sub-second API serving."
  }
};

let currentSimKey = 'cicd';
let isSimulating = false;

function initPipelineSimulator() {
  const tabs = document.querySelectorAll('.pipe-tab');
  const runBtn = document.getElementById('runPipelineBtn');

  function renderSim(key) {
    currentSimKey = key;
    const sim = SIM_CONFIG[key];
    const container = document.getElementById('pipelineContent');

    if (!sim || !container) return;

    let stagesHtml = sim.stages.map((stage, idx) => `
      <div class="stage-node ${idx === 0 ? 'active-stage' : ''}" id="stage-${stage.id}">
        <div class="stage-status-icon">${stage.icon}</div>
        <div class="stage-title">${stage.name}</div>
        <div class="stage-duration">${stage.duration}</div>
      </div>
    `).join('');

    let logsHtml = sim.logs.map((log) => {
      let cls = 'log-entry';
      if (log.includes('✅') || log.includes('🎉')) cls += ' success';
      else if (log.includes('⚠️') || log.includes('🚨')) cls += ' warn';
      else if (log.includes('⚡') || log.includes('🔍')) cls += ' info';
      return `<div class="${cls}">${escapeHtml(log)}</div>`;
    }).join('');

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.35rem; color: var(--cyan-light); margin-bottom: 0.25rem;">${sim.title}</h3>
      </div>

      <div class="stage-flow" id="stageFlow">
        ${stagesHtml}
      </div>

      <div class="pipeline-terminal">
        <div class="term-header">
          <span>CONSOLE OUTPUT &bull; Azure DevOps Agent / bash</span>
          <span id="termStatus">STATUS: READY</span>
        </div>
        <div class="term-body" id="termBody">
          ${logsHtml}
        </div>
      </div>

      <div class="pipeline-notes-box">
        <h4>⚡ Engineering Value for Employers</h4>
        <p>${sim.note}</p>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (isSimulating) return;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSim(tab.getAttribute('data-pipe'));
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (isSimulating) return;
      runLiveSimulation();
    });
  }

  // Initial render
  renderSim('cicd');
}

function runLiveSimulation() {
  isSimulating = true;
  const runBtnLabel = document.getElementById('runBtnLabel');
  const termStatus = document.getElementById('termStatus');
  const termBody = document.getElementById('termBody');
  const sim = SIM_CONFIG[currentSimKey];

  if (runBtnLabel) runBtnLabel.innerText = "Simulating...";
  if (termStatus) termStatus.innerText = "STATUS: RUNNING PIPELINE";
  if (termBody) termBody.innerHTML = "";

  const stageNodes = document.querySelectorAll('.stage-node');
  stageNodes.forEach(node => {
    node.className = 'stage-node';
  });

  let logIndex = 0;
  const interval = setInterval(() => {
    if (logIndex < sim.logs.length) {
      const log = sim.logs[logIndex];
      const div = document.createElement('div');
      div.className = 'log-entry';
      if (log.includes('✅') || log.includes('🎉')) div.className += ' success';
      else if (log.includes('⚠️') || log.includes('🚨')) div.className += ' warn';
      else if (log.includes('⚡') || log.includes('🔍')) div.className += ' info';
      div.innerText = log;
      termBody.appendChild(div);
      termBody.scrollTop = termBody.scrollHeight;

      // Update stage nodes progress
      const stageIdx = Math.min(Math.floor((logIndex / sim.logs.length) * stageNodes.length), stageNodes.length - 1);
      stageNodes.forEach((node, idx) => {
        if (idx < stageIdx) {
          node.className = 'stage-node passed-stage';
        } else if (idx === stageIdx) {
          node.className = 'stage-node active-stage';
        }
      });

      logIndex++;
    } else {
      clearInterval(interval);
      stageNodes.forEach(node => node.className = 'stage-node passed-stage');
      if (termStatus) termStatus.innerText = "STATUS: COMPLETED (100% HEALTHY)";
      if (runBtnLabel) runBtnLabel.innerText = "Run Live Simulation";
      isSimulating = false;
      showToast("Pipeline simulation completed with 100% success!");
    }
  }, 350);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ==========================================================================
   5. Contact Info Copy & Form Submission
   ========================================================================== */
function initContactCopy() {
  const copyBtn = document.getElementById('copyContactBtn');
  const copyText = document.getElementById('copyContactText');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const contactData = `Rohit Kumar Kuncha
Cloud & DevOps Engineer
Phone: +91 62812 24094
Email: kuncharohitkumar2@gmail.com
GitHub: https://github.com/rj1825
LinkedIn: https://www.linkedin.com/in/rohitkumarkuncha
Location: Visakhapatnam, Andhra Pradesh, India
Specialties: Microsoft Azure, Docker, Kubernetes, CI/CD Pipelines, Java, Python, MLOps`;

      navigator.clipboard.writeText(contactData).then(() => {
        if (copyText) copyText.innerText = "Copied!";
        showToast("Rohit's contact card copied to clipboard!");
        setTimeout(() => {
          if (copyText) copyText.innerText = "Copy Card";
        }, 2500);
      }).catch(err => {
        showToast("Error copying details: " + err);
      });
    });
  }
}

window.handleContactSubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById('cName').value.trim();
  const org = document.getElementById('cOrg').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const role = document.getElementById('cRole').value;
  const message = document.getElementById('cMessage').value.trim();

  const subject = encodeURIComponent(`[DevOps / Cloud Opportunity] ${role} at ${org}`);
  const body = encodeURIComponent(
`Hi Rohit,

My name is ${name} from ${org} (${email}).

We would like to connect with you regarding the ${role} opening at our organization.

Message:
${message}

Best regards,
${name}
${org}`
  );

  const mailtoUrl = `mailto:kuncharohitkumar2@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;

  const feedback = document.getElementById('formFeedback');
  if (feedback) {
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
      <strong>✓ Email Draft Ready!</strong> Opening your default email client with your pre-filled inquiry. If it didn't open automatically, please send your email directly to <a href="mailto:kuncharohitkumar2@gmail.com" style="text-decoration:underline; font-weight:700;">kuncharohitkumar2@gmail.com</a>.
    `;
    feedback.classList.remove('hidden');
  }

  showToast("Inquiry prepared! Opening email client...");
};

/* ==========================================================================
   6. Toast Notification Helper
   ========================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerText = msg;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}


/* ==========================================================================
   5. Interactive Sri Tech Hero Avatar & 3-Zone Reactor
   ========================================================================== */
function initInteractiveAvatar() {
  const btnAnime = document.getElementById('btnSwitchAnime');
  const btnReal = document.getElementById('btnSwitchReal');
  const imgAnime = document.getElementById('avatarAnimeImg');
  const imgReal = document.getElementById('avatarRealImg');
  const bubble = document.getElementById('reactiveBubble');
  const speechText = document.getElementById('speechText');
  const profileCard = document.getElementById('interactiveProfileCard');
  const heroSection = document.getElementById('hero');

  if (!btnAnime || !btnReal || !imgAnime || !imgReal) return;

  // Toggle View
  btnAnime.addEventListener('click', () => {
    btnAnime.classList.add('active');
    btnReal.classList.remove('active');
    imgAnime.classList.add('active');
    imgReal.classList.remove('active');
    triggerSpeech("⚡ Switched to Anime Tech Avatar!");
  });

  btnReal.addEventListener('click', () => {
    btnReal.classList.add('active');
    btnAnime.classList.remove('active');
    imgReal.classList.add('active');
    imgAnime.classList.remove('active');
    triggerSpeech("📷 Switched to Real Profile Photo!");
  });

  function triggerSpeech(msg, holdMs = 2600) {
    if (!bubble || !speechText) return;
    speechText.textContent = msg;
    bubble.classList.add('active');
    clearTimeout(triggerSpeech.timer);
    triggerSpeech.timer = setTimeout(() => {
      bubble.classList.remove('active');
    }, holdMs);
  }

  // 3-Zone Cursor Reactivity over Hero
  if (heroSection) {
    let lastZone = null;
    heroSection.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 900) return;
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;

      let zone = 'center';
      if (x < 0.35) zone = 'left';
      else if (x > 0.65) zone = 'right';

      if (zone === lastZone) return;
      lastZone = zone;

      if (zone === 'left') {
        triggerSpeech("☁️ Inspecting cloud metrics & IaC provisioning?");
      } else if (zone === 'right') {
        triggerSpeech("⚡ Checking out the interactive avatar & CI/CD?");
      } else {
        triggerSpeech("👋 Hey! Welcome to my Cloud & DevOps space!");
      }
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      lastZone = null;
      if (bubble) bubble.classList.remove('active');
    });
  }

  // Smooth 3D tilt on profile card hover
  if (profileCard) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const activeImg = profileCard.querySelector('.profile-photo.active');
      if (activeImg) {
        activeImg.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
      }
    });

    profileCard.addEventListener('mouseleave', () => {
      const activeImg = profileCard.querySelector('.profile-photo.active');
      if (activeImg) {
        activeImg.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
      }
    });
  }
}
