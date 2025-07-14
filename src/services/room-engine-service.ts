import {
  type TAgent,
  type RoomBehavior,
  type RoomMetadata,
  type RoomOutputs,
  type RoomTemplate,
  STOP_CONDITION_TYPE,
} from "../types";
import { Agent } from "./agent";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

interface IRoomEngineService {
  initializeRoom: () => Promise<void>;
  addAgentToMap(agent: Agent): void;
  getAgentFromMap(agentId: string): Agent | undefined;
  startRoom(): void;
}

export class RoomEngineService implements IRoomEngineService {
  private _roomName: string;
  private _roomId: string;
  private _roomDescription: string;
  private _roomAgents: TAgent[];
  private _roomTopic: string;
  private _roomMetaData: RoomMetadata;
  private _roomOutputs: RoomOutputs;
  private _roomBehaviour: RoomBehavior;
  private agentInstancesMap: Map<string, Agent>;
  private _memory: ChatMessageHistory;
  private _stopConditionState: { turnCount: number; startTime: number };

  constructor(roomDetails: RoomTemplate) {
    this._roomName = roomDetails.name;
    this._roomId = roomDetails.id;
    this._roomDescription = roomDetails.description;
    this._roomTopic = roomDetails.topicPrompt;
    this._roomMetaData = roomDetails.metadata;
    this._roomBehaviour = roomDetails.behavior;
    this._roomOutputs = roomDetails.outputs;
    this._roomAgents = roomDetails.agents;
    this.agentInstancesMap = new Map();
    this._memory = new ChatMessageHistory();
    this._stopConditionState = {
      turnCount: 0,
      startTime: Date.now(),
    };
  }

  async initializeRoom(): Promise<void> {
    this._roomAgents.forEach((agentDetails) => {
      const agent = new Agent(agentDetails, {
        id: this._roomId,
        name: this._roomName,
        description: this._roomDescription,
        topicPrompt: this._roomTopic,
        metadata: this._roomMetaData,
        behavior: this._roomBehaviour,
        outputs: this._roomOutputs,
        agents: this._roomAgents,
      });
      this.addAgentToMap(agent);
    });
  }

  addAgentToMap(agent: Agent): void {
    this.agentInstancesMap.set(agent._agentId, agent);
  }

  private initializeStopConditionState(): void {
    this._stopConditionState = {
      turnCount: 0,
      startTime: Date.now(),
    };
  }

  private isStopConditionMet(): boolean {
    for (const condition of this._roomBehaviour.stopConditions) {
      switch (condition.type) {
        case STOP_CONDITION_TYPE.MAX_TURNS:
          if (this._stopConditionState.turnCount >= condition.value) {
            return true;
          }
          break;
        case STOP_CONDITION_TYPE.TIME_LIMIT:
          const elapsedTime = Date.now() - this._stopConditionState.startTime;
          if (elapsedTime >= condition.value) {
            return true;
          }
          break;
        default:
          break;
      }
    }
    return false;
  }

  async startRoom(): Promise<void> {
    this.initializeStopConditionState();
    let instanceCounter = 0;
    while (!this.isStopConditionMet()) {
      console.log(
        this._stopConditionState,
        "this._stopConditionState------------>>>>>>"
      );
      try {
        const agent =
          this._roomAgents[instanceCounter % this._roomAgents.length];
        const agentInstance = this.getAgentFromMap(agent.id);
        if (!agentInstance) {
          throw new Error("Agent not found");
        }
        const response = await agentInstance.speak(this._memory);
        await this._memory.addUserMessage(
          `${agentInstance._agentName}: ${response.messages.content}`
        );
        this._stopConditionState.turnCount++;
        instanceCounter++;
      } catch (error) {
        console.log(error, "error------>>>>>>>>>");
      }
    }
  }

  getAgentFromMap(agentId: string): Agent | undefined {
    return this.agentInstancesMap.get(agentId);
  }
}
