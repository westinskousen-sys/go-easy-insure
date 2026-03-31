
CREATE TABLE public.content_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  body TEXT,
  content_type TEXT NOT NULL DEFAULT 'article' CHECK (content_type IN ('article', 'podcast', 'video')),
  cover_image_url TEXT,
  media_url TEXT,
  author TEXT NOT NULL DEFAULT 'Sol Insurance Team',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.content_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Anyone can read published posts"
ON public.content_posts
FOR SELECT
USING (published = true);

-- Insert sample content
INSERT INTO public.content_posts (title, slug, excerpt, body, content_type, author, tags, published, published_at, cover_image_url) VALUES
(
  'Understanding Auto Insurance: What Every Driver Needs to Know',
  'understanding-auto-insurance',
  'A comprehensive guide to auto insurance coverage types, deductibles, and how to choose the right policy for your needs.',
  E'## What Is Auto Insurance?\n\nAuto insurance is a contract between you and an insurance company that protects you financially if you''re in an accident or your car is damaged. In exchange for paying a premium, the insurance company agrees to pay your losses as outlined in your policy.\n\n## Types of Coverage\n\n### Liability Coverage\nThis is the most basic type of auto insurance and is required by law in most states. It covers damage you cause to other people and their property.\n\n### Collision Coverage\nThis pays for damage to your car from a collision, regardless of who is at fault.\n\n### Comprehensive Coverage\nThis covers damage to your car from events other than collisions — like theft, vandalism, natural disasters, or hitting an animal.\n\n## How to Choose the Right Policy\n\n1. **Assess your needs** — Consider the value of your car, your driving habits, and your financial situation.\n2. **Compare quotes** — Get quotes from multiple insurers to find the best rate.\n3. **Understand your deductible** — A higher deductible means lower premiums, but more out-of-pocket costs if you file a claim.\n4. **Bundle policies** — Many insurers offer discounts if you bundle auto with home or renters insurance.\n\n## Common Mistakes to Avoid\n\n- Choosing the minimum coverage just to save money\n- Not reviewing your policy annually\n- Failing to report changes like a new address or additional drivers\n\nAt Sol Insurance, we help you navigate these decisions with personalized guidance.',
  'article',
  'Sarah Chen, Insurance Advisor',
  ARRAY['auto insurance', 'coverage', 'tips'],
  true,
  now() - interval '3 days',
  NULL
),
(
  'Home Insurance 101: Protecting Your Most Valuable Asset',
  'home-insurance-101',
  'Learn the essentials of homeowners insurance — what it covers, what it doesn''t, and how to make sure you''re adequately protected.',
  E'## Why Home Insurance Matters\n\nYour home is likely the most valuable asset you own. Homeowners insurance protects you from financial loss due to damage, theft, or liability.\n\n## What Does Home Insurance Cover?\n\n### Dwelling Coverage\nPays to repair or rebuild your home if it''s damaged by a covered peril like fire, wind, or hail.\n\n### Personal Property Coverage\nCovers your belongings — furniture, electronics, clothing — if they''re stolen or destroyed.\n\n### Liability Protection\nProtects you if someone is injured on your property and sues you.\n\n### Additional Living Expenses\nIf your home is uninhabitable after a covered event, this pays for temporary housing and living costs.\n\n## What''s Typically NOT Covered\n\n- **Floods** — Requires a separate flood insurance policy\n- **Earthquakes** — Needs additional earthquake coverage\n- **Maintenance issues** — Normal wear and tear isn''t covered\n- **Expensive valuables** — Jewelry and art may need scheduled coverage\n\n## Tips for Getting the Best Rate\n\n1. Install security systems and smoke detectors\n2. Raise your deductible to lower premiums\n3. Bundle with auto insurance for discounts\n4. Review and update your coverage annually\n\nLet Sol Insurance help you find the perfect balance of coverage and affordability.',
  'article',
  'Marcus Johnson, Home Insurance Specialist',
  ARRAY['home insurance', 'homeowners', 'property'],
  true,
  now() - interval '7 days',
  NULL
),
(
  '5 Ways to Lower Your Insurance Premiums Without Sacrificing Coverage',
  'lower-insurance-premiums',
  'Practical strategies to reduce your insurance costs while maintaining the protection you need.',
  E'## Smart Ways to Save on Insurance\n\nInsurance is essential, but that doesn''t mean you have to overpay. Here are five proven strategies to lower your premiums.\n\n### 1. Bundle Your Policies\nMost insurance companies offer multi-policy discounts of 10-25% when you bundle auto, home, and other policies together.\n\n### 2. Increase Your Deductible\nRaising your deductible from $500 to $1,000 can reduce your premium by 15-30%. Just make sure you can afford the higher out-of-pocket cost.\n\n### 3. Maintain Good Credit\nIn most states, insurers use credit-based insurance scores. Paying bills on time and keeping credit utilization low can lead to lower premiums.\n\n### 4. Ask About Discounts\nMany discounts go unclaimed simply because policyholders don''t ask:\n- Safe driver discounts\n- Good student discounts\n- Military/veteran discounts\n- Professional association discounts\n- Paperless billing discounts\n\n### 5. Review Your Coverage Annually\nYour insurance needs change over time. An annual review ensures you''re not paying for coverage you no longer need.\n\n## The Bottom Line\n\nSaving on insurance doesn''t mean cutting corners. It means being strategic about your coverage choices. Sol Insurance advisors can help you find every available discount.',
  'article',
  'Sol Insurance Team',
  ARRAY['savings', 'premiums', 'tips', 'discounts'],
  true,
  now() - interval '1 day',
  NULL
),
(
  'Insurance Explained: Podcast Episode 1 — Debunking Common Myths',
  'podcast-debunking-insurance-myths',
  'In our first podcast episode, we tackle the most common insurance myths and explain what you really need to know.',
  E'## Episode Summary\n\nIn this inaugural episode of Insurance Explained, our hosts break down the most persistent myths about insurance and reveal the truth behind them.\n\n### Myths We Cover:\n\n1. **"Red cars cost more to insure"** — FALSE. Car color has zero impact on your premium.\n2. **"Full coverage means everything is covered"** — FALSE. There''s no such thing as truly full coverage.\n3. **"My rates will always go up after an accident"** — NOT ALWAYS. Many insurers offer accident forgiveness.\n4. **"I don''t need insurance if I rent"** — FALSE. Renters insurance is affordable and essential.\n5. **"Minimum coverage is enough"** — RISKY. Minimum limits rarely cover a serious accident.\n\n### Key Takeaways\n\n- Always read your policy documents carefully\n- Ask your agent questions — there are no dumb questions\n- Review your coverage at least once a year\n\nListen to the full episode and subscribe for more insurance insights.',
  'podcast',
  'Sol Insurance Team',
  ARRAY['podcast', 'myths', 'education'],
  true,
  now() - interval '5 days',
  NULL
),
(
  'How to File an Insurance Claim: Step-by-Step Video Guide',
  'video-filing-insurance-claim',
  'Watch our step-by-step video guide on how to file an insurance claim quickly and effectively.',
  E'## Video Overview\n\nFiling an insurance claim can feel overwhelming, especially during a stressful time. This video walks you through the entire process step by step.\n\n### What You''ll Learn:\n\n1. **Document everything** — Take photos, gather witness information, and file a police report if applicable.\n2. **Contact your insurer promptly** — Most policies require timely reporting of incidents.\n3. **Understand your coverage** — Know what your policy covers before filing.\n4. **Work with your adjuster** — Tips for a smooth claims process.\n5. **Follow up** — How to track your claim and escalate if needed.\n\n### Pro Tips:\n\n- Keep a home inventory with photos and receipts\n- Save your agent''s contact information in your phone\n- Don''t admit fault at the scene of an accident\n- Keep all communication records with your insurer\n\nWatch the full video above for a complete walkthrough.',
  'video',
  'Sol Insurance Team',
  ARRAY['video', 'claims', 'how-to'],
  true,
  now() - interval '10 days',
  NULL
);
