/* ============================================================
   Edutattva Classes — central content (verbatim from the 2026 brochure & poster).
   Keeping facts here guarantees every number/program detail appears on the site.
   ============================================================ */

export const site = {
  name: "Edutattva Classes",
  tagline: "Where Fundamentals Become Excellence",
  phoneDisplay: "7075 7075 40",
  phoneDial: "+917075707540",
  whatsapp: "https://wa.me/917075707540",
  website: "www.edutattva.com",
  admissions: "Admissions Open 2026–27",
  locations: [
    { name: "SJPS St John's", area: "Siruseri" },
    { name: "BHIS Billabong", area: "Kelambakkam" },
  ],
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Foundation", href: "/foundation", note: "Grades 6–8" },
      { label: "Edu Ignite", href: "/edu-ignite", note: "Grades 9–10" },
      { label: "Edu Edge", href: "/edu-edge", note: "Grades 11–12" },
      { label: "Edu Edge Online", href: "/edu-edge#online", note: "Grade XI" },
    ],
  },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

/* Animated stat strip on the home page */
export const homeStats = [
  { value: 10000, suffix: "+", label: "Students Mentored" },
  { value: 80, suffix: "+", label: "Years Combined Academic Experience", combined: true },
  { value: 250000, suffix: "+", label: "Questions Solved", combined: true },
  { value: 100000, suffix: "+", label: "Hrs of Teaching", combined: true },
];

export const trustLine =
  "Academic Minds Behind Years of IITJEE & NEET Results at FIITJEE & FGS";

/* Programs overview */
export const programs = [
  {
    slug: "/foundation",
    code: "Foundation",
    grades: "Grades 6–8",
    pitch: "Nurturing thinkers today — building strong concepts, logic and exam temperament early.",
    accent: "lime",
  },
  {
    slug: "/edu-ignite",
    code: "Edu Ignite",
    grades: "Grades 9–10",
    pitch: "Classroom & Integrated JEE/NEET foundation — the head start that compounds for years.",
    accent: "royal",
  },
  {
    slug: "/edu-edge",
    code: "Edu Edge & Edge+",
    grades: "Grades 11–12",
    pitch: "One system for Boards + JEE (Main & Advanced) + NEET, with a Rank Elevate edge.",
    accent: "gold",
  },
  {
    slug: "/edu-edge#online",
    code: "Edu Edge Online",
    grades: "Grade XI",
    pitch: "The personal attention of a classroom, the convenience of home — just ₹50,000 all-inclusive.",
    accent: "crimson",
  },
] as const;

/* E4 Engine (Edutattva Execution Engine) */
export const e4 = [
  { step: "Explain", desc: "Every concept is taught with clarity, from first principles to application." },
  { step: "Engage", desc: "Interactive classes, discussion and applied problem-solving deepen understanding." },
  { step: "Evaluate", desc: "Regular tests and precise analysis measure learning and surface every gap." },
  { step: "Elevate", desc: "Personalised feedback and mentoring lift each student toward full potential." },
];

/* Faculty spotlight (mirrors the poster) */
export const facultySpotlight = [
  { name: "Kailasam (CRK) Sir", role: "Chemistry Expert", years: "16+", initials: "CRK", photo: "/faculty/kailasam.png" },
  { name: "Nishant (MNT) Sir", role: "Maths Expert", years: "22+", initials: "MNT", photo: "/faculty/nishant.png" },
  { name: "Sourav (PSOM) Sir", role: "Physics Expert", years: "21+", initials: "PSOM", photo: "/faculty/sourav.png" },
];

/* Full academic leadership */
export const leadership = [
  {
    name: "Nishant Tripathi",
    alias: "MNT Sir",
    title: "Co-Founder & Chief Academic & Strategy Officer (CASO)",
    subject: "Mathematics",
    years: "22+",
    initials: "MNT",
    photo: "/faculty/nishant.png",
  },
  {
    name: "Sourav Mondal",
    alias: "PSOM Sir",
    title: "Co-Founder & Chief Academic & Operations Officer (CAOO)",
    subject: "Physics",
    years: "21+",
    initials: "PSOM",
    photo: "/faculty/sourav.png",
  },
  {
    name: "Kailasam Ramamoorthy",
    alias: "CRK Sir",
    title: "Mentor & Director — Chemistry & Academic Excellence",
    subject: "Chemistry",
    years: "16+",
    initials: "CRK",
    photo: "/faculty/kailasam.png",
  },
  {
    name: "Rahul Kumar Ojha",
    alias: "Director",
    title: "Director — Mathematics & Results Excellence",
    subject: "Mathematics",
    years: "15+",
    initials: "RKO",
    photo: "/faculty/rahul.png",
  },
  {
    name: "K. N. Bhargava Mondem",
    alias: "Director",
    title: "Director — Biology & Academic Excellence (NEET)",
    subject: "Biology",
    years: "14+",
    initials: "KNB",
    photo: "/faculty/bhargava.png",
  },
];

export const leadershipStrengths = [
  "80+ years of combined academic experience",
  "Thousands of students mentored successfully",
  "Proven track record of top ranks and high scores",
  "Strong expertise in curriculum design and execution",
];

/* Delivery modes */
export const modes = [
  { name: "Integrated", desc: "Classes conducted within school hours — no duplication of effort." },
  { name: "Offline", desc: "Structured coaching conducted after school hours." },
  { name: "Hybrid", desc: "Weekday online classes + Sunday offline classes." },
  { name: "Online", desc: "Live, interactive streaming classes." },
];

/* Foundation tiers */
export const foundationTiers = [
  {
    grade: "Grade 6",
    name: "Edu Root",
    line: "Build Strong Basics",
    tagline: "Strong Roots. Strong Future.",
    color: "lime",
    features: [
      "Strengthen concepts in Maths, Science & English",
      "Curiosity-driven learning with real-world applications",
      "Build study habits & discipline",
      "Fun with logic, puzzles & activities",
    ],
  },
  {
    grade: "Grade 7",
    name: "Edu Spark",
    line: "Ignite Potential",
    tagline: "Spark Today. Shine Tomorrow.",
    color: "royal",
    features: [
      "Deeper understanding of concepts",
      "Introduction to Olympiads & competitive mindset",
      "Develop analytical thinking & problem solving",
      "Regular practice, tests & feedback",
    ],
  },
  {
    grade: "Grade 8",
    name: "Edu Quest",
    line: "Prepare. Perform. Progress.",
    tagline: "Quest for Excellence. Lead the Future.",
    color: "crimson",
    features: [
      "Advanced problem solving & higher order thinking",
      "Olympiad preparation (NSO, IMO, IEO & more)",
      "Build speed, accuracy & exam temperament",
      "Foundation for JEE / NEET starts here",
    ],
  },
];

export const foundationWhy = [
  { title: "Beyond School Textbooks", desc: "Concept-based learning with real-world application." },
  { title: "Olympiads Today, Leaders Tomorrow", desc: "Early exposure to Olympiads & talent exams builds a winning mindset." },
  { title: "Higher Order Thinking", desc: "Logical reasoning, analytical thinking and problem solving for success." },
  { title: "Early Exam Temperament", desc: "Regular tests improve accuracy, speed, focus & confidence." },
  { title: "Future Advantage in 9–12", desc: "A strong foundation makes the path to JEE, NEET & Boards easier." },
];

export const foundationFees = {
  columns: ["Grade 6", "Grade 7", "Grade 8"],
  rows: [
    {
      mode: "Integrated (within school hours)",
      location: "SJPS St John's, Siruseri",
      prices: ["₹49,560", "₹49,560", "₹56,640"],
    },
    {
      mode: "Coaching (Sunday, 6 hrs)",
      location: "SJPS St John's, Siruseri",
      prices: ["₹42,000", "₹42,000", "₹48,000"],
    },
  ],
  remark: "First term school fee is waived off for the integrated program at SJPS-Siruseri.",
};

/* Edu Ignite (9–10) */
export const igniteWhy = [
  { title: "Two-Year Head Start", desc: "Begin JEE/NEET foundations in Class IX and compound the advantage." },
  { title: "Board + Competitive Sync", desc: "School syllabus and competitive prep move together, not against each other." },
  { title: "Concept Depth", desc: "Move from rote learning to real conceptual mastery early." },
  { title: "Exam Temperament", desc: "Regular testing builds accuracy, speed and confidence under pressure." },
  { title: "Olympiad Readiness", desc: "Sharpen higher-order thinking through Olympiad-grade problems." },
  { title: "Mentored Growth", desc: "Personal mentoring keeps every student on track and unblocked." },
];

export const igniteFees = {
  columns: ["Grade 9", "Grade 10"],
  rows: [
    {
      mode: "Integrated (within school hours)",
      location: "SJPS Siruseri or BHIS Kelambakkam",
      prices: ["₹80,000", "₹80,000"],
    },
    {
      mode: "Hybrid — Sunday 6 hrs offline + weekday online (2 hrs/day, 2 days, 6–8 PM)",
      location: "SJPS Siruseri (offline) + Online",
      prices: ["₹65,000", "₹65,000"],
    },
  ],
  installments: "Installments available.",
  remark: "First term school fee is waived off for the integrated program at SJPS-Siruseri.",
};

/* Edu Edge (11–12) */
export const edgeStats = [
  { value: "1000+", label: "Hours of Teaching", sub: "Integrated Program" },
  { value: "25,000+", label: "Practice Questions", sub: "Concept Learning to Mastery" },
  { value: "200+", label: "Rank Elevate Hours", sub: "Extra edge for rank improvement" },
  { value: "ExamShield", label: "Pattern-Proofing", sub: "Ready for any question pattern" },
];

export const edgeSimultaneous = [
  { title: "Board Examinations", desc: "Excel in Boards with conceptual clarity." },
  { title: "JEE (Main & Advanced)", desc: "Build problem-solving skills for IIT success." },
  { title: "NEET", desc: "Master the NEET syllabus with strong fundamentals." },
];

export const edgeHighlights = [
  { title: "Experienced Faculty Team", desc: "Highly experienced educators with 20+ years of teaching excellence." },
  { title: "Latest Pattern-Proof Study Material", desc: "Continuously updated to match evolving exam trends." },
  { title: "Comprehensive Testing Ecosystem", desc: "From chapter tests to full syllabus tests." },
  { title: "Advanced Online Testing Platform", desc: "Device-independent tests with comprehensive analysis reports." },
  { title: "Detailed Performance Analysis", desc: "Identify strengths & weaknesses and improve consistently." },
  { title: "Rank Elevate Program", desc: "100–200+ hours of advanced problem-solving & exam strategies." },
  { title: "Personal Mentoring", desc: "Guidance, motivation & continuous academic support." },
  { title: "Affordable Excellence", desc: "Premium academic experience at a significantly more affordable fee." },
];

export const edgeTesting = [
  "Sunday Summary Tests",
  "Chapter Proficiency Tests",
  "Module Tests",
  "JEE Main Pattern Tests",
  "JEE Advanced Pattern Tests",
  "NEET Pattern Tests",
  "Full Test Series",
  "Detailed Analysis Sessions",
];

export const edgeFees = {
  columns: ["Grade 11", "Grade 12"],
  rows: [
    { mode: "Online", location: "Live interactive streaming", prices: ["₹50,000", "₹40,000"] },
    { mode: "Integrated (within school hours)", location: "BHIS Kelambakkam", prices: ["₹100,000", "₹100,000"] },
    {
      mode: "Hybrid — Sunday 6 hrs + weekday online (2 hrs/day, 3 days, 6–8 PM)",
      location: "SJPS Siruseri (offline) + Online",
      prices: ["₹80,000", "₹75,000"],
    },
  ],
  installments: "Installments available.",
};

/* Edu Edge Online comparison */
export const onlineCompare = {
  most: [
    "Massive batches, little interaction",
    "Recorded videos, not real teaching",
    "Doubts unresolved for weeks",
    "No personal monitoring",
    "Students lose consistency",
  ],
  edge: [
    "Live interactive classes",
    "Small batches for personal attention",
    "Weekly doubt clinics",
    "Continuous mentorship & monitoring",
    "Building consistency. Driving results.",
  ],
};

export const onlineFeatures = [
  { title: "Live Interactive Classes", desc: "Real-time interaction — ask questions, engage, understand, learn better." },
  { title: "Small Batch Size", desc: "Limited students per batch for personal attention and better engagement." },
  { title: "Weekly Doubt Clinics", desc: "Dedicated sessions for doubts, assignments, problem solving and guidance." },
  { title: "Advanced Testing & Analytics", desc: "Regular tests with detailed analysis, rank prediction & improvement plans." },
  { title: "Personal Mentorship", desc: "Continuous academic monitoring, study planning, motivation & parent updates." },
  { title: "Comprehensive Study Material", desc: "Well-structured notes, assignments, PYQs, practice sheets & revision modules." },
];

/* Why Edutattva (home) */
export const whyEdutattva = [
  { title: "Small Batches", desc: "Limited students per batch so every learner is seen, heard and guided." },
  { title: "Personal Mentorship", desc: "One-on-one mentoring, feedback and correction strategies for each student." },
  { title: "Nearly Double the* Contact Hours", desc: "Nearly double the effective academic contact hours of conventional programs.", combined: true },
  { title: "Powerful Testing Ecosystem", desc: "Continuous benchmarking, precise analysis and performance improvement." },
  { title: "Affordable Excellence", desc: "Quality academic systems made more affordable — without compromising standards." },
];

/* Testimonials */
export const testimonials = [
  {
    quote:
      "The mentoring is unlike any coaching we've seen. My daughter's confidence and consistency changed within a term — she finally understands the 'why', not just the formula.",
    name: "Parent of a Grade 10 student",
    role: "Siruseri",
  },
  {
    quote:
      "Small batches meant my doubts never piled up. The weekly tests and one-on-one analysis kept me honest about where I actually stood before JEE.",
    name: "Edu Edge student",
    role: "Grade 12",
  },
  {
    quote:
      "Genuinely affordable for the depth of attention. The faculty's FIITJEE & FGS pedigree shows in how they teach — structured, patient and results-driven.",
    name: "Parent of a Foundation student",
    role: "Kelambakkam",
  },
];

/* Admissions */
export const admissionSteps = [
  { title: "Enquiry", desc: "Share your details or call us — we understand your child's current stage and goals." },
  { title: "Counselling", desc: "A free counselling session maps the right program, mode and roadmap." },
  { title: "Assessment", desc: "A short diagnostic helps place the student and personalise the plan." },
  { title: "Enrollment", desc: "Confirm the program, choose an installment plan and begin the journey." },
];

export const faqs = [
  {
    q: "How large are the batches?",
    a: "Batches are deliberately kept small so every student receives personal attention, mentoring and near-double the effective contact hours of conventional programs.",
  },
  {
    q: "What delivery modes are available?",
    a: "Integrated (within school hours), Offline (after school hours), Hybrid (weekday online + Sunday offline) and Online (live interactive streaming). Availability varies by program and grade.",
  },
  {
    q: "What is included in the fee?",
    a: "Every fee includes Edutattva study material, online testing platform access and all applicable taxes. There are no hidden charges.",
  },
  {
    q: "Where are the campuses?",
    a: "SJPS (St John's), Siruseri and BHIS (Billabong), Kelambakkam. Online programs are available from anywhere.",
  },
  {
    q: "Are installments available?",
    a: "Yes. Installment options are available for Edu Ignite (9–10) and Edu Edge (11–12) programs. Ask our counsellor for the current plan.",
  },
  {
    q: "How do I book a free counselling session?",
    a: "Submit the enquiry form on this page, call 7075 7075 40, or message us on WhatsApp — our team will confirm a slot that suits you.",
  },
];

export const feeIncludes =
  "The fee includes Edutattva study material, online testing platform access, and is inclusive of all taxes.";
