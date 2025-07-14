import { ROOM_TEMPLATES } from "./constant";
import { RoomEngineService } from "./services/room-engine-service";
import "dotenv/config";

const roomService = new RoomEngineService(ROOM_TEMPLATES[0]);

roomService.initializeRoom();

roomService.startRoom();
