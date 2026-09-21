// ==============================================================================
// AcademIQ — In-Memory Demo Content Repository
// Provides rich, realistic, academic datasets for immediate development & preview
// ==============================================================================

import {
  Category,
  Tag,
  Organization,
  Author,
  MediaItem,
  FullContentItem,
  ContentFilterParams,
  ContentStatus,
  AuditLog,
} from "@/types";
import {
  IContentRepository,
  DashboardStats,
  MediaUsageResult,
} from "./content-repository";

export const DEMO_CATEGORIES: Category[] = [
  { id: "c1", name: "Social Sciences", slug: "social-sciences", description: "Inquiry into society, institutions, and community.", icon: "Users" },
  { id: "c2", name: "Political Science", slug: "political-science", description: "Governance, elections, and democratic processes.", icon: "Landmark" },
  { id: "c3", name: "Sociology", slug: "sociology", description: "Social structures, movements, and cultural shifts.", icon: "Network" },
  { id: "c4", name: "Economics", slug: "economics", description: "Microeconomics, public finance, and econometrics.", icon: "TrendingUp" },
  { id: "c5", name: "International Relations", slug: "international-relations", description: "Diplomacy, geopolitics, and global governance.", icon: "Globe" },
  { id: "c6", name: "Public Policy", slug: "public-policy", description: "Policy design, regulatory regimes, and evaluation.", icon: "FileText" },
  { id: "c7", name: "Development Studies", slug: "development-studies", description: "Poverty alleviation, resilience, and sustainable growth.", icon: "Leaf" },
  { id: "c8", name: "Interdisciplinary Studies", slug: "interdisciplinary-studies", description: "Cross-cutting synthesis of science, society, and ethics.", icon: "Layers" },
];

export const DEMO_TAGS: Tag[] = [
  { id: "t1", name: "Open Access", slug: "open-access" },
  { id: "t2", name: "Digital Democracy", slug: "digital-democracy" },
  { id: "t3", name: "Qualitative Methods", slug: "qualitative-methods" },
  { id: "t4", name: "Econometrics", slug: "econometrics" },
  { id: "t5", name: "SSRF Initiative", slug: "ssrf-initiative" },
  { id: "t6", name: "Peer Reviewed", slug: "peer-reviewed" },
  { id: "t7", name: "Climate Policy", slug: "climate-policy" },
  { id: "t8", name: "AI & Society", slug: "ai-and-society" },
  { id: "t9", name: "Global South", slug: "global-south" },
];

export const DEMO_ORGANIZATIONS: Organization[] = [
  {
    id: "o1",
    name: "Global Social Science Alliance",
    slug: "global-social-science-alliance",
    website: "https://example.org/gssa",
    country: "Switzerland",
    description: "International alliance promoting scholarly standards in the social disciplines.",
  },
  {
    id: "o2",
    name: "Institute for Policy & Governance",
    slug: "institute-for-policy-governance",
    website: "https://example.org/ipg",
    country: "United Kingdom",
    description: "Leading academic think tank examining public administration.",
  },
  {
    id: "o3",
    name: "Center for International Development Research",
    slug: "cidr-global",
    website: "https://example.org/cidr",
    country: "Canada",
    description: "Pioneering multidisciplinary research in economic and social transitions.",
  },
  {
    id: "o4",
    name: "Consortium for Digital Humanities & Politics",
    slug: "cdhp-eu",
    website: "https://example.org/cdhp",
    country: "Germany",
    description: "Inter-university research lab studying digital civic infrastructure.",
  },
];

export const DEMO_AUTHORS: Author[] = [
  {
    id: "a_wilson",
    name: "Dr. James Wilson",
    affiliation: "University of Oxford",
    orcid: "0000-0002-4512-8812",
    email: "j.wilson@ox.ac.uk",
    bio: "Senior Fellow in Political Systems and Digital Governance at Oxford.",
  },
  {
    id: "a_lopez",
    name: "Dr. Maria Lopez",
    affiliation: "Stanford University",
    orcid: "0000-0003-9912-7411",
    email: "m.lopez@stanford.edu",
    bio: "Associate Professor of Communication and Civic Media at Stanford.",
  },
  {
    id: "a_khan",
    name: "Dr. Aisha Khan",
    affiliation: "Lahore University of Management Sciences",
    orcid: "0000-0001-6623-4190",
    email: "a.khan@lums.edu.pk",
    bio: "Professor of Urban Sociology and Inequality Studies.",
  },
  {
    id: "a_chen",
    name: "Dr. Michael Chen",
    affiliation: "National University of Singapore",
    orcid: "0000-0002-8819-3321",
    email: "m.chen@nus.edu.sg",
    bio: "Chair of International Climate Negotiations and Geopolitics.",
  },
  {
    id: "a_carter",
    name: "Dr. Emily Carter",
    affiliation: "Harvard Graduate School of Education",
    orcid: "0000-0003-1029-7744",
    email: "e.carter@harvard.edu",
    bio: "Director of Educational Equity and Social Stratification Lab.",
  },
  {
    id: "a_patel",
    name: "Dr. Ravi Patel",
    affiliation: "Jawaharlal Nehru University",
    orcid: "0000-0002-5541-9011",
    email: "r.patel@jnu.ac.in",
    bio: "Reader in Cultural Heritage Preservation and Sustainable Economies.",
  },
  {
    id: "a1",
    name: "Prof. Elena Rostova",
    affiliation: "Global Social Science Alliance",
    orcid: "0000-0002-1825-0097",
    email: "e.rostova@example.org",
    bio: "Chair of Comparative Institutional Analysis, focusing on electoral structures.",
  },
  {
    id: "a2",
    name: "Dr. Marcus Sterling",
    affiliation: "Institute for Policy & Governance",
    orcid: "0000-0003-2411-8842",
    email: "m.sterling@example.org",
    bio: "Senior Fellow in Public Finance and Econometric Program Evaluation.",
  },
  {
    id: "a3",
    name: "Dr. Amina Al-Mansoor",
    affiliation: "Center for International Development Research",
    orcid: "0000-0001-9042-3319",
    email: "a.almansoor@example.org",
    bio: "Director of Comparative Fieldwork, author of monographs on rural resilience.",
  },
  {
    id: "a4",
    name: "Dr. Julian Vane",
    affiliation: "Consortium for Digital Humanities & Politics",
    orcid: "0000-0002-7714-9912",
    email: "j.vane@example.org",
    bio: "Computational sociologist analyzing online deliberative systems and algorithmic bias.",
  },
];

export const DEMO_MEDIA: MediaItem[] = [
  {
    id: "m1",
    file_name: "deliberative_democracy_cover.jpg",
    storage_path: "academiq-images/deliberative_cover.jpg",
    bucket: "academiq-images",
    mime_type: "image/jpeg",
    file_size: 420100,
    width: 1200,
    height: 800,
    alt_text: "Scholarly discussion forum and lecture hall",
    caption: "Academic symposium on civic discourse",
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    public_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "m2",
    file_name: "policy_brief_poster.jpg",
    storage_path: "academiq-images/policy_poster.jpg",
    bucket: "academiq-images",
    mime_type: "image/jpeg",
    file_size: 612000,
    width: 1200,
    height: 800,
    alt_text: "Library reading room with academic research desks",
    caption: "Institutional research archive",
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    public_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "m3",
    file_name: "ssrf_symposium_banner.jpg",
    storage_path: "academiq-images/ssrf_banner.jpg",
    bucket: "academiq-images",
    mime_type: "image/jpeg",
    file_size: 780000,
    width: 1400,
    height: 900,
    alt_text: "Social Sciences Research Forum banner",
    caption: "SSRF annual research conference",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    public_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "m4",
    file_name: "paper_submission_guidelines.pdf",
    storage_path: "academiq-pdfs/guidelines.pdf",
    bucket: "academiq-pdfs",
    mime_type: "application/pdf",
    file_size: 1540000,
    alt_text: "CFP Manuscript Formatting Guide",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    public_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

// Complete set of initial content items covering all 10 types
export const INITIAL_DEMO_CONTENT: FullContentItem[] = [
  // 1. RESEARCH PAPERS (Matching Reference Design)
  {
    id: "p1",
    title: "Digital Platforms and Democratic Engagement: A Global Perspective",
    slug: "digital-platforms-and-democratic-engagement",
    short_description: "This paper examines how digital platforms influence democratic participation across different political contexts. Using a mixed-methods approach, we analyze data from 18 countries.",
    content: "<h3>Abstract</h3><p>This paper examines how digital platforms influence democratic participation across different political contexts. Using a mixed-methods approach, we analyze data from 18 countries and find that while digital platforms can enhance civic engagement, they also present significant challenges related to misinformation and polarization.</p><h3>Introduction</h3><p>The rapid diffusion of algorithmic social platforms has transformed traditional conduits of citizen deliberation and electoral engagement. In this cross-national comparative monograph, we investigate the empirical correlates between algorithmic content curation, electoral turnout, and polarization indices.</p><h3>Methodology & Data</h3><p>Using a balanced longitudinal dataset comprising 18 advanced and developing democracies across the period 2018–2025, we estimate fixed-effects panel models interacting digital penetration rates with institutional trust indicators.</p><h3>Results & Findings</h3><p>The empirical findings indicate a bifurcated outcome: while grassroots mobilize at significantly higher velocities, epistemic cohesion declines in fragmented media ecosystems.</p><h3>Discussion & Implications</h3><p>Policy interventions targeting platform transparency must balance speech rights with algorithmic auditing protocols to sustain democratic integrity in post-broadcast societies.</p>",
    content_type: "RESEARCH_PAPER",
    status: "PUBLISHED",
    featured: true,
    cover_image_id: "m1",
    cover_image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    category_id: "c2",
    category: DEMO_CATEGORIES[1],
    organization_id: "o4",
    organization: DEMO_ORGANIZATIONS[3],
    country: "United Kingdom",
    location: "Oxford",
    published_at: "2025-01-15T09:00:00Z",
    created_at: "2025-01-15T09:00:00Z",
    updated_at: "2025-01-15T09:00:00Z",
    authors: [DEMO_AUTHORS[0], DEMO_AUTHORS[1]], // Dr. James Wilson & Dr. Maria Lopez
    tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[5]],
    research_paper: {
      abstract: "This paper examines how digital platforms influence democratic participation across different political contexts. Using a mixed-methods approach, we analyze data from 18 countries and find that while digital platforms can enhance civic engagement, they also present significant challenges related to misinformation and polarization.",
      publication_date: "2025-01-15",
      journal: "Journal of Political Science",
      volume: "Vol. 42",
      issue: "Issue 1",
      doi: "10.1234/jps.2025.001",
      publisher: "Academic Scholarly Press",
      pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "p2",
    title: "Urbanization and Social Inequality in South Asia",
    slug: "urbanization-and-social-inequality-in-south-asia",
    short_description: "Spatial segregation, informal settlements, and socioeconomic mobility across fast-growing metropolitan centers.",
    content: "<p>Urbanization in South Asia has produced unprecedented economic output alongside entrenched spatial stratification. Drawing upon geospatial analysis and census microdata across five mega-cities, this study charts municipal service distribution disparities.</p>",
    content_type: "RESEARCH_PAPER",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    category_id: "c3",
    category: DEMO_CATEGORIES[2],
    organization_id: "o2",
    organization: DEMO_ORGANIZATIONS[1],
    country: "Pakistan",
    location: "Lahore",
    published_at: "2024-11-20T10:00:00Z",
    created_at: "2024-11-20T10:00:00Z",
    updated_at: "2024-11-20T10:00:00Z",
    authors: [DEMO_AUTHORS[2]], // Dr. Aisha Khan
    tags: [DEMO_TAGS[0], DEMO_TAGS[2], DEMO_TAGS[8]],
    research_paper: {
      abstract: "Drawing upon geospatial analysis and census microdata across five South Asian mega-cities, this study charts municipal service distribution disparities and informal labor precarity.",
      publication_date: "2024-11-20",
      journal: "Journal of Urban Studies",
      volume: "Vol. 38",
      issue: "Issue 3",
      doi: "10.1234/jus.2024.089",
      publisher: "Urban Research Institute",
      pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "p3",
    title: "Climate Policy and International Cooperation",
    slug: "climate-policy-and-international-cooperation",
    short_description: "Multilateral treaty design and carbon border adjustments in an era of heightened geopolitical realignment.",
    content: "<p>Assessing diplomatic compliance dynamics in global clean energy accords under multipolar geopolitical friction and strategic protectionism.</p>",
    content_type: "RESEARCH_PAPER",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    category_id: "c5",
    category: DEMO_CATEGORIES[4],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Singapore",
    published_at: "2024-06-18T14:00:00Z",
    created_at: "2024-06-18T14:00:00Z",
    updated_at: "2024-06-18T14:00:00Z",
    authors: [DEMO_AUTHORS[3]], // Dr. Michael Chen
    tags: [DEMO_TAGS[6], DEMO_TAGS[4], DEMO_TAGS[5]],
    research_paper: {
      abstract: "Assessing diplomatic compliance dynamics in global clean energy accords under multipolar geopolitical friction and strategic protectionism.",
      publication_date: "2024-06-18",
      journal: "International Relations Review",
      volume: "Vol. 45",
      issue: "Issue 2",
      doi: "10.1234/irr.2024.015",
      publisher: "Global Governance Press",
      pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "p4",
    title: "The Role of Education in Social Mobility",
    slug: "the-role-of-education-in-social-mobility",
    short_description: "Tertiary credentialing, generational income elasticity, and affirmative policies in public university systems.",
    content: "<p>Does higher education remain the primary engine of social mobility? We evaluate a 30-year cohort study analyzing educational attainment against lifetime earning distributions.</p>",
    content_type: "RESEARCH_PAPER",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    category_id: "c6",
    category: DEMO_CATEGORIES[5],
    organization_id: "o2",
    organization: DEMO_ORGANIZATIONS[1],
    country: "United States",
    published_at: "2023-09-12T08:00:00Z",
    created_at: "2023-09-12T08:00:00Z",
    updated_at: "2023-09-12T08:00:00Z",
    authors: [DEMO_AUTHORS[4]], // Dr. Emily Carter
    tags: [DEMO_TAGS[0], DEMO_TAGS[2], DEMO_TAGS[5]],
    research_paper: {
      abstract: "Evaluating a 30-year cohort study analyzing educational attainment against lifetime earning distributions and credential signaling.",
      publication_date: "2023-09-12",
      journal: "Journal of Education Research",
      volume: "Vol. 51",
      issue: "Issue 4",
      doi: "10.1234/jer.2023.082",
      publisher: "Education Sciences Press",
      pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "p5",
    title: "Cultural Heritage and Sustainable Development",
    slug: "cultural-heritage-and-sustainable-development",
    short_description: "Community-based conservation and eco-tourism frameworks in historic urban and rural landscapes.",
    content: "<p>Examines how cultural asset preservation interfaces with environmental resilience and municipal economic diversification in post-industrial territories.</p>",
    content_type: "RESEARCH_PAPER",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    category_id: "c7",
    category: DEMO_CATEGORIES[6],
    organization_id: "o3",
    organization: DEMO_ORGANIZATIONS[2],
    country: "India",
    published_at: "2023-04-10T14:00:00Z",
    created_at: "2023-04-10T14:00:00Z",
    updated_at: "2023-04-10T14:00:00Z",
    authors: [DEMO_AUTHORS[5]], // Dr. Ravi Patel
    tags: [DEMO_TAGS[0], DEMO_TAGS[4]],
    research_paper: {
      abstract: "Examines how cultural asset preservation interfaces with environmental resilience and municipal economic diversification in post-industrial territories.",
      publication_date: "2023-04-10",
      journal: "Journal of Cultural Studies",
      volume: "Vol. 28",
      issue: "Issue 2",
      doi: "10.1234/jcs.2023.112",
      publisher: "Heritage Studies International",
      pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },

  // 2. CALLS FOR PAPERS - CFP (5)
  {
    id: "c_cfp1",
    title: "CFP: 18th International Conference on Democratic Innovations and Civic Tech",
    slug: "cfp-18th-international-conf-democratic-innovations",
    short_description: "Inviting original empirical and theoretical contributions examining democratic institutions, participatory budgeting, and deliberative polling systems.",
    content: "<p>The European Consortium for Political Research invites scholars, doctoral candidates, and institutional designers to submit full papers for the 18th International Conference on Democratic Innovations.</p><h3>Thematic Tracks</h3><ul><li>Participatory digital platforms & voter deliberation</li><li>Algorithmic transparency in civic governance</li><li>Mini-publics and citizen assemblies</li></ul>",
    content_type: "CFP",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
    category_id: "c2",
    category: DEMO_CATEGORIES[1],
    organization_id: "o4",
    organization: DEMO_ORGANIZATIONS[3],
    country: "Germany",
    location: "Berlin & Online",
    published_at: "2026-09-10T12:00:00Z",
    created_at: "2026-09-10T12:00:00Z",
    updated_at: "2026-09-10T12:00:00Z",
    tags: [DEMO_TAGS[1], DEMO_TAGS[5]],
    cfp: {
      conference_name: "International Conference on Democratic Innovations 2026",
      theme: "Institutional Resilience in Polarized Societies",
      organizing_institution: "European Consortium for Political Research",
      submission_deadline: "2026-10-15T23:59:59Z", // active (~24 days)
      abstract_deadline: "2026-10-01T23:59:59Z",
      full_paper_deadline: "2026-10-15T23:59:59Z",
      notification_date: "2026-11-05T00:00:00Z",
      conference_start: "2026-11-18",
      conference_end: "2026-11-21",
      mode: "HYBRID",
      submission_url: "https://example.org/cfp/democ2026/submit",
      contact_email: "submissions@democ2026.example.org",
      cfp_pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "c_cfp2",
    title: "CFP: Global Symposium on Sustainable Economic Governance 2026",
    slug: "cfp-global-symposium-sustainable-economic-governance",
    short_description: "Calling for working papers on green central banking, circular economy transitions, and sovereign debt sustainability in emergent markets.",
    content: "<p>The Institute for Policy & Governance invites contributions on monetary policy adjustments, climate disclosures, and sovereign fiscal buffers.</p>",
    content_type: "CFP",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
    category_id: "c4",
    category: DEMO_CATEGORIES[3],
    organization_id: "o2",
    organization: DEMO_ORGANIZATIONS[1],
    country: "United Kingdom",
    location: "London",
    published_at: "2026-09-08T09:00:00Z",
    created_at: "2026-09-08T09:00:00Z",
    updated_at: "2026-09-08T09:00:00Z",
    tags: [DEMO_TAGS[3], DEMO_TAGS[6]],
    cfp: {
      conference_name: "Global Symposium on Sustainable Economic Governance",
      theme: "Monetary Policy, Climate Volatility, and Sovereign Stability",
      organizing_institution: "Institute for Policy & Governance",
      submission_deadline: "2026-10-04T23:59:59Z", // active (~14 days)
      abstract_deadline: "2026-09-25T23:59:59Z",
      full_paper_deadline: "2026-10-04T23:59:59Z",
      notification_date: "2026-10-20T00:00:00Z",
      conference_start: "2026-11-25",
      conference_end: "2026-11-27",
      mode: "ONLINE",
      submission_url: "https://example.org/cfp/ecogov2026/submit",
      contact_email: "cfp@ecogov2026.example.org",
    },
  },
  {
    id: "c_cfp3",
    title: "CFP: SSRF Annual Research Colloquium: Methodological Frontiers in Social Sciences",
    slug: "cfp-ssrf-annual-research-colloquium-2026",
    short_description: "SSRF flagship call for papers exploring interdisciplinary research designs, ethnographic data triangulation, and ethical computational social science.",
    content: "<p>The Social Sciences Research Forum (SSRF) convenes scholars from all disciplines to submit working papers and panel proposals. Selected papers will be considered for fast-track publication in the SSRF Monograph Series.</p>",
    content_type: "CFP",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    category_id: "c1",
    category: DEMO_CATEGORIES[0],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    location: "Geneva & Virtual",
    published_at: "2026-09-15T08:00:00Z",
    created_at: "2026-09-15T08:00:00Z",
    updated_at: "2026-09-15T08:00:00Z",
    tags: [DEMO_TAGS[2], DEMO_TAGS[4], DEMO_TAGS[7]],
    cfp: {
      conference_name: "SSRF Annual Research Colloquium 2026",
      theme: "Bridging Epistemologies: Qualitative, Quantitative & Computational Synergies",
      organizing_institution: "Social Sciences Research Forum (SSRF)",
      submission_deadline: "2026-10-28T23:59:59Z", // active (~38 days)
      abstract_deadline: "2026-10-10T23:59:59Z",
      full_paper_deadline: "2026-10-28T23:59:59Z",
      notification_date: "2026-11-20T00:00:00Z",
      conference_start: "2026-12-04",
      conference_end: "2026-12-06",
      mode: "HYBRID",
      submission_url: "https://example.org/cfp/ssrf2026/submit",
      contact_email: "colloquium@ssrf-network.example.org",
      cfp_pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
  {
    id: "c_cfp4",
    title: "CFP: Comparative Public Administration in Crisis & Recovery",
    slug: "cfp-comparative-public-admin-in-crisis",
    short_description: "Inviting submissions on institutional agility, crisis procurement, public healthcare governance, and state capacity under stress.",
    content: "<p>Focusing on institutional stress-testing, emergency public budgeting, and collaborative crisis command systems across national bureaucracies.</p>",
    content_type: "CFP",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    category_id: "c6",
    category: DEMO_CATEGORIES[5],
    organization_id: "o2",
    organization: DEMO_ORGANIZATIONS[1],
    country: "United Kingdom",
    location: "Edinburgh",
    published_at: "2026-09-02T10:00:00Z",
    created_at: "2026-09-02T10:00:00Z",
    updated_at: "2026-09-02T10:00:00Z",
    tags: [DEMO_TAGS[5]],
    cfp: {
      conference_name: "Conference on Comparative Public Administration",
      theme: "Agility, Accountability, and State Machinery in Transition",
      organizing_institution: "Global Public Policy Society",
      submission_deadline: "2026-09-24T23:59:59Z", // urgent (4 days remaining!)
      abstract_deadline: "2026-09-12T23:59:59Z",
      full_paper_deadline: "2026-09-24T23:59:59Z",
      notification_date: "2026-10-08T00:00:00Z",
      conference_start: "2026-10-25",
      conference_end: "2026-10-27",
      mode: "OFFLINE",
      submission_url: "https://example.org/cfp/pubadmin2026/submit",
      contact_email: "admin@pubadmin2026.example.org",
    },
  },
  {
    id: "c_cfp5",
    title: "CFP: Digital Ethnography & Cultural Sociology in Platform Societies",
    slug: "cfp-digital-ethnography-cultural-sociology",
    short_description: "Special issue Call for Papers exploring methodology, algorithmic subcultures, and virtual fieldwork challenges in contemporary sociology.",
    content: "<p>Call for papers for special edition on ethnographic immersion in digital spaces, ethics of non-consensual platform data scraping, and community self-representation.</p>",
    content_type: "CFP",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    category_id: "c3",
    category: DEMO_CATEGORIES[2],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    published_at: "2026-08-20T10:00:00Z",
    created_at: "2026-08-20T10:00:00Z",
    updated_at: "2026-08-20T10:00:00Z",
    tags: [DEMO_TAGS[2], DEMO_TAGS[7]],
    cfp: {
      conference_name: "Special Issue Workshop: Digital Ethnography in Platform Societies",
      theme: "Methodological Challenges and Fieldwork Ethics",
      organizing_institution: "Consortium for Digital Humanities & Cultural Research",
      submission_deadline: "2026-09-17T23:59:59Z", // passed (3 days ago)
      abstract_deadline: "2026-09-01T23:59:59Z",
      full_paper_deadline: "2026-09-17T23:59:59Z",
      notification_date: "2026-10-01T00:00:00Z",
      conference_start: "2026-10-30",
      conference_end: "2026-10-31",
      mode: "ONLINE",
      submission_url: "https://example.org/cfp/ethnography2026/submit",
      contact_email: "editors@ethnography2026.example.org",
    },
  },

  // 3. CONFERENCES (4)
  {
    id: "conf1",
    title: "World Congress of Political Science 2026",
    slug: "world-congress-political-science-2026",
    short_description: "The premier biennial gathering of over 3,000 political scientists, policy analysts, and institutional theorists from 85+ nations.",
    content: "<p>The World Congress features over 600 panels, distinguished keynote addresses, plenary debates on democratic decay and renewal, and extensive networking venues.</p>",
    content_type: "CONFERENCE",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    category_id: "c2",
    category: DEMO_CATEGORIES[1],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Argentina",
    location: "Buenos Aires",
    published_at: "2026-09-01T12:00:00Z",
    created_at: "2026-09-01T12:00:00Z",
    updated_at: "2026-09-01T12:00:00Z",
    tags: [DEMO_TAGS[1], DEMO_TAGS[5]],
    conference: {
      conference_name: "World Congress of Political Science",
      theme: "Rethinking Democracy in an Era of Multipolar Fractures",
      organizer: "International Political Science Association",
      start_date: "2026-11-20",
      end_date: "2026-11-24",
      submission_deadline: "2026-10-20T23:59:59Z",
      registration_deadline: "2026-11-05T23:59:59Z",
      country: "Argentina",
      city: "Buenos Aires",
      venue: "Palacio San Martin Convention Hall",
      mode: "HYBRID",
      website: "https://example.org/wcps2026",
      registration_url: "https://example.org/wcps2026/register",
      contact: "congress@ipsa-example.org",
    },
  },
  {
    id: "conf2",
    title: "European Sociology Summit on Labor, Technology & Welfare",
    slug: "european-sociology-summit-labor-tech-welfare",
    short_description: "Four-day multidisciplinary conference gathering sociological research on automated workplaces, gig labor, and universal safety nets.",
    content: "<p>Examining structural transformations of work, platform cooperatives, algorithmic management, and new welfare state models.</p>",
    content_type: "CONFERENCE",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
    category_id: "c3",
    category: DEMO_CATEGORIES[2],
    organization_id: "o4",
    organization: DEMO_ORGANIZATIONS[3],
    country: "Austria",
    location: "Vienna",
    published_at: "2026-08-25T10:00:00Z",
    created_at: "2026-08-25T10:00:00Z",
    updated_at: "2026-08-25T10:00:00Z",
    tags: [DEMO_TAGS[7]],
    conference: {
      conference_name: "European Sociology Summit",
      theme: "Automation, Precarity, and the Future of Social Protection",
      organizer: "European Sociological Association",
      start_date: "2026-12-08",
      end_date: "2026-12-11",
      submission_deadline: "2026-10-10T23:59:59Z",
      registration_deadline: "2026-11-15T23:59:59Z",
      country: "Austria",
      city: "Vienna",
      venue: "University of Vienna Historical Campus",
      mode: "OFFLINE",
      website: "https://example.org/socsummit2026",
      registration_url: "https://example.org/socsummit2026/register",
    },
  },
  {
    id: "conf3",
    title: "International Conference on Development Economics (ICDE)",
    slug: "international-conference-development-economics",
    short_description: "Global gathering presenting cutting-edge micro-econometric evaluations, randomized control trials, and macro-policy interventions.",
    content: "<p>Uniting prominent developmental economists, central bank researchers, and international organization policy officers.</p>",
    content_type: "CONFERENCE",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?q=80&w=1200&auto=format&fit=crop",
    category_id: "c4",
    category: DEMO_CATEGORIES[3],
    organization_id: "o3",
    organization: DEMO_ORGANIZATIONS[2],
    country: "France",
    location: "Paris",
    published_at: "2026-08-10T10:00:00Z",
    created_at: "2026-08-10T10:00:00Z",
    updated_at: "2026-08-10T10:00:00Z",
    tags: [DEMO_TAGS[3], DEMO_TAGS[8]],
    conference: {
      conference_name: "International Conference on Development Economics",
      theme: "Evidence-Based Interventions in Turbulent Geoeconomics",
      organizer: "Center for International Development Research & AFSE",
      start_date: "2026-10-15",
      end_date: "2026-10-17",
      submission_deadline: "2026-09-30T23:59:59Z",
      registration_deadline: "2026-10-10T23:59:59Z",
      country: "France",
      city: "Paris",
      venue: "Paris School of Economics Amphitheater",
      mode: "HYBRID",
      website: "https://example.org/icde2026",
      registration_url: "https://example.org/icde2026/register",
      contact: "icde@cidr-example.org",
    },
  },
  {
    id: "conf4",
    title: "SSRF Biennial Symposium on Interdisciplinary Social Theory",
    slug: "ssrf-biennial-symposium-interdisciplinary-social-theory",
    short_description: "Convened by the Social Sciences Research Forum, uniting international scholars on epistemological synthesis and social theory.",
    content: "<p>The signature biennial symposium of the Social Sciences Research Forum (SSRF). Featuring 8 plenary dialogues, cross-disciplinary working tracks, and publication roundtables.</p>",
    content_type: "CONFERENCE",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    category_id: "c1",
    category: DEMO_CATEGORIES[0],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    location: "Geneva",
    published_at: "2026-09-12T10:00:00Z",
    created_at: "2026-09-12T10:00:00Z",
    updated_at: "2026-09-12T10:00:00Z",
    tags: [DEMO_TAGS[4]],
    conference: {
      conference_name: "SSRF Biennial Symposium",
      theme: "Epistemological Renewal: Decentering and Reconstructing Social Analysis",
      organizer: "Social Sciences Research Forum (SSRF)",
      start_date: "2027-01-14",
      end_date: "2027-01-17",
      submission_deadline: "2026-11-20T23:59:59Z",
      registration_deadline: "2026-12-15T23:59:59Z",
      country: "Switzerland",
      city: "Geneva",
      venue: "Geneva International Conference Centre (CICG)",
      mode: "HYBRID",
      website: "https://example.org/ssrf-symposium",
      registration_url: "https://example.org/ssrf-symposium/tickets",
      contact: "symposium@ssrf-network.example.org",
    },
  },

  // 4. OPPORTUNITIES & FELLOWSHIPS & FUNDING
  {
    id: "opp1",
    title: "Postdoctoral Research Fellowship in Computational Politics & Deliberation",
    slug: "postdoctoral-fellowship-computational-politics",
    short_description: "Fully funded 24-month postdoctoral fellowship investigating social media network propagation and parliamentary policy debates.",
    content: "<p>The Consortium for Digital Humanities & Politics invites applications for a 2-year postdoctoral fellowship. The fellow will join an ERC-backed research initiative investigating deliberative structures.</p>",
    content_type: "FELLOWSHIP",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    category_id: "c2",
    category: DEMO_CATEGORIES[1],
    organization_id: "o4",
    organization: DEMO_ORGANIZATIONS[3],
    country: "Germany",
    location: "Berlin",
    published_at: "2026-09-05T10:00:00Z",
    created_at: "2026-09-05T10:00:00Z",
    updated_at: "2026-09-05T10:00:00Z",
    tags: [DEMO_TAGS[1], DEMO_TAGS[7]],
    fellowship: {
      institution: "Center for Digital Humanities & Politics",
      eligibility: "PhD awarded within past 5 years in Political Science, Sociology, or Computer Science.",
      duration: "24 Months",
      funding: "€54,000 / year + research travel budget",
      deadline: "2026-10-18T23:59:59Z", // active (~28 days)
      location: "Berlin, Germany",
      eligible_countries: ["All Nations"],
      application_url: "https://example.org/fellowships/apply/cp2026",
      official_website: "https://example.org/cdhp",
    },
  },
  {
    id: "opp2",
    title: "Visiting Scholar Residency: Global South Political Economy",
    slug: "visiting-scholar-residency-global-south",
    short_description: "Residency program offering travel, living stipend, and collaborative access to archival and computational datasets for up to 6 months.",
    content: "<p>Supporting faculty and researchers from emerging scholarly institutions to engage in collaborative monograph writing and dataset publication.</p>",
    content_type: "OPPORTUNITY",
    status: "PUBLISHED",
    featured: false,
    cover_image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    category_id: "c7",
    category: DEMO_CATEGORIES[6],
    organization_id: "o3",
    organization: DEMO_ORGANIZATIONS[2],
    country: "Canada",
    location: "Ottawa",
    published_at: "2026-09-02T10:00:00Z",
    created_at: "2026-09-02T10:00:00Z",
    updated_at: "2026-09-02T10:00:00Z",
    tags: [DEMO_TAGS[8]],
    opportunity: {
      opportunity_type: "Visiting Scholar",
      eligibility: "Full-time academic faculty or post-doctoral researchers in economics or development sociology.",
      location: "Ottawa / Montreal, Canada",
      deadline: "2026-10-09T23:59:59Z", // active (~19 days)
      research_area: "Comparative Development Economics",
      application_url: "https://example.org/opportunities/visiting-residency",
    },
  },
  {
    id: "opp3",
    title: "Academic Research Grant: Institutional Innovation & Democratic Integrity",
    slug: "grant-institutional-innovation-democratic-integrity",
    short_description: "Competitive grant awards of up to €120,000 for early-career and mid-career researchers addressing election verification and misinformation.",
    content: "<p>Grant funding aimed at empirical investigations into electoral administration transparency, trust formation, and resilient civic audit mechanisms.</p>",
    content_type: "FUNDING",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    category_id: "c6",
    category: DEMO_CATEGORIES[5],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    published_at: "2026-09-14T09:00:00Z",
    created_at: "2026-09-14T09:00:00Z",
    updated_at: "2026-09-14T09:00:00Z",
    tags: [DEMO_TAGS[1]],
    funding: {
      provider: "Global Social Science Research Fund",
      eligibility: "Scholars affiliated with accredited higher-education institutions.",
      funding_amount: "€50,000 – €120,000",
      deadline: "2026-10-25T23:59:59Z", // active (~35 days)
      eligible_countries: ["Worldwide"],
      research_areas: ["Public Administration", "Democratic Governance", "Political Communications"],
      application_url: "https://example.org/grants/apply",
      official_website: "https://example.org/gssa/grants",
    },
  },
  {
    id: "opp4",
    title: "SSRF Early Career Scholar Travel Grants 2026",
    slug: "ssrf-early-career-scholar-travel-grants",
    short_description: "Grants to support postgraduate scholars from underrepresented regions presenting research at international social science symposiums.",
    content: "<p>The Social Sciences Research Forum provides direct financial assistance to doctoral candidates and early-career researchers travelling to international conferences.</p>",
    content_type: "FUNDING",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    category_id: "c1",
    category: DEMO_CATEGORIES[0],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    published_at: "2026-09-12T08:00:00Z",
    created_at: "2026-09-12T08:00:00Z",
    updated_at: "2026-09-12T08:00:00Z",
    tags: [DEMO_TAGS[4], DEMO_TAGS[8]],
    funding: {
      provider: "Social Sciences Research Forum (SSRF)",
      eligibility: "Postgraduate researchers and PhD candidates within 3 years of dissertation defense.",
      funding_amount: "Up to €2,500 per grantee",
      deadline: "2026-11-01T23:59:59Z", // active (~42 days)
      eligible_countries: ["Global South", "Emerging Scholars"],
      research_areas: ["Social Sciences", "Interdisciplinary Studies"],
      application_url: "https://example.org/ssrf/travel-grants",
      official_website: "https://example.org/ssrf",
    },
  },

  // 5. WORKSHOPS & WEBINARS
  {
    id: "w1",
    title: "Advanced Methods Workshop: Causal Inference in Observational Policy Data",
    slug: "workshop-causal-inference-observational-policy-data",
    short_description: "Intensive 2-day technical workshop covering difference-in-differences, regression discontinuity, and synthetic controls using R and Stata.",
    content: "<p>Targeted at doctoral students and empirical researchers seeking to master robust identification strategies in administrative datasets.</p>",
    content_type: "WORKSHOP",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    category_id: "c6",
    category: DEMO_CATEGORIES[5],
    organization_id: "o2",
    organization: DEMO_ORGANIZATIONS[1],
    country: "United Kingdom",
    location: "Online",
    published_at: "2026-09-16T10:00:00Z",
    created_at: "2026-09-16T10:00:00Z",
    updated_at: "2026-09-16T10:00:00Z",
    tags: [DEMO_TAGS[3]],
    workshop: {
      organizer: "Institute for Policy & Governance",
      speaker: "Dr. Marcus Sterling & Prof. Clara Lindqvist",
      date: "2026-10-18",
      time: "09:00 - 16:30",
      timezone: "GMT",
      mode: "ONLINE",
      registration_url: "https://example.org/workshops/causal-inference/register",
      meeting_url: "https://zoom.us/j/example",
    },
  },
  {
    id: "w2",
    title: "Live Scholarly Webinar: Publishing in High-Impact Social Science Journals",
    slug: "webinar-publishing-high-impact-social-science-journals",
    short_description: "Senior journal editors share actionable advice on manuscript structuring, handling revise-and-resubmits, and responding to reviewer comments.",
    content: "<p>A 90-minute interactive session providing inside perspectives on the peer review workflow, desk reject criteria, and framing theoretical novelty.</p>",
    content_type: "WEBINAR",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
    category_id: "c1",
    category: DEMO_CATEGORIES[0],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    location: "Zoom Virtual Room",
    published_at: "2026-09-18T10:00:00Z",
    created_at: "2026-09-18T10:00:00Z",
    updated_at: "2026-09-18T10:00:00Z",
    tags: [DEMO_TAGS[4], DEMO_TAGS[5]],
    webinar: {
      organizer: "Social Sciences Research Forum (SSRF)",
      speaker: "Prof. Elena Rostova & Dr. Amina Al-Mansoor",
      date: "2026-10-02",
      time: "14:00 - 15:30",
      timezone: "CET",
      registration_url: "https://example.org/webinars/ssrf-publishing/rsvp",
      meeting_url: "https://zoom.us/j/example-ssrf",
    },
  },

  // 6. ARTICLES & RESOURCES
  {
    id: "art1",
    title: "Decentering the Core: Epistemic Justice and Methodological Reform in Social Inquiry",
    slug: "decentering-the-core-epistemic-justice",
    short_description: "An in-depth scholarly essay investigating the structural imbalances of academic publishing, peer citation networks, and curriculum decolonization.",
    content: "<h2>Introduction</h2><p>The geography of scholarly knowledge production remains profoundly asymmetric. Despite decades of critical scholarship emphasizing epistemic pluralism, peer-reviewed recognition, editorial board appointments, and citation dynamics continue to center a narrow constellation of Northern institutions.</p><h3>Structural Disparities in Global Citation Networks</h3><p>Bibliometric audits across major political science and sociology databases demonstrate that scholarship originating outside the North Atlantic sphere is frequently consigned to 'regional case study' status rather than foundational theory building.</p><blockquote>Knowledge is neither neutral nor disembodied; the institutional architectures of scholarly validation determine what questions are deemed universally rigorous.</blockquote><h3>Reconstructing Academic Validation</h3><p>In response, modern scholar-led networks like the Social Sciences Research Forum (SSRF) champion transparent peer evaluation, linguistic accessibility, and open access dissemination.</p>",
    content_type: "ARTICLE",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
    category_id: "c1",
    category: DEMO_CATEGORIES[0],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    published_at: "2026-09-12T10:00:00Z",
    created_at: "2026-09-12T10:00:00Z",
    updated_at: "2026-09-12T10:00:00Z",
    authors: [DEMO_AUTHORS[0]],
    tags: [DEMO_TAGS[4], DEMO_TAGS[8]],
    article: {
      excerpt: "Investigating the structural imbalances of academic publishing, citation dynamics, and how global networks can nurture genuine methodological reform.",
      reading_time: 8,
    },
  },
  {
    id: "res1",
    title: "Academic Writing Guide: Structuring Rigorous Empirical Working Papers",
    slug: "academic-writing-guide-empirical-working-papers",
    short_description: "A comprehensive reference manual detailing standard section anatomy, econometric notation standards, and reproducibility checklists.",
    content: "<p>Complete academic guidebook for researchers drafting peer-review-ready working papers and symposium submissions. Includes standardized LaTeX and Word templates.</p>",
    content_type: "RESOURCE",
    status: "PUBLISHED",
    featured: true,
    cover_image_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
    category_id: "c8",
    category: DEMO_CATEGORIES[7],
    organization_id: "o1",
    organization: DEMO_ORGANIZATIONS[0],
    country: "Switzerland",
    published_at: "2026-09-06T10:00:00Z",
    created_at: "2026-09-06T10:00:00Z",
    updated_at: "2026-09-06T10:00:00Z",
    tags: [DEMO_TAGS[0], DEMO_TAGS[4]],
    resource: {
      resource_type: "Methodology Guidebook",
      author_org: "AcademIQ Editorial Committee & SSRF",
      file_format: "PDF",
      file_size: "2.4 MB",
      download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  },
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: "al-1",
    action: "CONTENT_PUBLISH",
    entity_type: "CFP",
    entity_id: "c_cfp3",
    details: { title: "CFP: SSRF Annual Research Colloquium 2026", status: "PUBLISHED" },
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    user_email: "admin@academiq.org",
    user_name: "Chief Academic Officer",
  },
  {
    id: "al-2",
    action: "MEDIA_UPLOAD",
    entity_type: "MEDIA",
    entity_id: "m3",
    details: { file_name: "ssrf_symposium_banner.jpg", size: "780 KB", bucket: "academiq-images" },
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    user_email: "admin@academiq.org",
    user_name: "Chief Academic Officer",
  },
  {
    id: "al-3",
    action: "CONTENT_CREATE",
    entity_type: "RESEARCH_PAPER",
    entity_id: "p1",
    details: { title: "Algorithmic Governance and Deliberative Norms in Digital Public Spheres" },
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    user_email: "editor@academiq.org",
    user_name: "Associate Editor",
  },
];

// Singleton in-memory demo content repository
export class DemoContentRepository implements IContentRepository {
  private content: FullContentItem[] = [...INITIAL_DEMO_CONTENT];
  private media: MediaItem[] = [...DEMO_MEDIA];
  private auditLogs: AuditLog[] = [...DEMO_AUDIT_LOGS];
  private subscribers: Set<string> = new Set(["scholar@harvard.edu", "researcher@ox.ac.uk"]);

  async getContentList(params: ContentFilterParams = {}): Promise<{ items: FullContentItem[]; total: number }> {
    let filtered = [...this.content];

    // Status filter (Default to PUBLISHED for public users unless specified)
    if (params.status) {
      filtered = filtered.filter((i) => i.status === params.status);
    }

    // Content type filter
    if (params.type) {
      filtered = filtered.filter((i) => i.content_type === params.type);
    }

    // Category filter
    if (params.category) {
      filtered = filtered.filter(
        (i) => i.category?.slug === params.category || i.category_id === params.category
      );
    }

    // Tag filter
    if (params.tag) {
      filtered = filtered.filter((i) => i.tags?.some((t) => t.slug === params.tag || t.name === params.tag));
    }

    // Mode filter (online, offline, hybrid for cfps, conferences, workshops)
    if (params.mode) {
      filtered = filtered.filter((i) => {
        const itemMode = i.cfp?.mode || i.conference?.mode || i.workshop?.mode;
        return itemMode === params.mode;
      });
    }

    // Country filter
    if (params.country) {
      filtered = filtered.filter((i) => i.country?.toLowerCase() === params.country?.toLowerCase());
    }

    // Featured filter
    if (params.featured !== undefined) {
      filtered = filtered.filter((i) => i.featured === params.featured);
    }

    // Global text search across title, short_description, abstract, content, authors, organizations
    if (params.query && params.query.trim() !== "") {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter((i) => {
        const titleMatch = i.title.toLowerCase().includes(q);
        const descMatch = (i.short_description || "").toLowerCase().includes(q);
        const contentMatch = (i.content || "").toLowerCase().includes(q);
        const orgMatch = (i.organization?.name || "").toLowerCase().includes(q);
        const authorMatch = i.authors?.some((a) => a.name.toLowerCase().includes(q));
        const abstractMatch = (i.research_paper?.abstract || "").toLowerCase().includes(q);
        const themeMatch = (i.cfp?.theme || i.conference?.theme || "").toLowerCase().includes(q);
        return titleMatch || descMatch || contentMatch || orgMatch || authorMatch || abstractMatch || themeMatch;
      });
    }

    // Deadline filter
    if (params.deadline) {
      const now = new Date().getTime();
      filtered = filtered.filter((i) => {
        const deadlineDate = i.cfp?.submission_deadline || i.conference?.submission_deadline || i.funding?.deadline || i.fellowship?.deadline || i.opportunity?.deadline;
        if (!deadlineDate) return params.deadline === "all";
        const target = new Date(deadlineDate).getTime();
        const diffDays = Math.round((target - now) / (1000 * 60 * 60 * 24));
        if (params.deadline === "passed") return diffDays < 0;
        if (params.deadline === "closing-soon") return diffDays >= 0 && diffDays <= 7;
        if (params.deadline === "active") return diffDays >= 0;
        return true;
      });
    }

    // Sorting
    if (params.sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime());
    } else if (params.sortBy === "deadline") {
      filtered.sort((a, b) => {
        const dateA = a.cfp?.submission_deadline || a.conference?.submission_deadline || a.funding?.deadline || a.fellowship?.deadline || "2099-12-31";
        const dateB = b.cfp?.submission_deadline || b.conference?.submission_deadline || b.funding?.deadline || b.fellowship?.deadline || "2099-12-31";
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      });
    } else {
      // Default: newest
      filtered.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
    }

    const total = filtered.length;
    const page = params.page || 1;
    const limit = params.limit || 20;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return { items: paginated, total };
  }

  async getContentBySlug(slug: string): Promise<FullContentItem | null> {
    const item = this.content.find((i) => i.slug === slug);
    return item || null;
  }

  async getContentById(id: string): Promise<FullContentItem | null> {
    const item = this.content.find((i) => i.id === id);
    return item || null;
  }

  async getFeaturedContent(limit = 6): Promise<FullContentItem[]> {
    return this.content.filter((i) => i.status === "PUBLISHED" && i.featured).slice(0, limit);
  }

  async getUpcomingDeadlines(limit = 6): Promise<FullContentItem[]> {
    const now = new Date().getTime();
    return this.content
      .filter((i) => {
        if (i.status !== "PUBLISHED") return false;
        const d = i.cfp?.submission_deadline || i.conference?.submission_deadline || i.funding?.deadline || i.fellowship?.deadline || i.opportunity?.deadline;
        if (!d) return false;
        const diff = new Date(d).getTime() - now;
        return diff >= 0; // future
      })
      .sort((a, b) => {
        const da = a.cfp?.submission_deadline || a.conference?.submission_deadline || a.funding?.deadline || a.fellowship?.deadline || a.opportunity?.deadline || "";
        const db = b.cfp?.submission_deadline || b.conference?.submission_deadline || b.funding?.deadline || b.fellowship?.deadline || b.opportunity?.deadline || "";
        return new Date(da).getTime() - new Date(db).getTime();
      })
      .slice(0, limit);
  }

  async getRelatedContent(item: FullContentItem, limit = 3): Promise<FullContentItem[]> {
    return this.content
      .filter(
        (i) =>
          i.id !== item.id &&
          i.status === "PUBLISHED" &&
          (i.category_id === item.category_id || i.content_type === item.content_type)
      )
      .slice(0, limit);
  }

  async getCategories(): Promise<Category[]> {
    return [...DEMO_CATEGORIES];
  }

  async getTags(): Promise<Tag[]> {
    return [...DEMO_TAGS];
  }

  async getOrganizations(): Promise<Organization[]> {
    return [...DEMO_ORGANIZATIONS];
  }

  async getAuthors(): Promise<Author[]> {
    return [...DEMO_AUTHORS];
  }

  async getMediaList(): Promise<MediaItem[]> {
    return [...this.media];
  }

  async getMediaUsage(mediaId: string): Promise<MediaUsageResult> {
    const matched = this.content.filter(
      (c) =>
        c.cover_image_id === mediaId ||
        c.research_paper?.pdf_media_id === mediaId ||
        c.cfp?.cfp_pdf_media_id === mediaId ||
        c.funding?.document_media_id === mediaId ||
        c.resource?.download_media_id === mediaId
    );
    return {
      count: matched.length,
      items: matched.map((m) => ({ id: m.id, title: m.title, type: m.content_type, slug: m.slug })),
    };
  }

  async createContent(data: Partial<FullContentItem>, specData: Record<string, unknown> = {}): Promise<FullContentItem> {
    const newItem: FullContentItem = {
      id: `demo-${Date.now()}`,
      title: data.title || "Untitled Academic Item",
      slug: data.slug || `demo-item-${Date.now()}`,
      short_description: data.short_description || "",
      content: data.content || "",
      content_type: data.content_type || "ARTICLE",
      status: data.status || "DRAFT",
      featured: data.featured || false,
      category_id: data.category_id || DEMO_CATEGORIES[0].id,
      category: DEMO_CATEGORIES.find((c) => c.id === data.category_id) || DEMO_CATEGORIES[0],
      organization_id: data.organization_id || DEMO_ORGANIZATIONS[0].id,
      organization: DEMO_ORGANIZATIONS.find((o) => o.id === data.organization_id) || DEMO_ORGANIZATIONS[0],
      country: data.country || "Global",
      location: data.location || "",
      cover_image_url: data.cover_image_url || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
      published_at: data.status === "PUBLISHED" ? new Date().toISOString() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...specData,
    };

    this.content.unshift(newItem);
    await this.addAuditLog("CONTENT_CREATE", newItem.content_type, newItem.id, { title: newItem.title });
    return newItem;
  }

  async updateContent(id: string, data: Partial<FullContentItem>, specData: Record<string, unknown> = {}): Promise<FullContentItem> {
    const idx = this.content.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Content item ${id} not found.`);

    const existing = this.content[idx];
    const updated: FullContentItem = {
      ...existing,
      ...data,
      ...specData,
      updated_at: new Date().toISOString(),
    };
    this.content[idx] = updated;

    await this.addAuditLog("CONTENT_UPDATE", updated.content_type, updated.id, { title: updated.title });
    return updated;
  }

  async deleteContent(id: string): Promise<boolean> {
    const idx = this.content.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    const removed = this.content.splice(idx, 1)[0];
    await this.addAuditLog("CONTENT_DELETE", removed.content_type, removed.id, { title: removed.title });
    return true;
  }

  async updateContentStatus(id: string, status: ContentStatus): Promise<boolean> {
    const item = this.content.find((c) => c.id === id);
    if (!item) return false;
    item.status = status;
    if (status === "PUBLISHED" && !item.published_at) {
      item.published_at = new Date().toISOString();
    }
    item.updated_at = new Date().toISOString();
    await this.addAuditLog("CONTENT_STATUS_CHANGE", item.content_type, item.id, { newStatus: status });
    return true;
  }

  async toggleFeatured(id: string, featured: boolean): Promise<boolean> {
    const item = this.content.find((c) => c.id === id);
    if (!item) return false;
    item.featured = featured;
    item.updated_at = new Date().toISOString();
    return true;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return {
      total: this.content.length,
      published: this.content.filter((c) => c.status === "PUBLISHED").length,
      drafts: this.content.filter((c) => c.status === "DRAFT").length,
      papers: this.content.filter((c) => c.content_type === "RESEARCH_PAPER").length,
      cfps: this.content.filter((c) => c.content_type === "CFP").length,
      conferences: this.content.filter((c) => c.content_type === "CONFERENCE").length,
      opportunities: this.content.filter((c) =>
        ["OPPORTUNITY", "FUNDING", "FELLOWSHIP"].includes(c.content_type)
      ).length,
    };
  }

  async getAuditLogs(limit = 15): Promise<AuditLog[]> {
    return this.auditLogs.slice(0, limit);
  }

  async addAuditLog(action: string, entityType: string, entityId?: string, details?: Record<string, unknown>): Promise<void> {
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString(),
      user_email: "admin@academiq.org",
      user_name: "Academic Administrator (Demo)",
    });
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    if (!email || !email.includes("@")) {
      return { success: false, message: "Please provide a valid institutional or personal email address." };
    }
    if (this.subscribers.has(email)) {
      return { success: true, message: "You are already subscribed to the AcademIQ academic digest." };
    }
    this.subscribers.add(email);
    return { success: true, message: "Thank you for subscribing to AcademIQ Research & CFP alerts!" };
  }
}
