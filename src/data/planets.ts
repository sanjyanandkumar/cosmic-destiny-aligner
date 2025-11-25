export type ProblemCategory = "family" | "relationship" | "financial";

export interface Planet {
  id: string;
  name: string;
  sanskritName: string;
  color: string;
  problems: {
    family: string[];
    relationship: string[];
    financial: string[];
  };
  solutions: {
    family: string[];
    relationship: string[];
    financial: string[];
  };
  position: { x: number; y: number };
}

export const planets: Planet[] = [
  {
    id: "sun",
    name: "Sun",
    sanskritName: "Surya",
    color: "from-orange-500 to-yellow-500",
    problems: {
      family: [
        "Father-son relationship conflicts",
        "Lack of respect in family",
        "Authority issues with elders",
        "Family pride and ego clashes"
      ],
      relationship: [
        "Ego clashes with partner",
        "Dominance issues in relationships",
        "Lack of recognition from partner",
        "Pride affecting intimacy"
      ],
      financial: [
        "Instability in government jobs",
        "Issues with authority figures affecting income",
        "Delayed recognition leading to financial loss",
        "Problems with father affecting finances"
      ]
    },
    solutions: {
      family: [
        "Offer water to Sun at sunrise",
        "Respect father and elders",
        "Practice humility",
        "Wear ruby gemstone (after consultation)"
      ],
      relationship: [
        "Practice ego surrender in relationships",
        "Offer water to Sun together",
        "Work on self-confidence without arrogance",
        "Honor partner's achievements"
      ],
      financial: [
        "Donate wheat on Sundays",
        "Maintain good relations with authority figures",
        "Start new ventures on Sundays",
        "Wear copper ring"
      ]
    },
    position: { x: 0, y: -180 }
  },
  {
    id: "moon",
    name: "Moon",
    sanskritName: "Chandra",
    color: "from-slate-300 to-blue-200",
    problems: {
      family: [
        "Mother-child relationship issues",
        "Emotional instability in family",
        "Mental stress affecting family peace",
        "Lack of nurturing environment"
      ],
      relationship: [
        "Emotional dependency on partner",
        "Mood swings affecting relationship",
        "Insecurity and trust issues",
        "Over-attachment causing problems"
      ],
      financial: [
        "Fluctuating income",
        "Emotional spending habits",
        "Business instability",
        "Mother's health affecting finances"
      ]
    },
    solutions: {
      family: [
        "Chant Moon mantras on Mondays",
        "Strengthen mother's bond",
        "Practice meditation for emotional balance",
        "Wear pearl (after consultation)"
      ],
      relationship: [
        "Work on emotional stability",
        "Practice mindfulness in relationships",
        "Avoid making decisions during emotional highs/lows",
        "Drink water from silver vessel"
      ],
      financial: [
        "Donate milk on Mondays",
        "Avoid speculation and gambling",
        "Keep emergency funds",
        "Work in fields related to liquids or public"
      ]
    },
    position: { x: 127, y: -127 }
  },
  {
    id: "mars",
    name: "Mars",
    sanskritName: "Mangal",
    color: "from-red-600 to-orange-600",
    problems: {
      family: [
        "Sibling rivalry and conflicts",
        "Anger issues disrupting family",
        "Property disputes",
        "Aggressive behavior towards family"
      ],
      relationship: [
        "Frequent arguments with partner",
        "Impulsive decisions affecting relationship",
        "Mangal Dosha marriage delays",
        "Physical or verbal aggression"
      ],
      financial: [
        "Impulsive financial decisions",
        "Losses through accidents or disputes",
        "Property-related financial issues",
        "Sudden expenses on health"
      ]
    },
    solutions: {
      family: [
        "Worship Lord Hanuman on Tuesdays",
        "Practice patience and anger management",
        "Donate red lentils",
        "Wear red coral (after consultation)"
      ],
      relationship: [
        "Practice anger management techniques",
        "Perform Mangal Dosha remedies if applicable",
        "Visit Hanuman temple together",
        "Avoid heated arguments, take cooling-off periods"
      ],
      financial: [
        "Avoid impulsive investments",
        "Donate blood or organize blood donation camps",
        "Keep property documents secure",
        "Recite Hanuman Chalisa daily"
      ]
    },
    position: { x: 180, y: 0 }
  },
  {
    id: "mercury",
    name: "Mercury",
    sanskritName: "Budh",
    color: "from-green-500 to-emerald-500",
    problems: {
      family: [
        "Communication gaps in family",
        "Misunderstandings between members",
        "Educational issues affecting children",
        "Business disputes within family"
      ],
      relationship: [
        "Miscommunication with partner",
        "Lack of intellectual connection",
        "Different communication styles",
        "Dishonesty or hidden information"
      ],
      financial: [
        "Business communication failures",
        "Investment fraud or deception",
        "Problems in contracts or paperwork",
        "Intellectual property disputes"
      ]
    },
    solutions: {
      family: [
        "Feed green vegetables to cows on Wednesdays",
        "Improve communication skills",
        "Chant Mercury mantras",
        "Wear emerald (after consultation)"
      ],
      relationship: [
        "Practice active listening",
        "Engage in intellectual activities together",
        "Be honest and transparent",
        "Donate green items on Wednesdays"
      ],
      financial: [
        "Review all contracts carefully",
        "Maintain clear financial records",
        "Seek professional advice for investments",
        "Worship Lord Vishnu on Wednesdays"
      ]
    },
    position: { x: 127, y: 127 }
  },
  {
    id: "jupiter",
    name: "Jupiter",
    sanskritName: "Guru",
    color: "from-yellow-500 to-amber-500",
    problems: {
      family: [
        "Lack of wisdom and guidance",
        "Financial instability in family",
        "Children's character development issues",
        "Loss of family values and traditions"
      ],
      relationship: [
        "Lack of growth in relationship",
        "Different belief systems causing conflicts",
        "Partner's family disapproval",
        "Marriage delays or obstacles"
      ],
      financial: [
        "Delayed financial growth",
        "Poor investment decisions",
        "Lack of savings",
        "Problems in higher education affecting career"
      ]
    },
    solutions: {
      family: [
        "Worship on Thursdays",
        "Respect teachers and gurus",
        "Donate yellow items",
        "Wear yellow sapphire (after consultation)"
      ],
      relationship: [
        "Seek blessings from elders",
        "Practice spiritual growth together",
        "Respect each other's beliefs",
        "Donate to educational institutions"
      ],
      financial: [
        "Consult financial advisors",
        "Invest in education and knowledge",
        "Donate turmeric and yellow clothes",
        "Worship Lord Brihaspati on Thursdays"
      ]
    },
    position: { x: 0, y: 180 }
  },
  {
    id: "venus",
    name: "Venus",
    sanskritName: "Shukra",
    color: "from-pink-500 to-rose-500",
    problems: {
      family: [
        "Marital discord and relationship issues",
        "Lack of love and harmony",
        "Luxury and comfort disputes",
        "In-law relationship problems"
      ],
      relationship: [
        "Lack of romance and affection",
        "Infidelity or attraction to others",
        "Material expectations causing stress",
        "Physical intimacy issues"
      ],
      financial: [
        "Overspending on luxuries",
        "Financial instability affecting lifestyle",
        "Problems in creative ventures",
        "Losses through women or partnerships"
      ]
    },
    solutions: {
      family: [
        "Worship Goddess Lakshmi on Fridays",
        "Maintain harmony in relationships",
        "Donate white items",
        "Wear diamond (after consultation)"
      ],
      relationship: [
        "Keep romance alive with gestures",
        "Practice loyalty and commitment",
        "Balance material and emotional needs",
        "Donate white flowers on Fridays"
      ],
      financial: [
        "Create and stick to a budget",
        "Avoid unnecessary luxuries",
        "Invest in artistic ventures wisely",
        "Offer white sweets to Goddess Lakshmi"
      ]
    },
    position: { x: -127, y: 127 }
  },
  {
    id: "saturn",
    name: "Saturn",
    sanskritName: "Shani",
    color: "from-slate-700 to-gray-900",
    problems: {
      family: [
        "Chronic family problems and delays",
        "Elderly care issues",
        "Long-term separations",
        "Depression affecting family members"
      ],
      relationship: [
        "Delays in finding right partner",
        "Age gap causing issues",
        "Pessimism affecting relationship",
        "Long-distance relationship challenges"
      ],
      financial: [
        "Chronic financial struggles",
        "Delayed payments and recognition",
        "Heavy responsibilities draining resources",
        "Losses through servants or labor"
      ]
    },
    solutions: {
      family: [
        "Worship Lord Shani on Saturdays",
        "Serve the elderly and underprivileged",
        "Practice patience and discipline",
        "Wear blue sapphire (after consultation)"
      ],
      relationship: [
        "Practice patience and commitment",
        "Don't rush into relationships",
        "Feed crows on Saturdays",
        "Build relationship on strong foundation"
      ],
      financial: [
        "Practice discipline in expenses",
        "Build long-term savings",
        "Donate to laborers and servants",
        "Light mustard oil lamp under peepal tree on Saturdays"
      ]
    },
    position: { x: -180, y: 0 }
  },
  {
    id: "rahu",
    name: "Rahu",
    sanskritName: "Rahu",
    color: "from-indigo-700 to-purple-900",
    problems: {
      family: [
        "Unexpected family crises",
        "Addiction issues in family",
        "Foreign separations",
        "Unconventional family problems"
      ],
      relationship: [
        "Unconventional relationships",
        "Obsession or addiction to partner",
        "Deception or illusions in love",
        "Foreign partner causing family issues"
      ],
      financial: [
        "Sudden financial losses",
        "Fraud or scams",
        "Get-rich-quick schemes failing",
        "Problems through foreign investments"
      ]
    },
    solutions: {
      family: [
        "Chant Rahu mantras",
        "Donate to the needy on Saturdays",
        "Keep black dog as pet",
        "Wear hessonite (after consultation)"
      ],
      relationship: [
        "Be grounded and realistic",
        "Avoid obsessive behavior",
        "Check partner's background carefully",
        "Donate to mental health organizations"
      ],
      financial: [
        "Avoid speculation and shortcuts",
        "Research thoroughly before investing",
        "Donate blankets on Saturdays",
        "Worship Goddess Durga"
      ]
    },
    position: { x: -127, y: -127 }
  },
  {
    id: "ketu",
    name: "Ketu",
    sanskritName: "Ketu",
    color: "from-gray-600 to-slate-800",
    problems: {
      family: [
        "Spiritual disconnection in family",
        "Ancestral karma affecting family",
        "Mysterious health issues",
        "Detachment causing family distance"
      ],
      relationship: [
        "Emotional detachment from partner",
        "Past life karma affecting relationship",
        "Lack of interest in physical intimacy",
        "Sudden separations without reason"
      ],
      financial: [
        "Unexpected financial losses",
        "Mysterious money disappearance",
        "Lack of interest in material wealth",
        "Ancestral property disputes"
      ]
    },
    solutions: {
      family: [
        "Worship Lord Ganesha",
        "Perform ancestral rituals",
        "Donate blankets to the poor",
        "Wear cat's eye (after consultation)"
      ],
      relationship: [
        "Practice emotional presence",
        "Perform past life healing",
        "Feed stray dogs regularly",
        "Seek spiritual counseling together"
      ],
      financial: [
        "Perform Pitra Dosha remedies",
        "Donate multicolored blankets",
        "Clear ancestral property issues",
        "Recite Ganesha mantras for wealth"
      ]
    },
    position: { x: -90, y: -156 }
  }
];
