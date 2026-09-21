-- ==============================================================================
-- AcademIQ — Research & CFP Network
-- Seed Data Script (Idempotent & Self-Contained)
-- ==============================================================================

-- 1. SEED TAXONOMY: CATEGORIES
INSERT INTO public.categories (id, name, slug, description, icon)
VALUES
    ('c0000000-0000-0000-0000-000000000001', 'Social Sciences', 'social-sciences', 'Scholarly inquiry into human society, institutions, and civic relations.', 'Users'),
    ('c0000000-0000-0000-0000-000000000002', 'Political Science', 'political-science', 'Study of governance systems, political behavior, and democratic processes.', 'Landmark'),
    ('c0000000-0000-0000-0000-000000000003', 'Sociology', 'sociology', 'Analysis of social structures, collective action, and cultural changes.', 'Network'),
    ('c0000000-0000-0000-0000-000000000004', 'Economics', 'economics', 'Microeconomics, macroeconomic policy, behavioral finance, and econometrics.', 'TrendingUp'),
    ('c0000000-0000-0000-0000-000000000005', 'International Relations', 'international-relations', 'Geopolitics, diplomacy, international law, and global security.', 'Globe'),
    ('c0000000-0000-0000-0000-000000000006', 'Public Policy', 'public-policy', 'Policy design, public administration, evaluation, and regulatory frameworks.', 'FileText'),
    ('c0000000-0000-0000-0000-000000000007', 'Development Studies', 'development-studies', 'Global development, poverty alleviation, and sustainable institutions.', 'Leaf'),
    ('c0000000-0000-0000-0000-000000000008', 'Interdisciplinary Studies', 'interdisciplinary-studies', 'Cross-cutting inquiries bridging technology, society, and ethics.', 'Layers')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. SEED TAXONOMY: TAGS
INSERT INTO public.tags (id, name, slug)
VALUES
    ('t0000000-0000-0000-0000-000000000001', 'Open Access', 'open-access'),
    ('t0000000-0000-0000-0000-000000000002', 'Digital Democracy', 'digital-democracy'),
    ('t0000000-0000-0000-0000-000000000003', 'Qualitative Methods', 'qualitative-methods'),
    ('t0000000-0000-0000-0000-000000000004', 'Econometrics', 'econometrics'),
    ('t0000000-0000-0000-0000-000000000005', 'SSRF Initiative', 'ssrf-initiative'),
    ('t0000000-0000-0000-0000-000000000006', 'Peer Reviewed', 'peer-reviewed'),
    ('t0000000-0000-0000-0000-000000000007', 'Climate Policy', 'climate-policy'),
    ('t0000000-0000-0000-0000-000000000008', 'AI & Society', 'ai-and-society'),
    ('t0000000-0000-0000-0000-000000000009', 'Global South', 'global-south')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 3. SEED ORGANIZATIONS
INSERT INTO public.organizations (id, name, slug, website, country, description)
VALUES
    ('o0000000-0000-0000-0000-000000000001', 'Global Social Science Alliance', 'global-social-science-alliance', 'https://example.org/gssa', 'Switzerland', 'International federation of academic research bodies promoting rigorous social inquiry.'),
    ('o0000000-0000-0000-0000-000000000002', 'Institute for Policy & Governance', 'institute-for-policy-governance', 'https://example.org/ipg', 'United Kingdom', 'Leading non-partisan academic think tank analyzing modern public administration.'),
    ('o0000000-0000-0000-0000-000000000003', 'Center for International Development Research', 'cidr-global', 'https://example.org/cidr', 'Canada', 'Pioneering multidisciplinary research in sustainable economic growth and public welfare.'),
    ('o0000000-0000-0000-0000-000000000004', 'Consortium for Digital Humanities & Politics', 'cdhp-eu', 'https://example.org/cdhp', 'Germany', 'Inter-university network researching algorithmic systems, governance, and civil society.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, website = EXCLUDED.website;

-- 4. SEED AUTHORS
INSERT INTO public.authors (id, name, affiliation, orcid, email, bio)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Prof. Elena Rostova', 'Global Social Science Alliance', '0000-0002-1825-0097', 'e.rostova@example.org', 'Professor of Comparative Politics focusing on electoral behavior in hybrid regimes.'),
    ('a0000000-0000-0000-0000-000000000002', 'Dr. Marcus Sterling', 'Institute for Policy & Governance', '0000-0003-2411-8842', 'm.sterling@example.org', 'Senior Research Fellow in Institutional Economics and Public Finance.'),
    ('a0000000-0000-0000-0000-000000000003', 'Dr. Amina Al-Mansoor', 'Center for International Development Research', '0000-0001-9042-3319', 'a.almansoor@example.org', 'Director of Comparative Development Studies, author of three monographs on rural resilience.'),
    ('a0000000-0000-0000-0000-000000000004', 'Dr. Julian Vane', 'Consortium for Digital Humanities & Politics', '0000-0002-7714-9912', 'j.vane@example.org', 'Computational Social Scientist studying automated deliberation and public sphere dynamics.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, affiliation = EXCLUDED.affiliation;

-- 5. SEED RESEARCH PAPERS
INSERT INTO public.content (id, title, slug, short_description, content_type, status, featured, category_id, organization_id, country, published_at)
VALUES
    ('p0000000-0000-0000-0000-000000000001', 
     'Algorithmic Governance and Deliberative Norms in Digital Public Spheres', 
     'algorithmic-governance-and-deliberative-norms', 
     'An empirical examination into how algorithmic recommendation mechanisms influence cross-ideological discourse in contemporary parliamentary democracies.',
     'RESEARCH_PAPER', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000004', 'Germany', NOW() - INTERVAL '14 days'),
    
    ('p0000000-0000-0000-0000-000000000002', 
     'Fiscal Decentralization and Municipal Resilience: Evidence from 120 Local Councils', 
     'fiscal-decentralization-and-municipal-resilience', 
     'A longitudinal econometrics study investigating local tax autonomy and revenue diversification following macroeconomic shocks.',
     'RESEARCH_PAPER', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000004', 'o0000000-0000-0000-0000-000000000002', 'United Kingdom', NOW() - INTERVAL '28 days'),

    ('p0000000-0000-0000-0000-000000000003', 
     'Social Cohesion in Post-Industrial Communities: A Mixed-Methods Ethnography', 
     'social-cohesion-in-post-industrial-communities', 
     'Explores civic networks, voluntary associations, and generational identity reconstruction in deindustrialized regional centers.',
     'RESEARCH_PAPER', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000003', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '5 days'),

    ('p0000000-0000-0000-0000-000000000004', 
     'Climate Adaptation Policy Frameworks in the Global South: Comparative Case Analysis', 
     'climate-adaptation-policy-frameworks-global-south', 
     'Synthesizes administrative capacity constraints and participatory governance models across sub-Saharan and South Asian agricultural zones.',
     'RESEARCH_PAPER', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000007', 'o0000000-0000-0000-0000-000000000003', 'Canada', NOW() - INTERVAL '40 days'),

    ('p0000000-0000-0000-0000-000000000005', 
     'Multilateral Treaties Under Strategic Competition: Re-evaluating Norm Cascades', 
     'multilateral-treaties-under-strategic-competition', 
     'Analyzes treaty compliance and diplomatic friction in energy transitions amidst heightened multipolar geopolitical rivalry.',
     'RESEARCH_PAPER', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000005', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '12 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.research_papers (content_id, abstract, publication_date, journal, volume, issue, doi, publisher)
VALUES
    ('p0000000-0000-0000-0000-000000000001', 
     'This study investigates the systemic impact of feed optimization algorithms on deliberative quality in digital communications. Analyzing 1.2M public parliamentary submissions and corresponding digital threads, we demonstrate that algorithmic ranking systematically depreciates nuanced civic debate in favor of affectively polarized discourse.',
     '2026-08-15', 'Journal of Digital Politics & Deliberation', 'Vol. 14', 'Issue 2', '10.1080/jdpd.2026.0418', 'Academic Scholarly Press'),

    ('p0000000-0000-0000-0000-000000000002', 
     'Local governments face unprecedented macroeconomic volatility. Using a staggered panel regression across 120 UK and European councils between 2015 and 2025, this paper quantifies the buffer coefficient of autonomous municipal revenue streams.',
     '2026-07-20', 'Review of Comparative Public Finance', 'Vol. 32', 'Issue 4', '10.1111/rcpf.2026.1102', 'Policy Economics House'),

    ('p0000000-0000-0000-0000-000000000003', 
     'How do community bonds regenerate when traditional employer-centered institutions vanish? Drawing on 18 months of ethnographic fieldwork and 84 life-history interviews, this paper constructs a taxonomy of modern mutual-aid networks.',
     '2026-09-01', 'Sociological Perspectives Quarterly', 'Vol. 48', 'Issue 1', '10.1177/spq.2026.0911', 'Sociology Research Forum'),

    ('p0000000-0000-0000-0000-000000000004', 
     'National adaptation plans often falter at the municipal implementation layer. We present comparative evidence from 6 nations, identifying statutory ambiguity and fiscal delays as the primary bottlenecks.',
     '2026-06-10', 'Development Policy Review', 'Vol. 29', 'Issue 3', '10.1002/dpr.2026.7721', 'Global Development Publishing'),

    ('p0000000-0000-0000-0000-000000000005', 
     'Classical constructivist international relations theories posited linear norm cascades for international environmental agreements. We test this against contemporary multipolar friction, identifying strategic hedging mechanisms.',
     '2026-08-28', 'International Affairs & Law Review', 'Vol. 51', 'Issue 2', '10.1093/ialr.2026.3304', 'Oxford Academic Press')
ON CONFLICT (content_id) DO NOTHING;

-- 6. SEED CALLS FOR PAPERS (CFP) WITH ACTIVE & UPCOMING DEADLINES
INSERT INTO public.content (id, title, slug, short_description, content_type, status, featured, category_id, organization_id, country, published_at)
VALUES
    ('c0000000-0000-0000-0000-000000000011', 
     'CFP: 18th International Conference on Democratic Innovations and Civic Tech', 
     'cfp-18th-international-conf-democratic-innovations', 
     'Inviting original empirical and theoretical contributions examining democratic institutions, participatory budgeting, and deliberative polling systems.',
     'CFP', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000004', 'Germany', NOW() - INTERVAL '10 days'),

    ('c0000000-0000-0000-0000-000000000012', 
     'CFP: Global Symposium on Sustainable Economic Governance 2026', 
     'cfp-global-symposium-sustainable-economic-governance', 
     'Calling for working papers on green central banking, circular economy transitions, and sovereign debt sustainability in emergent markets.',
     'CFP', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000004', 'o0000000-0000-0000-0000-000000000002', 'United Kingdom', NOW() - INTERVAL '8 days'),

    ('c0000000-0000-0000-0000-000000000013', 
     'CFP: SSRF Annual Research Colloquium: Methodological Frontiers in Social Sciences', 
     'cfp-ssrf-annual-research-colloquium-2026', 
     'SSRF flagship call for papers exploring interdisciplinary research designs, ethnographic data triangulation, and ethical computational social science.',
     'CFP', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000001', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '3 days'),

    ('c0000000-0000-0000-0000-000000000014', 
     'CFP: Comparative Public Administration in Crisis & Recovery', 
     'cfp-comparative-public-admin-in-crisis', 
     'Inviting submissions on institutional agility, crisis procurement, public healthcare governance, and state capacity under stress.',
     'CFP', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000006', 'o0000000-0000-0000-0000-000000000002', 'United Kingdom', NOW() - INTERVAL '15 days'),

    ('c0000000-0000-0000-0000-000000000015', 
     'CFP: Digital Ethnography & Cultural Sociology in Platform Societies', 
     'cfp-digital-ethnography-cultural-sociology', 
     'Special issue Call for Papers exploring methodology, algorithmic subcultures, and virtual fieldwork challenges in contemporary sociology.',
     'CFP', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000003', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '20 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cfps (content_id, conference_name, theme, organizing_institution, submission_deadline, abstract_deadline, full_paper_deadline, notification_date, conference_start, conference_end, mode, submission_url, contact_email)
VALUES
    ('c0000000-0000-0000-0000-000000000011', 
     'International Conference on Democratic Innovations 2026', 
     'Institutional Resilience in Polarized Societies', 
     'European Consortium for Political Research', 
     NOW() + INTERVAL '24 days', NOW() + INTERVAL '12 days', NOW() + INTERVAL '24 days', NOW() + INTERVAL '45 days', '2026-11-15', '2026-11-18', 'HYBRID', 'https://example.org/cfp/democ2026', 'submissions@democ2026.example.org'),

    ('c0000000-0000-0000-0000-000000000012', 
     'Global Symposium on Sustainable Economic Governance', 
     'Monetary Policy, Climate Volatility, and Sovereign Stability', 
     'Institute for Policy & Governance & Partner Universities', 
     NOW() + INTERVAL '14 days', NOW() + INTERVAL '5 days', NOW() + INTERVAL '14 days', NOW() + INTERVAL '30 days', '2026-10-22', '2026-10-24', 'ONLINE', 'https://example.org/cfp/ecogov2026', 'cfp@ecogov2026.example.org'),

    ('c0000000-0000-0000-0000-000000000013', 
     'SSRF Annual Research Colloquium 2026', 
     'Bridging Epistemologies: Qualitative, Quantitative & Computational Synergies', 
     'Social Sciences Research Forum (SSRF)', 
     NOW() + INTERVAL '38 days', NOW() + INTERVAL '20 days', NOW() + INTERVAL '38 days', NOW() + INTERVAL '60 days', '2026-12-04', '2026-12-06', 'HYBRID', 'https://example.org/cfp/ssrf2026', 'colloquium@ssrf-network.example.org'),

    ('c0000000-0000-0000-0000-000000000014', 
     'Conference on Comparative Public Administration', 
     'Agility, Accountability, and State Machinery in Transition', 
     'Global Public Policy Society', 
     NOW() + INTERVAL '4 days', NOW() - INTERVAL '5 days', NOW() + INTERVAL '4 days', NOW() + INTERVAL '20 days', '2026-10-05', '2026-10-07', 'OFFLINE', 'https://example.org/cfp/pubadmin2026', 'admin@pubadmin2026.example.org'),

    ('c0000000-0000-0000-0000-000000000015', 
     'Special Issue Workshop: Digital Ethnography in Platform Societies', 
     'Methodological Challenges and Fieldwork Ethics', 
     'Consortium for Digital Humanities & Cultural Research', 
     NOW() - INTERVAL '3 days', NOW() - INTERVAL '15 days', NOW() - INTERVAL '3 days', NOW() + INTERVAL '10 days', '2026-10-30', '2026-10-31', 'ONLINE', 'https://example.org/cfp/ethnography2026', 'editors@ethnography2026.example.org')
ON CONFLICT (content_id) DO NOTHING;

-- 7. SEED CONFERENCES
INSERT INTO public.content (id, title, slug, short_description, content_type, status, featured, category_id, organization_id, country, location, published_at)
VALUES
    ('c0000000-0000-0000-0000-000000000021', 
     'World Congress of Political Science 2026', 
     'world-congress-political-science-2026', 
     'The premier biennial gathering of over 3,000 political scientists, policy analysts, and institutional theorists from 85+ nations.',
     'CONFERENCE', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000001', 'Argentina', 'Buenos Aires', NOW() - INTERVAL '12 days'),

    ('c0000000-0000-0000-0000-000000000022', 
     'European Sociology Summit on Labor, Technology & Welfare', 
     'european-sociology-summit-labor-tech-welfare', 
     'Four-day multidisciplinary conference gathering sociological research on automated workplaces, gig labor, and universal safety nets.',
     'CONFERENCE', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000003', 'o0000000-0000-0000-0000-000000000004', 'Austria', 'Vienna', NOW() - INTERVAL '18 days'),

    ('c0000000-0000-0000-0000-000000000023', 
     'International Conference on Development Economics (ICDE)', 
     'international-conference-development-economics', 
     'Global gathering presenting cutting-edge micro-econometric evaluations, randomized control trials, and macro-policy interventions.',
     'CONFERENCE', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000004', 'o0000000-0000-0000-0000-000000000003', 'France', 'Paris', NOW() - INTERVAL '25 days'),

    ('c0000000-0000-0000-0000-000000000024', 
     'SSRF Biennial Symposium on Interdisciplinary Social Theory', 
     'ssrf-biennial-symposium-interdisciplinary-social-theory', 
     'Convened by the Social Sciences Research Forum, uniting international scholars on epistemological synthesis and social theory.',
     'CONFERENCE', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000001', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', 'Geneva', NOW() - INTERVAL '7 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.conferences (content_id, conference_name, theme, organizer, start_date, end_date, submission_deadline, registration_deadline, country, city, venue, mode, website, registration_url, contact)
VALUES
    ('c0000000-0000-0000-0000-000000000021', 
     'World Congress of Political Science', 
     'Rethinking Democracy in an Era of Multipolar Fractures', 
     'International Political Science Association', 
     '2026-11-20', '2026-11-24', NOW() + INTERVAL '30 days', NOW() + INTERVAL '50 days', 'Argentina', 'Buenos Aires', 'Palacio San Martin Convention Hall', 'HYBRID', 'https://example.org/wcps2026', 'https://example.org/wcps2026/register', 'congress@ipsa-example.org'),

    ('c0000000-0000-0000-0000-000000000022', 
     'European Sociology Summit', 
     'Automation, Precarity, and the Future of Social Protection', 
     'European Sociological Association', 
     '2026-12-08', '2026-12-11', NOW() + INTERVAL '20 days', NOW() + INTERVAL '60 days', 'Austria', 'Vienna', 'University of Vienna Historical Campus', 'OFFLINE', 'https://example.org/socsummit2026', 'https://example.org/socsummit2026/register', 'info@esa-example.org'),

    ('c0000000-0000-0000-0000-000000000023', 
     'International Conference on Development Economics', 
     'Evidence-Based Interventions in Turbulent Geoeconomics', 
     'Center for International Development Research & AFSE', 
     '2026-10-15', '2026-10-17', NOW() + INTERVAL '10 days', NOW() + INTERVAL '22 days', 'France', 'Paris', 'Paris School of Economics Amphitheater', 'HYBRID', 'https://example.org/icde2026', 'https://example.org/icde2026/register', 'icde@cidr-example.org'),

    ('c0000000-0000-0000-0000-000000000024', 
     'SSRF Biennial Symposium', 
     'Epistemological Renewal: Decentering and Reconstructing Social Analysis', 
     'Social Sciences Research Forum (SSRF)', 
     '2027-01-14', '2027-01-17', NOW() + INTERVAL '60 days', NOW() + INTERVAL '90 days', 'Switzerland', 'Geneva', 'Geneva International Conference Centre (CICG)', 'HYBRID', 'https://example.org/ssrf-symposium', 'https://example.org/ssrf-symposium/tickets', 'symposium@ssrf-network.example.org')
ON CONFLICT (content_id) DO NOTHING;

-- 8. SEED OPPORTUNITIES & FELLOWSHIPS & FUNDING
INSERT INTO public.content (id, title, slug, short_description, content_type, status, featured, category_id, organization_id, country, published_at)
VALUES
    ('o0000000-0000-0000-0000-000000000031', 
     'Postdoctoral Research Fellowship in Computational Politics & Deliberation', 
     'postdoctoral-fellowship-computational-politics', 
     'Fully funded 24-month postdoctoral fellowship investigating social media network propagation and parliamentary policy debates.',
     'FELLOWSHIP', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000004', 'Germany', NOW() - INTERVAL '11 days'),

    ('o0000000-0000-0000-0000-000000000032', 
     'Visiting Scholar Residency: Global South Political Economy', 
     'visiting-scholar-residency-global-south', 
     'Residency program offering travel, living stipend, and collaborative access to archival and computational datasets for up to 6 months.',
     'OPPORTUNITY', 'PUBLISHED', false, 'c0000000-0000-0000-0000-000000000007', 'o0000000-0000-0000-0000-000000000003', 'Canada', NOW() - INTERVAL '16 days'),

    ('o0000000-0000-0000-0000-000000000033', 
     'Academic Research Grant: Institutional Innovation & Democratic Integrity', 
     'grant-institutional-innovation-democratic-integrity', 
     'Competitive grant awards of up to €120,000 for early-career and mid-career researchers addressing election verification and misinformation.',
     'FUNDING', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000006', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '5 days'),

    ('o0000000-0000-0000-0000-000000000034', 
     'SSRF Early Career Scholar Travel Grants 2026', 
     'ssrf-early-career-scholar-travel-grants', 
     'Grants to support postgraduate scholars from underrepresented regions presenting research at international social science symposiums.',
     'FUNDING', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000001', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '6 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.fellowships (content_id, institution, eligibility, duration, funding, deadline, location, eligible_countries, application_url, official_website)
VALUES
    ('o0000000-0000-0000-0000-000000000031', 
     'Center for Digital Humanities & Politics', 
     'PhD awarded within past 5 years in Political Science, Sociology, or Computer Science.', 
     '24 Months', '€54,000 / year + research budget', NOW() + INTERVAL '28 days', 'Berlin, Germany', 
     ARRAY['All Nations'], 'https://example.org/fellowships/apply/cp2026', 'https://example.org/cdhp')
ON CONFLICT (content_id) DO NOTHING;

INSERT INTO public.opportunities (content_id, opportunity_type, eligibility, location, deadline, research_area, application_url)
VALUES
    ('o0000000-0000-0000-0000-000000000032', 
     'Visiting Scholar', 
     'Full-time academic faculty or post-doctoral researchers in economics or development sociology.', 
     'Ottawa / Montreal, Canada', NOW() + INTERVAL '19 days', 'Comparative Development Economics', 'https://example.org/opportunities/visiting-residency')
ON CONFLICT (content_id) DO NOTHING;

INSERT INTO public.funding (content_id, provider, eligibility, funding_amount, deadline, eligible_countries, research_areas, application_url, official_website)
VALUES
    ('o0000000-0000-0000-0000-000000000033', 
     'Global Social Science Research Fund', 
     'Scholars affiliated with accredited higher-education institutions.', 
     '€50,000 – €120,000', NOW() + INTERVAL '35 days', ARRAY['Worldwide'], 
     ARRAY['Public Administration', 'Democratic Governance', 'Political Communications'], 
     'https://example.org/grants/apply', 'https://example.org/gssa/grants'),

    ('o0000000-0000-0000-0000-000000000034', 
     'Social Sciences Research Forum (SSRF)', 
     'Postgraduate researchers and PhD candidates within 3 years of dissertation defense.', 
     'Up to €2,500 per grantee', NOW() + INTERVAL '42 days', ARRAY['Global South', 'Emerging Scholars'], 
     ARRAY['Social Sciences', 'Interdisciplinary Studies'], 
     'https://example.org/ssrf/travel-grants', 'https://example.org/ssrf')
ON CONFLICT (content_id) DO NOTHING;

-- 9. SEED WORKSHOPS & WEBINARS
INSERT INTO public.content (id, title, slug, short_description, content_type, status, featured, category_id, organization_id, country, published_at)
VALUES
    ('w0000000-0000-0000-0000-000000000041', 
     'Advanced Methods Workshop: Causal Inference in Observational Policy Data', 
     'workshop-causal-inference-observational-policy-data', 
     'Intensive 2-day technical workshop covering difference-in-differences, regression discontinuity, and synthetic controls using R and Stata.',
     'WORKSHOP', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000006', 'o0000000-0000-0000-0000-000000000002', 'United Kingdom', NOW() - INTERVAL '4 days'),

    ('w0000000-0000-0000-0000-000000000042', 
     'Live Scholarly Webinar: Publishing in High-Impact Social Science Journals', 
     'webinar-publishing-high-impact-social-science-journals', 
     'Senior journal editors share actionable advice on manuscript structuring, handling revise-and-resubmits, and responding to reviewer comments.',
     'WEBINAR', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000001', 'o0000000-0000-0000-0000-000000000001', 'Switzerland', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.workshops (content_id, organizer, speaker, date, time, timezone, mode, registration_url, meeting_url)
VALUES
    ('w0000000-0000-0000-0000-000000000041', 
     'Institute for Policy & Governance', 
     'Dr. Marcus Sterling & Prof. Clara Lindqvist', 
     '2026-10-18', '09:00 - 16:30', 'GMT', 'ONLINE', 'https://example.org/workshops/causal-inference/register', 'https://zoom.us/j/example')
ON CONFLICT (content_id) DO NOTHING;

INSERT INTO public.webinars (content_id, organizer, speaker, date, time, timezone, registration_url, meeting_url)
VALUES
    ('w0000000-0000-0000-0000-000000000042', 
     'Social Sciences Research Forum (SSRF)', 
     'Prof. Elena Rostova & Dr. Amina Al-Mansoor', 
     '2026-10-02', '14:00 - 15:30', 'CET', 'https://example.org/webinars/ssrf-publishing/rsvp', 'https://zoom.us/j/example-ssrf')
ON CONFLICT (content_id) DO NOTHING;

-- 10. SEED ARTICLES & RESOURCES
INSERT INTO public.content (id, title, slug, short_description, content, content_type, status, featured, category_id, organization_id, published_at)
VALUES
    ('r0000000-0000-0000-0000-000000000051', 
     'Decentering the Core: Epistemic Justice and Methodological Reform in Social Inquiry', 
     'decentering-the-core-epistemic-justice', 
     'An in-depth scholarly essay investigating the structural imbalances of academic publishing, peer citation networks, and curriculum decolonization.',
     '<h2>Introduction</h2><p>The geography of scholarly knowledge production remains profoundly asymmetric. Despite decades of critical scholarship emphasizing epistemic pluralism, peer-reviewed recognition, editorial board appointments, and citation dynamics continue to center a narrow constellation of Northern institutions.</p><h3>Structural Disparities in Global Citation Networks</h3><p>Bibliometric audits across major political science and sociology databases demonstrate that scholarship originating outside the North Atlantic sphere is frequently consigned to "regional case study" status rather than foundational theory building.</p><blockquote>"Knowledge is neither neutral nor disembodied; the institutional architectures of scholarly validation determine what questions are deemed universally rigorous."</blockquote><h3>Reconstructing Academic Validation</h3><p>In response, modern scholar-led networks like the Social Sciences Research Forum (SSRF) champion transparent peer evaluation, linguistic accessibility, and open access dissemination.</p>',
     'ARTICLE', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000001', 'o0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '8 days'),

    ('r0000000-0000-0000-0000-000000000052', 
     'Academic Writing Guide: Structuring Rigorous Empirical Working Papers', 
     'academic-writing-guide-empirical-working-papers', 
     'A comprehensive reference manual detailing standard section anatomy, econometric notation standards, and reproducibility checklists.',
     'Complete academic guide for researchers drafting peer-review-ready working papers and symposium submissions.',
     'RESOURCE', 'PUBLISHED', true, 'c0000000-0000-0000-0000-000000000008', 'o0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '14 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.articles (content_id, excerpt, reading_time)
VALUES
    ('r0000000-0000-0000-0000-000000000051', 
     'Investigating the structural imbalances of academic publishing, citation dynamics, and how global networks can nurture genuine methodological reform.', 8)
ON CONFLICT (content_id) DO NOTHING;

INSERT INTO public.resources (content_id, resource_type, author_org, file_format, file_size)
VALUES
    ('r0000000-0000-0000-0000-000000000052', 
     'Methodology Guidebook', 'AcademIQ Editorial Committee & SSRF', 'PDF', '2.4 MB')
ON CONFLICT (content_id) DO NOTHING;

-- 11. CONTENT AUTHORS ASSOCIATIONS
INSERT INTO public.content_authors (content_id, author_id, author_order)
VALUES
    ('p0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 1),
    ('p0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 2),
    ('p0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 1),
    ('p0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 1),
    ('p0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', 1),
    ('r0000000-0000-0000-0000-000000000051', 'a0000000-0000-0000-0000-000000000001', 1)
ON CONFLICT DO NOTHING;

-- 12. CONTENT TAGS ASSOCIATIONS
INSERT INTO public.content_tags (content_id, tag_id)
VALUES
    ('p0000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001'),
    ('p0000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000002'),
    ('c0000000-0000-0000-0000-000000000011', 't0000000-0000-0000-0000-000000000002'),
    ('c0000000-0000-0000-0000-000000000013', 't0000000-0000-0000-0000-000000000005'),
    ('c0000000-0000-0000-0000-000000000024', 't0000000-0000-0000-0000-000000000005'),
    ('o0000000-0000-0000-0000-000000000034', 't0000000-0000-0000-0000-000000000005'),
    ('r0000000-0000-0000-0000-000000000051', 't0000000-0000-0000-0000-000000000005')
ON CONFLICT DO NOTHING;

-- 13. SEED AUDIT LOG INITIAL ENTRY
INSERT INTO public.audit_logs (action, entity_type, entity_id, details)
VALUES
    ('SYSTEM_INIT', 'SYSTEM', 'ROOT', '{"message": "AcademIQ platform database initialized with complete academic baseline taxonomy, research opportunities, and SSRF flagship initiatives."}'::jsonb);
