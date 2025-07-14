import type { AgentMetadata, RoomTemplateForAgent, TAgent } from "../types";
import { buildAgentPrompt } from "../utils/prompt-builder";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { AIMessageChunk } from "@langchain/core/messages";

interface IAgent {
  speak(history: ChatMessageHistory): Promise<{
    messages: AIMessageChunk;
  }>;
}

export class Agent implements IAgent {
  _agentId: string;
  _agentName: string;
  _agentRole: string;
  private _agentPersonality: string;
  private _agentMetadata: AgentMetadata;
  private _agentPrompt: string;
  private _modelInstance: ChatGoogleGenerativeAI;

  constructor(agentDetails: TAgent, roomDetails: RoomTemplateForAgent) {
    this._agentId = agentDetails.id;
    this._agentName = agentDetails.name;
    this._agentRole = agentDetails.role;
    this._agentPersonality = agentDetails.personality;
    this._agentMetadata = agentDetails.metadata;
    this._agentPrompt = buildAgentPrompt(agentDetails, roomDetails);
    this._modelInstance = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      temperature: 0,
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    });
  }

  async speak(
    history: ChatMessageHistory
  ): Promise<{ messages: AIMessageChunk }> {
    const pastMessages = await history.getMessages();
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", this._agentPrompt],
      new MessagesPlaceholder("messages"),
      ["human", "Now, respond with your thoughts appropriately."],
    ]);
    const chain = prompt.pipe(this._modelInstance);
    const response = await chain.invoke({
      messages: pastMessages,
    });
    console.log(`${this._agentName}: ${response.content}`);
    return { messages: response };
  }
}
