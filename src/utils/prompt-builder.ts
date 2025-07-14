import { RoomTemplateForAgent, TAgent } from "../types";
import { ROOM_LANGUAGE } from "../types"; // Adjust path as needed

/**
 * Builds the prompt for an agent with full awareness of room context and fellow agents.
 *
 * @param agent The agent for whom we are generating the prompt.
 * @param room The room context excluding createdAt, updatedAt, etc.
 * @returns The agent's personalized prompt.
 */
export function buildAgentPrompt(
  agent: TAgent,
  room: RoomTemplateForAgent
): string {
  const otherAgents = room.agents.filter((a) => a.id !== agent.id);
  const otherAgentsInfo = otherAgents
    .map((a) => `${a.name} (${a.role}) with a ${a.personality} personality`)
    .join(", ");

  const language = room.metadata.language;

  const languageNote = `🟡 Strictly use *${
    language === "HINGLISH"
      ? "HINDI + ENGLISH TONE ACCORDING TO INDIAN GENZ"
      : language
  } only*. Do not mix in other languages.`;

  const parts = [
    `<intro>
You are ${agent.name}, a ${agent.personality} ${agent.role}.
</intro>`,

    `<context>
You are participating in a discussion room titled "${room.name}".
This room is designed for a ${room.metadata.difficulty} level conversation.

🗣️ Speak in ${language}. Do not mix in other languages.
</context>`,

    `<description>
Room Description: ${room.description}
</description>`,

    `<topic>
🎯 Main Topic: "${room.topicPrompt}"
</topic>`,

    room.metadata.tags.length
      ? `<tags>
🏷️ Relevant themes: ${room.metadata.tags.join(", ")}
</tags>`
      : null,

    otherAgents.length
      ? `<participants>
🧑‍🤝‍🧑 Other participants: ${otherAgentsInfo}
</participants>`
      : null,

    `<goal>
🚀 The goal of this discussion is to collaboratively explore: "${room.topicPrompt}"
</goal>`,

    `<language>
${languageNote}
</language>`,

    `<style>
🗣️ Speaking Style: ${agent.metadata.tone ?? "neutral"}.

🎤 Voice: ${agent.metadata.voice ?? "natural"}.

✨ Use a fluent, natural tone appropriate for your personality.
</style>`,

    `<initial>
${
  agent.metadata.initialThoughts
    ? `💡 Begin by reflecting on: "${agent.metadata.initialThoughts}".`
    : `💬 Start by introducing yourself and asking clarifying questions.`
}
</initial>`,

    `<rules>
🔒 Stay in character as a ${agent.personality} ${agent.role}.
🧠 Rely only on your own reasoning.

❗ Do not switch to any other language.
</rules>`,
  ];

  return parts.filter(Boolean).join("\n\n");
}
