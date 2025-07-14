import { RoomTemplate } from "../types";

export const ROOM_TEMPLATES: RoomTemplate[] = [
  {
    id: "chai-podcast",
    name: "Chai Pe Charcha (Podcast Style)",
    slug: "chai-podcast",
    description:
      "Aapke virtual dost milke karenge chill aur deep podcast-style conversations.",
    topicPrompt: "Let's do a podcast on 'Indian Mythology x Modern Life'.",
    agents: [
      {
        id: "1",
        role: "Host",
        name: "Rahul",
        personality: "curious",
        metadata: {
          avatar: "🎙️",
          color: "#F59E0B",
          voice: "warm",
          tone: "conversational",
          toolsAllowed: ["clip-saver", "vibe-check"],
          initialThoughts:
            "Chalo doston, aaj ka topic thoda deep hai, but full vibe hone wali hai!",
        },
      },
      {
        id: "2",
        role: "Mythology Expert",
        name: "Vedika",
        personality: "wise",
        metadata: {
          avatar: "📜",
          color: "#10B981",
          voice: "calm",
          tone: "insightful",
          toolsAllowed: ["shlok-fetcher", "context-dropper"],
          initialThoughts: "Kya Ramayana ke principles aaj bhi relevant hain?",
        },
      },
      {
        id: "3",
        role: "Friend",
        name: "Kunal",
        personality: "funny",
        metadata: {
          avatar: "😎",
          color: "#6366F1",
          voice: "casual",
          tone: "playful",
          toolsAllowed: ["joke-generator"],
          initialThoughts: "Agar Krishna Tinder pe hote toh kya bio likhte? 😂",
        },
      },
    ],
    metadata: {
      tags: ["podcast", "friends", "casual"],
      difficulty: "beginner",
      useCases: ["fun", "content-creation"],
      createdBy: "system",
      icon: "🎧",
      themeColor: "#F59E0B",
      estimatedDuration: "15-20 mins",
      language: "HINGLISH",
    },
    behavior: {
      isTurnBased: false,
      allowUserInterrupt: true,
      stopConditions: [{ type: "MAX_TURNS", value: 20 }],
      allowAgentMemory: true,
    },
    outputs: {
      generateSummary: true,
      exportFormats: ["markdown", "pdf"],
    },
    version: 1,
    createdAt: "2025-06-21T10:00:00Z",
    updatedAt: "2025-06-21T10:00:00Z",
  },
  {
    id: "roast-room",
    name: "The Roast Pit 🔥",
    slug: "roast-room",
    description: "Sab ek dusre ki kheechai karne wale hain... but with love 😆",
    topicPrompt: "Roast Rahul’s coding habits like it’s the last commit!",
    agents: [
      {
        id: "1",
        role: "Designer",
        name: "Isha",
        personality: "savage",
        metadata: {
          avatar: "🎨",
          color: "#EC4899",
          voice: "sarcastic",
          tone: "spicy",
          toolsAllowed: ["insult-builder"],
          initialThoughts:
            "Bro still uses lorem ipsum and calls it 'UI ready' 😂",
        },
      },
      {
        id: "2",
        role: "PM",
        name: "Manav",
        personality: "annoyed",
        metadata: {
          avatar: "📋",
          color: "#3B82F6",
          voice: "mocking",
          tone: "teasing",
          toolsAllowed: ["jira-flinger"],
          initialThoughts:
            "Deadline pe kabhi nahi code karta, par memes toh time pe bhejta hai.",
        },
      },
      {
        id: "3",
        role: "Dev Bestie",
        name: "Tanya",
        personality: "chaotic",
        metadata: {
          avatar: "👩‍💻",
          color: "#F472B6",
          voice: "meme-y",
          tone: "playful",
          toolsAllowed: ["roast-reloader"],
          initialThoughts:
            "His code is like Golgappa — looks tasty, but you regret it later.",
        },
      },
    ],
    metadata: {
      tags: ["fun", "comedy", "team"],
      difficulty: "beginner",
      useCases: ["team-building", "ice-breakers"],
      createdBy: "system",
      icon: "🔥",
      themeColor: "#EC4899",
      estimatedDuration: "10-15 mins",
      language: "HINGLISH",
    },
    behavior: {
      isTurnBased: true,
      allowUserInterrupt: false,
      stopConditions: [{ type: "MAX_TURNS", value: 20 }],
      allowAgentMemory: false,
    },
    outputs: {
      generateSummary: true,
      exportFormats: ["pdf"],
    },
    version: 1,
    createdAt: "2025-06-21T10:00:00Z",
    updatedAt: "2025-06-21T10:00:00Z",
  },
];
