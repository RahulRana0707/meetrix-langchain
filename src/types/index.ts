export enum ROOM_LANGUAGE {
  ENGLISH = "ENGLISH",
  SPANISH = "SPANISH",
  HINGLISH = "HINGLISH",
}

export enum STOP_CONDITION_TYPE {
  AGENT_CONSENSUS = "AGENT_CONSENSUS",
  MAX_TURNS = "MAX_TURNS",
  TIME_LIMIT = "TIME_LIMIT",
}

export type TStopConditionType = keyof typeof STOP_CONDITION_TYPE;

export type AgentMetadata = {
  avatar?: string;
  color: string;
  voice?: string;
  tone?: string;
  toolsAllowed?: string[];
  initialThoughts?: string;
};

export type TAgent = {
  id: string;
  role: string;
  name: string;
  personality: string;
  metadata: AgentMetadata;
};

export type RoomMetadata = {
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  useCases: string[];
  createdBy: "system" | "user";
  icon?: string;
  themeColor?: string;
  estimatedDuration?: string;
  language?: keyof typeof ROOM_LANGUAGE;
};

export type StopCondition =
  | { type: TStopConditionType; value?: any }
  | { type: TStopConditionType; value: number }
  | { type: TStopConditionType; value: number };

export type RoomBehavior = {
  isTurnBased: boolean;
  allowUserInterrupt: boolean;
  stopConditions: StopCondition[];
  allowAgentMemory: boolean;
};

export type RoomOutputs = {
  generateSummary: boolean;
  exportFormats: ("pdf" | "markdown")[];
};

export type RoomTemplate = {
  id: string;
  name: string;
  slug: string;
  description: string;
  topicPrompt: string;
  agents: TAgent[];
  metadata: RoomMetadata;
  behavior: RoomBehavior;
  outputs: RoomOutputs;
  version: number;
  createdAt: string;
  updatedAt: string;
};

export type RoomTemplateForAgent = Omit<
  Omit<Omit<Omit<RoomTemplate, "createdAt">, "updatedAt">, "version">,
  "slug"
>;
