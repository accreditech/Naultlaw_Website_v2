export type TestimonialSource = "Google" | "Yelp";

export type HomepageTestimonial = {
  /** Display name. Use first name + last initial for privacy. */
  name: string;
  /** Optional context shown below the name (job title, business). */
  context?: string;
  /** City / region. */
  location?: string;
  source: TestimonialSource;
  dateLabel: string;
  /** ISO date for JSON-LD `datePublished`. */
  isoDate: string;
  /** 1–5. Currently every review is 5; kept for schema correctness. */
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /**
   * Filename inside `/public/reviews/`. Optional — when missing, the card
   * falls back to an initial-circle avatar so the layout doesn't break.
   * Keep filenames lowercase + hyphenated to match the route.
   */
  photoFilename?: string;
};

// Order is intentional: Google reviews mentioning real estate, contracts,
// small business, and dispute work appear first. Generic Yelp reviews follow.
export const homepageTestimonials: readonly HomepageTestimonial[] = [
  {
    name: "Kalyn K.",
    context: "Owner, Keen School of Music",
    location: "Gallatin, TN",
    source: "Google",
    dateLabel: "April 2026",
    isoDate: "2026-04-01",
    rating: 5,
    photoFilename: "kalyn-k.jpg",
    quote:
      "My husband and I worked with Stephen when we bought our first commercial property. He was incredibly helpful and responsive. Anytime we had questions, he gave us clear and honest answers. He's just a great guy to work with — super down to earth and very honest with you. Buying property is always incredibly stressful, and he was able to alleviate so much of that stress. I highly recommend Stephen for any of your legal needs!",
  },
  {
    name: "Jacob Y.",
    location: "Hendersonville, TN",
    source: "Google",
    dateLabel: "April 2026",
    isoDate: "2026-04-01",
    rating: 5,
    photoFilename: "jacob-y.jpg",
    quote:
      "A year ago I found myself on the receiving end of a frivolous lawsuit over a home I had previously owned. I called 5 other lawyers in Sumner County and all of them suggested I settle or that I might have guilt when I did not. I then found Stephen and after one meeting he assured me I had nothing to worry about. 3 weeks later, it was over. We never even had to step foot in a court room. I couldn't be more thankful for his services. If you need a good lawyer Stephen C. Nault is your guy!!!!",
  },
  {
    name: "Dahl Concrete and Epoxy",
    location: "Castalian Springs, TN",
    source: "Google",
    dateLabel: "April 2026",
    isoDate: "2026-04-01",
    rating: 5,
    photoFilename: "dahl-concrete.jpg",
    quote:
      "Steve has been my go-to attorney for the last 6 years. From land acquisition deals to construction contracts and negotiations he's always been highly engaged and knowledgeable. We greatly appreciate and value his insights and services.",
  },
  {
    name: "Adam M.",
    context: "Owner, Knockout Pressure Washing",
    location: "Mount Juliet, TN",
    source: "Google",
    dateLabel: "April 2026",
    isoDate: "2026-04-01",
    rating: 5,
    photoFilename: "adam-m.jpg",
    quote:
      "I reached out for help creating contracts for my business, and I'm really glad I did. They were extremely knowledgeable and made the whole process easy to understand, which was huge for me. They took the time to customize everything to fit my business instead of just using a one-size-fits-all approach. I felt confident knowing everything was set up the right way. Super helpful, professional, and easy to work with. Definitely recommend if you need solid legal help for your business.",
  },
  {
    name: "Kyle F.",
    location: "Gallatin, TN",
    source: "Google",
    dateLabel: "April 2026",
    isoDate: "2026-04-01",
    rating: 5,
    quote:
      "Stephen Nault handled everything from start to finish. Going beyond expectations, he suggested alterations to the agreement that benefitted both parties and moved the process forward expeditiously. Greatly appreciate his insight and professionalism during the whole process, highly recommend.",
  },
  {
    name: "Steven C.",
    context: "Owner, Giving Guitars",
    source: "Google",
    dateLabel: "April 2026",
    isoDate: "2026-04-01",
    rating: 5,
    photoFilename: "steven-c.jpg",
    quote:
      "I had the opportunity to consult with Stephen Nault and was seriously impressed. The level of clarity, precision, and depth of understanding he brought to the conversation was on another level. He was able to break down complex issues quickly, identify the core risks and opportunities, and provide guidance that was both strategic and immediately actionable. What stood out most was how efficiently he navigated the situation. No wasted time, no vague answers — just sharp, confident insight backed by real expertise. If you are looking for an attorney who brings elite-level thinking, communicates with authority, and delivers real value in a short amount of time, Stephen Nault is someone you want in your corner.",
  },
  {
    name: "Bonnie J.",
    source: "Yelp",
    dateLabel: "April 1, 2026",
    isoDate: "2026-04-01",
    rating: 5,
    quote:
      "I received a recommendation from another law firm that didn't have capacity to help with our issue. Stephen Nault was extremely prompt in replying to us. He clearly explained options and took care of the necessary measures to settle our concerns. His fee was very reasonable, and was the only bright spot of the whole situation. Thank you Mr Nault.",
  },
  {
    name: "Morgan S.",
    source: "Yelp",
    dateLabel: "March 3, 2026",
    isoDate: "2026-03-03",
    rating: 5,
    quote:
      "Stephen Nault is an outstanding attorney and someone I would highly recommend. He is professional, knowledgeable, and extremely thorough in how he handles legal matters. Communication was always clear and timely, and he made sure everything was handled the right way from start to finish.",
  },
  {
    name: "Sheri C.",
    source: "Yelp",
    dateLabel: "October 10, 2025",
    isoDate: "2025-10-10",
    rating: 5,
    quote:
      "I had a great experience working with Mr Nault. He is smart, knowledgeable, and professional. From start to finish, I felt confident that I was in good hands. He took the time to clearly explain everything, answered all of my questions, and handled each step with care and attention to detail. I truly appreciated his expertise and the sense of trust he built throughout the process. I highly recommend Mr Nault to anyone looking for someone who genuinely knows their work and takes pride in doing it well.",
  },
  {
    name: "Pamela T.",
    source: "Yelp",
    dateLabel: "June 5, 2025",
    isoDate: "2025-06-05",
    rating: 5,
    quote:
      "Mr. Nault was excellent representation in resolving a matter for me. He did all I requested of him in a professional manner, and answered all questions throughout the process in a polite and helpful way. I would 110% use Mr. Nault in the future if needed.",
  },
  {
    name: "Jaimie L.",
    source: "Yelp",
    dateLabel: "June 4, 2025",
    isoDate: "2025-06-04",
    rating: 5,
    quote:
      "We had an incredible experience with Mr. Nault. He was fully transparent and great at communicating with us. Very trustworthy and will most definitely be using him in the future!",
  },
  {
    name: "R. G.",
    source: "Yelp",
    dateLabel: "September 12, 2024",
    isoDate: "2024-09-12",
    rating: 5,
    quote:
      "He was incredibly well informed, tactfully smart, and gives absolute attention to your case. I can't say enough about him.",
  },
] as const;
