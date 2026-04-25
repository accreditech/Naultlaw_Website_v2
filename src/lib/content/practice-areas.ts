export type PracticeAreaContent = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  /** Optional narrative paragraphs rendered below the editorial-pull intro.
      Use to expand on the intro with stories, examples, or context. */
  narrative?: string[];
  summary: string;
  whoItIsFor: string[];
  commonProblems: string[];
  whyTimingMatters: string;
  approach: string;
  commonMistakes: string[];
  faqs: { question: string; answer: string }[];
  localServiceArea: string;
  issueTypes: string[];
  featured: boolean;
};

export const practiceAreas: PracticeAreaContent[] = [
  {
    slug: "commercial-leasing",
    title: "Commercial Leasing",
    shortTitle: "Commercial Leasing",
    metaTitle: "Commercial Leasing Counsel in Gallatin and Sumner County",
    metaDescription:
      "Practical commercial leasing counsel for owners, investors, landlords, tenants, brokers, and property managers across Gallatin and the surrounding counties.",
    eyebrow: "Practice Area",
    intro:
      "A commercial lease is often the most important contract a business signs — and the law it operates under is the contract itself. Tennessee courts assume commercial parties are sophisticated and will enforce one-sided terms as written. A great business can be lost on a bad lease.",
    narrative: [
      "The leverage hides in the clauses. Early in his career, Mr. Nault saw how one sentence in a small Boston sub shop's lease likely saved the owner from bankruptcy. That term was an exclusivity right to sell \"sub-style sandwiches.\" As a result of this one sentence, the developer paid the owner $500,000 and gave him an early exit before bringing Panera into the same center. The locally owned shop closed months later, but the owner used the buyout to open two new locations. This one sentence was the difference between an early exit to bankruptcy court, and the ability to negotiate a term that saved his entire livelihood.",
      "In another lease, Mr. Nault represented a landlord who brought rent back to market value during a renewal. The tenant's residential agent missed that the \"base tax year\" for tax pass-throughs should have been reset as well. The industry practice was clear. Their representation however was not. That oversight cost the tenant nearly a million dollars over the remaining lease term.",
      "That is the nature of commercial leasing. The biggest dollars are often buried in sentences that do not look expensive until it is too late. While most business owners believe they can do it all, the ones that withstand the test of time know, lessons are easier taught than learned. Expertise comes through experience, and you don't have to learn those lessons the hard way.",
    ],
    summary:
      "Stephen Nault advises on letters of intent, lease drafting, amendments, defaults, guaranties, assignment questions, operating covenants, and exit planning for commercial properties.",
    whoItIsFor: [
      "Owners and investors acquiring, repositioning, or stabilizing income-producing property.",
      "Landlords and tenants negotiating retail, office, industrial, flex, and mixed-use space.",
      "Brokers and property managers who need counsel when lease language, notice issues, or defaults begin affecting the deal.",
    ],
    commonProblems: [
      "LOIs that leave critical economics, build-out risk, or guaranty exposure unresolved.",
      "Default notices, cure periods, CAM disputes, rent escalations, or operating covenant issues.",
      "Assignment, sublease, exclusive-use, co-tenancy, or estoppel certificate disputes.",
      "Property sale or refinancing questions that expose outdated leasing documents.",
      "Negotiations that have become positional and need a practical reset before litigation.",
    ],
    whyTimingMatters:
      "A lease problem usually gets more expensive once notice deadlines pass, tenant expectations harden, or a lender, buyer, or anchor tenant becomes involved. Early review often creates leverage that is lost later.",
    approach:
      "The work starts with the economics of the property, the operational realities of the parties, and the leverage built into the documents. From there, the goal is to tighten risk, preserve optionality, and resolve the dispute or document issue without wasting momentum.",
    commonMistakes: [
      "Treating a business lease like a form that can be cleaned up later.",
      "Sending default letters or informal emails without understanding waiver and notice consequences.",
      "Focusing only on rent while overlooking operating covenants, transfer rights, or personal liability.",
      "Waiting until financing, renewal, or sale is on the line before asking for a full document review.",
    ],
    faqs: [
      {
        question: "Can you review a lease before it is signed, even if the business terms are mostly settled?",
        answer:
          "Yes. That is often the best time to clean up risk allocation, guaranties, default language, repair obligations, assignment rights, and operating constraints without turning the transaction into a fight.",
      },
      {
        question: "Do you handle landlord-side and tenant-side leasing matters?",
        answer:
          "Yes. The focus is on commercial terms, business risk, and real estate operations rather than a one-size-fits-all playbook.",
      },
      {
        question: "What if the other side is already threatening suit?",
        answer:
          "The first step is to understand the lease, the notice posture, and the business objective. Some matters call for a measured written response, while others require immediate preservation and a stronger litigation posture.",
      },
    ],
    localServiceArea:
      "Based in Sumner County and primarily appearing in the Sumner, Wilson, Trousdale, Robertson, and Davidson County courts, Mr. Nault represents commercial leasing clients across the entire state of Tennessee. In lease work the goal is to keep matters out of court — careful drafting and early review are how that happens.",
    issueTypes: [
      "LOI or new lease review",
      "Default notice or cure dispute",
      "Assignment or sublease question",
      "Guaranty or personal liability concern",
      "Renewal, amendment, or estoppel issue",
    ],
    featured: true,
  },
  {
    slug: "trec-defense-and-realtor-complaints",
    title: "TREC Defense and Realtor Representation",
    shortTitle: "TREC Defense",
    metaTitle: "TREC Defense and Realtor Representation in Tennessee",
    metaDescription:
      "Counsel for brokers and agents responding to TREC complaints, disciplinary questions, brokerage disputes, and risk-sensitive licensing issues.",
    eyebrow: "Practice Area",
    intro: "A licensing complaint needs a disciplined response, not panic and not casual oversharing.",
    summary:
      "Stephen Nault helps brokers and agents respond to Tennessee Real Estate Commission complaints, brokerage investigations, transaction disputes, and related risk events that can affect licensing, reputation, and business continuity.",
    whoItIsFor: [
      "Principal brokers, affiliate brokers, and brokerage leaders facing a complaint, inquiry, or transaction-related allegation.",
      "Real estate professionals who need a measured written response before facts become fixed in the record.",
      "Referral sources who want experienced counsel involved early, before a manageable issue becomes a disciplinary problem.",
    ],
    commonProblems: [
      "TREC complaints tied to disclosure, advertising, earnest money, supervision, or transaction handling.",
      "Brokerage disputes involving commission entitlement, supervision breakdowns, or file-review problems.",
      "Demand letters from consumers, opposing parties, or counsel that run in parallel with a licensing concern.",
      "Risk events where the agent needs both practical counseling and a litigation-aware response strategy.",
      "Unclear recordkeeping or communication trails that need to be organized before a response is submitted.",
    ],
    whyTimingMatters:
      "Early statements can lock a licensee into positions that are difficult to explain later. Prompt review helps preserve context, identify the true issue, and respond in a way that is accurate, proportionate, and aligned with the larger business risk.",
    approach:
      "The response work focuses on chronology, documents, brokerage structure, and the practical realities of the transaction. The goal is not performative aggression. It is a careful, credible response that protects the professional and positions the matter for the best available resolution.",
    commonMistakes: [
      "Answering the complaint informally before the record is organized.",
      "Submitting more facts than necessary, including speculation or emotional commentary.",
      "Assuming a transaction complaint is only a licensing issue and not a broader dispute risk.",
      "Treating the matter as routine when it may affect brokerage supervision, referral relationships, or E&O reporting.",
    ],
    faqs: [
      {
        question: "Do you represent both individual agents and principal brokers?",
        answer:
          "Yes. The analysis often differs depending on supervision obligations, brokerage policy, and how the file was managed, but both roles benefit from a disciplined response.",
      },
      {
        question: "Should I send documents and a full narrative right away?",
        answer:
          "Stage one intake should stay high level. After conflict review and fit assessment, the office can request the documents and timeline needed for a more complete response.",
      },
      {
        question: "Can a TREC matter overlap with civil exposure?",
        answer:
          "Yes. Some complaints sit alongside commission disputes, contract claims, or threats of suit, which is why the response strategy should account for both fronts.",
      },
    ],
    localServiceArea:
      "Brokerage and licensing issues in Gallatin, Hendersonville, Lebanon, Springfield, Hartsville, and the surrounding counties often move fast because everyone knows the transaction community. That makes careful positioning even more important.",
    issueTypes: [
      "TREC complaint received",
      "Brokerage supervision issue",
      "Commission dispute",
      "Advertising or disclosure allegation",
      "Transaction file or recordkeeping concern",
    ],
    featured: true,
  },
  {
    slug: "operating-agreements-and-owner-disputes",
    title: "Operating Agreements and Owner Disputes",
    shortTitle: "Owner Disputes",
    metaTitle: "Operating Agreements and Owner Disputes Counsel in Tennessee",
    metaDescription:
      "Counsel for LLC members, shareholders, managers, and closely held business owners dealing with governance friction, deadlock, and control disputes.",
    eyebrow: "Practice Area",
    intro: "Owner conflicts are rarely just legal problems. They are control, information, and continuity problems.",
    summary:
      "Stephen Nault advises on operating agreements, governance clean-up, manager authority, buyout pressure, deadlock, fiduciary allegations, and closely held business disputes where preserving leverage matters.",
    whoItIsFor: [
      "LLC members and managers dealing with authority questions, accounting tension, or strategic deadlock.",
      "Businesses that need cleaner operating documents before growth, financing, or ownership changes.",
      "Owners trying to contain a dispute before it harms leases, vendors, employees, lenders, or customers.",
    ],
    commonProblems: [
      "Operating agreements that do not match the way the company actually operates.",
      "Disputes over member rights, distributions, access to records, or who can bind the company.",
      "Deadlock around capital calls, sale decisions, or the future of the business relationship.",
      "Personal relationship breakdowns spilling into governance and asset-control disputes.",
      "Real estate holding entities where owner conflict threatens the property itself.",
    ],
    whyTimingMatters:
      "Once records are withheld, accounts are moved, or major business decisions are made unilaterally, the dispute becomes harder and more expensive to unwind. Early intervention can protect both the company and the client's bargaining position.",
    approach:
      "The work begins with the governing documents, ownership economics, and actual operating reality. The goal is to identify pressure points quickly, separate emotion from business risk, and decide whether the matter calls for negotiated restructuring, buyout strategy, or formal dispute action.",
    commonMistakes: [
      "Using online forms that do not fit the capital structure or operational reality of the company.",
      "Waiting until access to books, accounts, or assets is already compromised.",
      "Escalating the conflict personally before clarifying authority and documentary support.",
      "Ignoring how the dispute affects real estate entities, leases, guaranties, or third-party contracts.",
    ],
    faqs: [
      {
        question: "Do you handle both preventative operating agreement work and active disputes?",
        answer:
          "Yes. Many disputes are made worse by thin or outdated agreements, so the practice includes both front-end governance work and conflict-driven problem solving.",
      },
      {
        question: "Can you help if the business owns investment property?",
        answer:
          "Yes. Owner disputes around real estate holding companies often need both governance analysis and a practical understanding of the underlying property operations.",
      },
      {
        question: "Is litigation always the next step?",
        answer:
          "No. Some matters are best handled through structured negotiation or targeted written demands. Others need faster formal action because business control or assets are at risk.",
      },
    ],
    localServiceArea:
      "Closely held businesses across Gallatin, Sumner County, Wilson County, Robertson County, and Trousdale County often blend operating companies with real estate entities. That overlap changes how owner disputes should be evaluated.",
    issueTypes: [
      "Operating agreement review",
      "Member or manager authority dispute",
      "Books and records access issue",
      "Buyout or deadlock conflict",
      "Real-estate-holding entity dispute",
    ],
    featured: true,
  },
  {
    slug: "business-contract-drafting-and-review",
    title: "Business Contract Drafting and Review",
    shortTitle: "Business Contracts",
    metaTitle: "Business Contract Drafting and Review in Gallatin",
    metaDescription:
      "Contract drafting and review for business owners, investors, contractors, and real estate professionals who need practical risk allocation and cleaner deal execution.",
    eyebrow: "Practice Area",
    intro: "A useful contract should shorten disputes, not silently manufacture them.",
    summary:
      "Stephen Nault drafts, reviews, and revises business agreements with attention to leverage, risk allocation, performance standards, dispute clauses, and what the parties will actually do after signing.",
    whoItIsFor: [
      "Business owners entering material vendor, services, sales, or strategic partner agreements.",
      "Real estate operators who need contracts aligned with asset, brokerage, or project realities.",
      "Contractors and managers who want cleaner obligations, payment terms, and dispute positioning.",
    ],
    commonProblems: [
      "Template agreements that do not match the transaction or leave material risk unassigned.",
      "Poorly defined scope, change-order, payment, indemnity, or termination language.",
      "Forum, arbitration, and attorney-fee clauses that create bad dispute posture later.",
      "Inconsistent definitions and exhibit references that cause operational confusion after execution.",
      "Urgent deals where the client needs a fast but commercially grounded review.",
    ],
    whyTimingMatters:
      "The best time to control dispute cost is before the agreement is signed. Once a conflict begins, vague drafting forces parties to argue over basic meaning instead of focusing on a business solution.",
    approach:
      "The contract review process asks what the client is trying to protect, what would actually go wrong if performance slips, and how a judge, arbitrator, or business counterparty would read the paper later. That keeps the drafting commercially useful.",
    commonMistakes: [
      "Using a borrowed template from a different deal type or state.",
      "Overfocusing on price and underweighting indemnity, default, and termination mechanics.",
      "Assuming litigation language is boilerplate when it controls leverage later.",
      "Signing under time pressure without aligning the document to the business objective.",
    ],
    faqs: [
      {
        question: "Can you do fast-turn contract review for a live deal?",
        answer:
          "Yes, where timing permits. The review still focuses on the points that most affect operational and dispute risk rather than redlining for the sake of volume.",
      },
      {
        question: "Do you work on agreements connected to real estate operations?",
        answer:
          "Yes. Many matters involve leases, brokerage relationships, management agreements, contractor work, and owner-side business arrangements.",
      },
      {
        question: "Do you only help when there is already a disagreement?",
        answer:
          "No. Preventive drafting is a core part of the practice because good documents often reduce downstream conflict and wasted time.",
      },
    ],
    localServiceArea:
      "Growing businesses across Gallatin and the surrounding counties often need contracts that fit owner-managed companies, project-based operations, and commercial real estate realities instead of national-form boilerplate.",
    issueTypes: [
      "Contract draft needed",
      "Contract review before signing",
      "Amendment or addendum review",
      "Indemnity or risk-allocation concern",
      "Termination or breach dispute",
    ],
    featured: false,
  },
  {
    slug: "real-estate-disputes",
    title: "Real Estate Disputes",
    shortTitle: "Real Estate Disputes",
    metaTitle: "Real Estate Dispute Counsel in Gallatin and Middle Tennessee",
    metaDescription:
      "Counsel for owners, investors, landlords, brokers, and managers navigating contract disputes, title issues, neighbor conflicts, construction disputes, liens, and foreclosure or trustee sales — across both commercial and residential real estate.",
    eyebrow: "Practice Area",
    intro: "Property disputes turn quickly from inconvenience to leverage problems.",
    summary:
      "Stephen Nault handles commercial and residential real estate disputes involving purchase agreements, easements, title-related problems, possession and use conflicts, brokerage issues, construction disputes, liens, and foreclosure or trustee sales.",
    whoItIsFor: [
      "Investors, owners, and operators dealing with transaction fallout or property-use conflict.",
      "Brokers and property professionals pulled into a dispute surrounding a deal or ongoing management.",
      "Businesses whose real estate problem affects occupancy, revenue, project timing, or financing.",
    ],
    commonProblems: [
      "Purchase and sale agreement disputes, earnest money conflicts, and failed closings.",
      "Boundary, access, easement, use-restriction, or neighboring-property disputes.",
      "Title, possession, occupancy, or post-closing obligation conflicts.",
      "Property-management and owner-vendor disputes tied to asset operation.",
      "Real estate matters where the client needs both business judgment and litigation readiness.",
    ],
    whyTimingMatters:
      "When deadlines, closings, occupancy, or lender expectations are in play, delay can eliminate options. Good early assessment helps preserve evidence, clarify the contract posture, and decide whether pressure should be applied or contained.",
    approach:
      "The work centers on documents, timeline, leverage, and the real-world value of the property position. Some matters need negotiated cleanup. Others need more formal dispute positioning to keep the other side from dictating the terms of resolution.",
    commonMistakes: [
      "Treating a property dispute as purely emotional rather than economic.",
      "Letting informal text messages or side deals substitute for clear written positions.",
      "Ignoring the effect of the dispute on title, financing, occupancy, or future sale.",
      "Waiting too long to gather the operative documents and communication history.",
    ],
    faqs: [
      {
        question: "Do you only handle disputes tied to commercial property?",
        answer:
          "No — the practice covers both commercial and residential real estate disputes. The focus is matters where the property is tied to ownership structure, brokerage, leasing, construction, financing, or ongoing operations.",
      },
      {
        question: "Can you step in after a demand letter or suit has already been filed?",
        answer:
          "Yes. The first task is to understand deadlines, the paper trail, and the business objective so that the response strategy is grounded and timely.",
      },
      {
        question: "Do you work with other professionals on the matter?",
        answer:
          "Yes. Real estate disputes often require coordination with title professionals, surveyors, brokers, or project teams depending on the issue.",
      },
    ],
    localServiceArea:
      "Real estate disputes in Gallatin and the surrounding counties often involve a mix of local relationships, practical property history, and business urgency. Local context changes what a sensible resolution looks like.",
    issueTypes: [
      "Purchase agreement dispute",
      "Title or access issue",
      "Boundary or easement dispute",
      "Post-closing conflict",
      "Property-management or owner dispute",
    ],
    featured: true,
  },
  {
    slug: "strategic-case-assessment",
    title: "Strategic Case Assessment / Investigate and Advise",
    shortTitle: "Strategic Case Assessment",
    metaTitle: "Strategic Case Assessment for Business and Real Estate Disputes",
    metaDescription:
      "Early dispute assessment, fact investigation, document review, and strategic advice for business owners and real estate professionals before filing or formal escalation.",
    eyebrow: "Structured Consultation Path",
    intro:
      "Investigate and Advise is built for clients who need a grounded read on claims, defenses, leverage, and next-step options before deciding how hard to push.",
    summary:
      "This structured consultation path is designed for early-stage business and real estate conflict assessment. It helps clients understand likely claims and defenses, possible parties, timing concerns, and practical resolution options before committing to litigation or another formal path.",
    whoItIsFor: [
      "Owners, investors, brokers, contractors, and property managers who need a serious early-stage read before escalating a dispute.",
      "Clients facing a business or real estate conflict with incomplete facts, multiple players, or unclear leverage.",
      "Referral sources who want a practical, litigation-aware assessment before a matter expands unnecessarily.",
    ],
    commonProblems: [
      "Unclear document trails or competing narratives that need to be organized before anyone takes a harder position.",
      "Disputes where litigation may be necessary, but the client first needs a cost-aware assessment of claims, defenses, and leverage.",
      "Situations involving multiple contracts, entities, properties, or participants with overlapping interests.",
      "Pre-suit conflicts where the timing, tone, and target of a first formal communication matter.",
      "Matters where the client needs to understand possible parties, business consequences, and next-step options before deciding what to do.",
    ],
    whyTimingMatters:
      "Early assessment helps clients avoid expensive drift. It can identify weak assumptions, preserve better options, and clarify whether the right move is negotiation, arbitration, litigation, or disciplined patience.",
    approach:
      "This work is deliberately practical: gather the record, identify what actually matters, test the narrative, and build a recommended path. The point is not to overlawyer the issue. It is to help the client decide whether to negotiate, investigate further, prepare for arbitration, or position for litigation with clearer judgment.",
    commonMistakes: [
      "Spending heavily before the dispute is framed correctly.",
      "Letting urgency push a client into a bad first communication or premature filing.",
      "Assuming the loudest issue is the strongest legal issue.",
      "Ignoring the business, relationship, or property consequences of escalation.",
    ],
    faqs: [
      {
        question: "Is this only for clients who expect to sue?",
        answer:
          "No. Many clients use this service to decide not to sue, to negotiate from a stronger position, or to determine whether another dispute path is more useful.",
      },
      {
        question: "Can this be a limited-scope engagement?",
        answer:
          "Yes. The scope can often be structured around document review, issue framing, fact development, and a concrete recommendation on next steps.",
      },
      {
        question: "What kinds of matters fit this service?",
        answer:
          "Owner disputes, commercial leasing conflicts, brokerage and TREC-adjacent matters, contract problems, and other business-facing issues where early disciplined analysis adds value.",
      },
    ],
    localServiceArea:
      "For clients in Gallatin, Sumner County, Wilson County, Robertson County, and Trousdale County, early case assessment can be especially useful where local business relationships matter and a poorly timed escalation would create avoidable ripple effects.",
    issueTypes: [
      "Need early case assessment",
      "Investigate before demand",
      "Pre-suit strategy review",
      "Need document chronology and advice",
      "Unsure whether to escalate",
    ],
    featured: false,
  },
  {
    slug: "arbitration-and-dispute-resolution",
    title: "Arbitration, Mediation and ADR",
    shortTitle: "Arbitration, Mediation and ADR",
    metaTitle: "Arbitration, Mediation and ADR Counsel in Tennessee",
    metaDescription:
      "Counsel for arbitration, negotiated resolution, and business-focused dispute strategy in commercial real estate, owner disputes, and contract matters.",
    eyebrow: "Practice Area",
    intro: "Resolution strategy should match the actual leverage, forum, and business objective.",
    summary:
      "Stephen Nault advises on arbitration clauses, demand strategy, pre-hearing positioning, negotiated resolution, and business dispute pathways where a practical resolution matters as much as a legal one.",
    whoItIsFor: [
      "Businesses and owners facing contract clauses that require arbitration or another structured dispute path.",
      "Clients who want a realistic view of settlement leverage before formal proceedings consume time and capital.",
      "Parties who need counsel comfortable with both negotiation and the possibility of hard-edged formal action.",
    ],
    commonProblems: [
      "Contracts with arbitration provisions that change cost, timing, and discovery leverage.",
      "Disputes where the parties need structure without immediately filing in court.",
      "Settlement discussions that have stalled because the matter has not been framed clearly.",
      "Cases where the client needs a business-first resolution strategy rather than reflexive escalation.",
      "Multi-party disputes involving owners, brokers, vendors, or managers with overlapping responsibilities.",
    ],
    whyTimingMatters:
      "Forum decisions, demand framing, and early positioning affect cost and leverage later. It is easier to build a smart dispute path at the front end than to recover after a poor first move.",
    approach:
      "The strategy work looks at contract language, forum mechanics, evidence, business consequences, and leverage. Sometimes the right answer is structured negotiation. Sometimes the client needs a firmer arbitration posture with litigation-grade preparation behind it.",
    commonMistakes: [
      "Ignoring dispute resolution clauses until the fight is already underway.",
      "Assuming arbitration is always faster, cheaper, or less risky than court.",
      "Taking extreme settlement positions before the actual leverage is understood.",
      "Separating business objectives from procedural choices.",
    ],
    faqs: [
      {
        question: "Do you only handle arbitration after a demand is filed?",
        answer:
          "No. Clause review, forum planning, and strategy analysis often add more value before the dispute is formally launched.",
      },
      {
        question: "Can you help with settlement strategy even if arbitration is possible?",
        answer:
          "Yes. Effective dispute resolution usually depends on understanding both the settlement path and the credible escalation path behind it.",
      },
      {
        question: "What if the contract is unclear about dispute resolution?",
        answer:
          "That issue itself can shape leverage. The first step is to read the agreement carefully and decide whether the forum question should be clarified, contested, or used strategically.",
      },
    ],
    localServiceArea:
      "Businesses across Sumner, Wilson, Robertson, and Trousdale Counties often need dispute counsel who understands both the local business environment and the procedural realities of arbitration-driven contracts.",
    issueTypes: [
      "Arbitration clause review",
      "Arbitration demand or response",
      "Settlement strategy",
      "Forum selection dispute",
      "Structured dispute-resolution planning",
    ],
    featured: false,
  },
  {
    slug: "expert-witness-real-estate-and-brokerage-matters",
    title: "Expert Witness - Real Estate and Brokerage Matters",
    shortTitle: "Expert Witness",
    metaTitle: "Expert Witness for Real Estate and Brokerage Matters",
    metaDescription:
      "Expert witness and consulting support for real estate, brokerage, and transaction-standard issues where industry context matters.",
    eyebrow: "Attorney Support / Expert Witness",
    intro: "Some cases need industry context explained clearly, not theatrically.",
    summary:
      "In appropriate matters, Stephen C. Nault is available to assist lawyers and parties who need industry-informed analysis in real estate and brokerage disputes. The focus is on grounded opinions, credible consulting support, and practical explanation of how the underlying business actually works.",
    whoItIsFor: [
      "Lawyers handling real estate or brokerage disputes who need grounded industry analysis or consulting support.",
      "Referral sources evaluating whether expert involvement would sharpen case assessment, discovery strategy, or settlement leverage.",
      "Matters where practical understanding of brokerage operations, leasing practice, property management, or transaction standards materially matters.",
    ],
    commonProblems: [
      "Brokerage disputes where transaction practices, supervision issues, or professional expectations need explanation.",
      "Real estate matters involving commercial leasing practice, disclosure issues, transaction custom, or industry-specific decision making.",
      "Cases that need consulting support before formal expert designation decisions are finalized.",
      "Files where the legal theory is sound but the fact finder needs better commercial and operational context.",
      "Cases that benefit from disciplined, plain-language expert communication rather than advocacy disguised as analysis.",
    ],
    whyTimingMatters:
      "Expert strategy is more useful when it informs the case early enough to affect pleading, discovery, valuation, and negotiation posture. Waiting too long can limit how much the expert perspective helps shape the file.",
    approach:
      "The work is direct and analytical. The focus is on whether expert involvement will actually help, what opinions can be supported by the record, and how to communicate industry context without overreaching.",
    commonMistakes: [
      "Retaining an expert too late for the analysis to influence case strategy.",
      "Seeking broad opinions that exceed what the facts support.",
      "Using industry jargon instead of clear, disciplined explanations.",
      "Assuming every brokerage or real estate case needs expert testimony.",
    ],
    faqs: [
      {
        question: "Do you provide consulting-only support before a formal expert designation?",
        answer:
          "Yes. Some matters benefit first from consulting analysis to evaluate fit, case themes, and whether expert testimony would meaningfully help.",
      },
      {
        question: "Are you available for brokerage-related matters outside Gallatin?",
        answer:
          "The core market is Middle Tennessee, but expert-witness and consulting matters may extend beyond the immediate counties depending on fit and scheduling.",
      },
      {
        question: "What makes a matter a better fit for expert support?",
        answer:
          "Cases involving brokerage standards, leasing practice, transaction process, supervision issues, or industry-custom questions are often stronger candidates than matters that turn purely on document interpretation.",
      },
      {
        question: "What background informs this expert-witness and consulting work?",
        answer:
          "The background includes legal practice in Tennessee since 2018, admission to the United States District Court for the Middle District of Tennessee, Nashville School of Law, Bryant University, brokerage leadership, Tennessee real estate broker licensure since 2012, a Tennessee Real Estate Commission course instructor license issued in 2020, and hands-on work in leasing, property management, and commercial real estate operations.",
      },
    ],
    localServiceArea:
      "While rooted in Gallatin and the surrounding counties, expert-witness and consulting work can support brokerage and real estate disputes more broadly where grounded Tennessee-industry context would be useful.",
    issueTypes: [
      "Need expert witness review",
      "Consulting before designation",
      "Brokerage standards issue",
      "Real estate transaction-practice issue",
      "Outside counsel referral",
    ],
    featured: true,
  },
];

export function getPracticeArea(slug: string) {
  return practiceAreas.find((practiceArea) => practiceArea.slug === slug);
}

export const practiceAreaOptions = practiceAreas.map((practiceArea) => ({
  value: practiceArea.slug,
  label: practiceArea.title,
}));




