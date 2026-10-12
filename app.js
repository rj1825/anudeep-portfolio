/* ==========================================================================
   PORTFOLIO INTERACTIVITY SCRIPT — KUNCHA ANUDEEP DURGA PRASAD
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initCompetencyFilters();
  initClauseAuditSimulator();
  initContactCopy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;
  
  // Check persisted or system preference
  const savedTheme = localStorage.getItem('anudeep_theme');
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
      localStorage.setItem('anudeep_theme', next);
      showToast(`Switched to ${next === 'dark' ? 'Executive Dark' : 'Executive Light'} mode`);
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

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   3. Competencies Category Filter
   ========================================================================== */
function initCompetencyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillBoxes = document.querySelectorAll('.skill-box');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillBoxes.forEach(box => {
        const cat = box.getAttribute('data-cat');
        if (filterValue === 'all' || cat === filterValue) {
          box.style.display = 'flex';
          box.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive Contract Clause Audit Simulator
   ========================================================================== */
const CLAUSE_DATA = {
  indemnity: {
    title: "Vendor Agreement: Uncapped & Consequential Indemnification",
    badClause: `“Vendor shall defend, indemnify, and hold harmless Enterprise and its affiliates from and against any and all claims, damages, losses, costs, liabilities, and expenses (including unlimited legal fees and indirect or consequential damages) arising out of or related to this Agreement or Vendor's performance hereunder.”`,
    badRisk: `High Enterprise Exposure: Opens the company to unbounded indirect damages, lost profits, and liability even when damages are caused by third parties or minor delays.`,
    goodClause: `“Subject to Section [Liability Cap], Vendor shall indemnify and defend Enterprise against direct third-party claims arising solely from Vendor's gross negligence, willful misconduct, or material breach of confidentiality, provided that Vendor's total aggregate liability under this Section shall not exceed 100% of the total fees paid under this Agreement in the twelve (12) months preceding the claim. Neither party shall be liable for indirect, punitive, or consequential damages.”`,
    goodAdvantage: `Balanced Protection: Insulates the vendor from ruinous speculative damages, restricts triggers to direct faults, and caps exposure to the actual commercial economic value of the contract.`,
    takeaway: `“As your in-house counsel, I ensure that boilerplate indemnity clauses never bypass our agreed limitation of liability or expose us to open-ended market volatility.”`
  },
  arbitration: {
    title: "Commercial Contract: Flawed Unilateral Dispute Clause",
    badClause: `“All disputes arising in connection with this contract shall be referred solely to the Managing Director of Enterprise, whose unilateral decision shall be final and binding on both parties, with sole jurisdiction at New Delhi.”`,
    badRisk: `Statutory Invalidation Risk: Unilateral appointment of arbitrators is legally void under Section 12(5) and the 7th Schedule of the Arbitration & Conciliation Act, 1996 (as per Perkins Eastman & TRF Ltd). Results in lengthy litigation to set aside the clause.`,
    goodClause: `“Any dispute arising out of or in connection with this Agreement shall be referred to and finally resolved by arbitration administered in accordance with the Arbitration & Conciliation Act, 1996. The arbitral tribunal shall consist of a sole arbitrator appointed by mutual consent of both parties within 30 days of invocation, or failing agreement, in accordance with Section 11. The seat and venue of arbitration shall be Visakhapatnam / Hyderabad, and proceedings conducted in English.”`,
    goodAdvantage: `Strict Statutory Compliance: Formulates an unassailable, neutral arbitration mechanism that fast-tracks dispute resolution, eliminates judicial setting-aside risks, and provides clarity of forum.`,
    takeaway: `“My direct experience studying arbitration procedures at RINL ensures dispute resolution clauses are legally enforceable from Day One under the latest Supreme Court jurisprudence.”`
  },
  ipr: {
    title: "Software & Technology Vendor: Overbroad IP Assignment",
    badClause: `“All intellectual property, code, algorithms, methodologies, techniques, and ideas developed, utilized, or conceived by Service Provider in any manner during the term of this engagement shall become the exclusive sole property of Client upon inception.”`,
    badRisk: `Existential Asset Loss: The service provider unintentionally surrenders its pre-existing core software libraries, general methodologies, and background IP to a single client.`,
    goodClause: `“Client shall solely own all custom deliverables created specifically and uniquely for Client under the applicable SOW (Foreground IP). Service Provider retains all right, title, and interest in and to its pre-existing tools, generic frameworks, methodologies, and standard libraries (Background IP). Service Provider hereby grants Client a perpetual, non-exclusive, worldwide license to utilize Background IP embedded within Deliverables solely for Client's internal business operations.”`,
    goodAdvantage: `IP Safeguard: Decouples proprietary background tech from custom client deliverables, protecting company enterprise valuation while granting the client full operational utility.`,
    takeaway: `“Having authored research into AI & IPR intersections, I protect company proprietary assets and prevent inadvertent licensing forfeiture in vendor transactions.”`
  },
  termination: {
    title: "Procurement Agreement: Immediate Termination Without Cure Period",
    badClause: `“Enterprise reserves the right to terminate this Agreement immediately with immediate effect upon notice for any perceived breach, and Vendor shall refund all sums received to date.”`,
    badRisk: `Cashflow & Operational Shock: Permits arbitrary contract cancellation over trivial discrepancies without an opportunity to rectify, coupled with an unenforceable forfeiture penalty.`,
    goodClause: `“Either party may terminate this Agreement upon written notice if the other party commits a material breach and fails to remedy such breach within thirty (30) days of receipt of written notification specifying the breach. In the event of termination, Client shall promptly pay Service Provider for all conforming services rendered and non-cancelable commitments incurred up to the effective termination date.”`,
    goodAdvantage: `Commercial Security: Grants a mandatory 30-day cure window to preserve the business relationship, prevents frivolous cancellation, and guarantees pro-rata payment for delivered value.`,
    takeaway: `“I align contract governance with practical cashflow protection, ensuring clean exit mechanics that avoid messy legal disputes.”`
  }
};

function initClauseAuditSimulator() {
  const tabs = document.querySelectorAll('.clause-tab');
  const auditBody = document.getElementById('auditBody');

  function renderClause(clauseKey) {
    const data = CLAUSE_DATA[clauseKey];
    if (!data) return;

    auditBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.35rem; color: var(--gold-light); margin-bottom: 0.25rem;">${data.title}</h3>
      </div>

      <div class="audit-grid">
        <!-- Risky Clause Column -->
        <div class="audit-col">
          <div class="audit-col-header" style="color: #f87171;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <span>Draft with High Legal Risk</span>
          </div>
          <div class="audit-bad-clause">${data.badClause}</div>
          <div style="font-size: 0.85rem; color: #fca5a5; line-height: 1.5;">
            <strong>⚠️ Identified Risk:</strong> ${data.badRisk}
          </div>
        </div>

        <!-- Anudeep Redlined Solution Column -->
        <div class="audit-col">
          <div class="audit-col-header" style="color: #34d399;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/></svg>
            <span>Anudeep's Redline &amp; Negotiated Clause</span>
          </div>
          <div class="audit-good-clause">${data.goodClause}</div>
          <div style="font-size: 0.85rem; color: #6ee7b7; line-height: 1.5;">
            <strong>🛡️ Enterprise Advantage:</strong> ${data.goodAdvantage}
          </div>
        </div>
      </div>

      <div class="risk-analysis-box">
        <h4>
          <span>⚖️ Counsel Takeaway for Hiring Organizations</span>
        </h4>
        <p>${data.takeaway}</p>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-clause');
      renderClause(key);
    });
  });

  // Initial render
  renderClause('indemnity');
}

/* ==========================================================================
   5. Publications Modal System
   ========================================================================== */
const PUBLICATIONS_METADATA = [
  {
    title: "Revealing the Benefits under the ESI Act",
    journal: "Indian Journal of Law and Legal Research (IJLLR)",
    badge: "Peer-Reviewed Labor Jurisprudence",
    body: `
      <h4>Research Context & Objective</h4>
      <p>The Employees' State Insurance Act (ESI Act), 1948 represents one of India's foundational social security statutes. This paper examines the evolving statutory responsibilities of commercial employers, the scope of insured employee benefits (sickness, maternity, disablement, and funeral benefits), and the administrative friction points in statutory claims processing.</p>
      
      <h4 style="margin-top: 1rem;">Core Legal Insights</h4>
      <ul style="padding-left: 1.25rem; margin: 0.5rem 0;">
        <li>Critical assessment of employer contribution compliance thresholds and punitive interest liabilities for delayed remittance.</li>
        <li>Analysis of judicial precedents reconciling factory vs. establishment boundaries under Section 2(12).</li>
        <li>Strategic guidelines for corporate HR and Legal departments to conduct proactive internal compliance audits, eliminating surprise inspections and statutory penalties.</li>
      </ul>

      <h4 style="margin-top: 1rem;">Corporate Application</h4>
      <p>Equips corporate legal and HR operations with a preventative compliance checklist to shield organizations from criminal prosecution notices and interest surcharges under labor inspection regimes.</p>
    `
  },
  {
    title: "A Critical Analysis of Bangalore Water Supply v. A. Rajappa",
    journal: "Legal Services India",
    badge: "Landmark Supreme Court Jurisprudence",
    body: `
      <h4>Research Context & Objective</h4>
      <p>A deep jurisprudential analysis of Justice V.R. Krishna Iyer's 7-judge Constitution Bench verdict in <em>Bangalore Water Supply & Sewerage Board v. A. Rajappa (1978)</em>, which established the expansive 'triple test' defining an 'industry' under Section 2(j) of the Industrial Disputes Act, 1947.</p>
      
      <h4 style="margin-top: 1rem;">Core Legal Insights</h4>
      <ul style="padding-left: 1.25rem; margin: 0.5rem 0;">
        <li>Deconstruction of the Triple Test: (i) Systematic activity, (ii) Organized cooperation between employer and employee, (iii) Production/distribution of goods and services calculated to satisfy human desires.</li>
        <li>Examination of the contentious coverage of educational institutions, research labs, hospitals, and charitable trusts under industrial disputes jurisdiction.</li>
        <li>Evaluation of sovereign functions vs. commercial welfare activities of statutory boards and state instrumentalities.</li>
      </ul>

      <h4 style="margin-top: 1rem;">Corporate Application</h4>
      <p>Enables businesses operating in modern services, IT, education, or healthcare sectors to accurately assess workforce classification, collective bargaining exposure, and strike liabilities.</p>
    `
  },
  {
    title: "Concept of Bailment under the Indian Contract Act",
    journal: "Legal Services India",
    badge: "Commercial Contract Law",
    body: `
      <h4>Research Context & Objective</h4>
      <p>Explores Chapter IX (Sections 148-181) of the Indian Contract Act, 1872 regarding bailment contracts—an essential foundation for modern supply chain logistics, warehousing, carriage of goods, and cloud/hardware leasing.</p>
      
      <h4 style="margin-top: 1rem;">Core Legal Insights</h4>
      <ul style="padding-left: 1.25rem; margin: 0.5rem 0;">
        <li>Standard of Care: Analyzing the non-derogable standard of care incumbent upon bailees under Section 151 and exceptions under Section 152.</li>
        <li>Enforceability of Exemption Clauses: When limitation of liability clauses protecting bailees (e.g., dry cleaners, freight forwarders, warehousemen) are struck down for fundamental breach or unconscionability.</li>
        <li>Bailee's Particular Lien vs. General Lien (Section 170 & 171) in commercial contract enforcement.</li>
      </ul>

      <h4 style="margin-top: 1rem;">Corporate Application</h4>
      <p>Provides actionable guidance for drafting warehousing, third-party logistics (3PL), and asset bailment agreements with enforceable damage caps and clear risk-of-loss transfer terms.</p>
    `
  },
  {
    title: "Artificial Intelligence and Intellectual Property Rights (AI and IPR)",
    journal: "Specialized Research Paper & Certification",
    badge: "Emerging Technology & Digital Assets",
    body: `
      <h4>Research Context & Objective</h4>
      <p>Addresses one of the most critical legal challenges of the 21st century: How existing copyright, patent, and trademark regimes adapt to autonomous generative artificial intelligence models and enterprise algorithmic tools.</p>
      
      <h4 style="margin-top: 1rem;">Core Legal Insights</h4>
      <ul style="padding-left: 1.25rem; margin: 0.5rem 0;">
        <li>The Authorship Dilemma: Evaluating whether AI systems can be recognized as authors under the Indian Copyright Act (Section 2(d)) vs. the requirement of 'human intellect' and 'modicum of creativity'.</li>
        <li>Training Data & Fair Dealing: Legal exposure surrounding web scraping, copyrighted datasets, and emerging infringement actions.</li>
        <li>Enterprise Risk Mitigation: How businesses deploying GenAI internally can formulate safe usage policies, avoid trade secret leaks, and structure ownership of AI-assisted deliverables.</li>
      </ul>

      <h4 style="margin-top: 1rem;">Corporate Application</h4>
      <p>Direct value for tech companies, SaaS providers, and enterprises implementing AI tools to draft internal AI usage guidelines, client warranties, and data usage covenants.</p>
    `
  },
  {
    title: "The Significance of Legal Rights",
    journal: "Legal Services India",
    badge: "Jurisprudence & Legal Philosophy",
    body: `
      <h4>Research Context & Objective</h4>
      <p>Investigates the jurisprudential taxonomy of legal rights based on Sir John Salmond and Wesley Newcomb Hohfeld's analysis of jural correlatives and jural opposites (Rights/Duties, Privileges/No-rights, Powers/Liabilities, Immunities/Disabilities).</p>
      
      <h4 style="margin-top: 1rem;">Core Legal Insights</h4>
      <ul style="padding-left: 1.25rem; margin: 0.5rem 0;">
        <li>The nexus between substantive statutory rights and procedural legal remedies (<em>Ubi jus ibi remedium</em>).</li>
        <li>Distinction between rights in rem (rights against the world) vs. rights in personam (contractual covenants between parties).</li>
        <li>Structuring contractual clauses with clean bilateral obligations, eliminating ambiguous declarations that fail the test of judicial enforceability.</li>
      </ul>

      <h4 style="margin-top: 1rem;">Corporate Application</h4>
      <p>Gives precision to contractual drafting: every covenant, warranty, and indemnification is drafted with an exact corresponding obligation and enforcement remedy.</p>
    `
  }
];

window.openPubModal = function(index) {
  const pub = PUBLICATIONS_METADATA[index];
  if (!pub) return;

  document.getElementById('mBadge').innerText = pub.badge;
  document.getElementById('mTitle').innerText = pub.title;
  document.getElementById('mJournal').innerText = `Published in: ${pub.journal}`;
  document.getElementById('mBody').innerHTML = pub.body;

  const modal = document.getElementById('pubModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closePubModal = function() {
  const modal = document.getElementById('pubModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Close modal on backdrop click or Escape key
document.getElementById('pubModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'pubModal') {
    closePubModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePubModal();
  }
});

/* ==========================================================================
   6. Contact Info Copy & Form Submission
   ========================================================================== */
function initContactCopy() {
  const copyBtn = document.getElementById('copyContactBtn');
  const copyText = document.getElementById('copyContactText');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const contactData = `Kuncha Anudeep Durga Prasad
Corporate & Commercial Legal Counsel
Email: anudeepkuncha@gmail.com
Phone: +91 7095939730
Location: Visakhapatnam, Andhra Pradesh, India
Credentials: LL.M (Corporate Law) | BBA LL.B (Hons)`;

      navigator.clipboard.writeText(contactData).then(() => {
        if (copyText) copyText.innerText = "Copied!";
        showToast("Contact card copied to clipboard!");
        setTimeout(() => {
          if (copyText) copyText.innerText = "Copy Details";
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

  const subject = encodeURIComponent(`[Legal Career Inquiry / Interview] ${role} - ${org}`);
  const body = encodeURIComponent(
`Dear Anudeep,

My name is ${name} from ${org} (${email}).

We are reaching out regarding the position / opportunity of: ${role}.

Message:
${message}

Best regards,
${name}
${org}`
  );

  const mailtoUrl = `mailto:anudeepkuncha@gmail.com?subject=${subject}&body=${body}`;

  // Open email client
  window.location.href = mailtoUrl;

  const feedback = document.getElementById('formFeedback');
  if (feedback) {
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
      <strong>✓ Email Draft Ready!</strong> Opening your default email client with your pre-filled inquiry. If it didn't open automatically, please send your email directly to <a href="mailto:anudeepkuncha@gmail.com" style="text-decoration:underline; font-weight:700;">anudeepkuncha@gmail.com</a>.
    `;
    feedback.classList.remove('hidden');
  }

  showToast("Inquiry prepared! Opening email client...");
};

/* ==========================================================================
   7. Toast Notification Helper
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
