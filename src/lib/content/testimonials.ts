export type HomepageTestimonial = {
  name: string;
  source: "Yelp";
  dateLabel: string;
  quote: string;
};

export const homepageTestimonials: readonly HomepageTestimonial[] = [
  {
    name: "Bonnie J.",
    source: "Yelp",
    dateLabel: "April 1, 2026",
    quote:
      "I received a recommendation from another law firm that didn't have capacity to help with our issue. Stephen Nault was extremely prompt in replying to us. He clearly explained options and took care of the necessary measures to settle our concerns. His fee was very reasonable, and was the only bright spot of the whole situation. Thank you Mr Nault.",
  },
  {
    name: "Morgan S.",
    source: "Yelp",
    dateLabel: "March 3, 2026",
    quote:
      "Stephen Nault is an outstanding attorney and someone I would highly recommend. He is professional, knowledgeable, and extremely thorough in how he handles legal matters. Communication was always clear and timely, and he made sure everything was handled the right way from start to finish...",
  },
  {
    name: "Sheri C.",
    source: "Yelp",
    dateLabel: "October 10, 2025",
    quote:
      "I had a great experience working with Mr Nault. He is smart, knowledgeable, and professional. From start to finish, I felt confident that I was in good hands. He took the time to clearly explain everything, answered all of my questions, and handled each step with care and attention to detail. I truly appreciated his expertise and the sense of trust he built throughout the process. I highly recommend Mr Nault to anyone looking for someone who genuinely knows their work and takes pride in doing it well.",
  },
  {
    name: "Pamela T.",
    source: "Yelp",
    dateLabel: "June 5, 2025",
    quote:
      "Mr. Nault was excellent representation in resolving a matter for me. He did all I requested of him in a professional manner, and answered all questions throughout the process in a polite and helpful way. I would 110% use Mr. Nault in the future if needed.",
  },
  {
    name: "Jaimie L.",
    source: "Yelp",
    dateLabel: "June 4, 2025",
    quote:
      "We had an incredible experience with Mr. Nault. He was fully transparent and great at communicating with us. Very trustworthy and will most definitely be using him in the future!",
  },
  {
    name: "R. G.",
    source: "Yelp",
    dateLabel: "September 12, 2024",
    quote:
      "He was incredibly well informed, tactfully smart, and gives absolute attention to your case. I can't say enough about him.",
  },
] as const;
