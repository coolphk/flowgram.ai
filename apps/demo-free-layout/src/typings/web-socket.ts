export enum WSMessageType {
  NodeMessage = 'nodeMessage',
  FileMessage = 'fileMessage',
}

export interface WSNodePayload {
  nodeId: string,
  inputsValues: WSNodeMessage[],
}

export interface WSFilePayload {
  asset_id: string,
  dataslot_id: string,
  status: string,
  task_id: string
  object_path: string,
  filename: string,
  dt_id: string,
}

export interface WSNodeMessage {
  id: string,
  name: string,
  status: string,
}
interface WSMessageBase {
  type: WSMessageType;
  timestamp: number;
  payload: WSNodePayload | WSFilePayload;
}
interface WSNodeMessageWrapper extends WSMessageBase{
  type: WSMessageType.NodeMessage;
  payload: WSNodePayload;
}

interface WSFileMessageWrapper extends WSMessageBase{
  type: WSMessageType.FileMessage;
  payload: WSFilePayload;
}

export type WSMessage = WSNodeMessageWrapper | WSFileMessageWrapper;

/*const a: WSMessage = {
  type:'nodeMessage',
  payload: {
    nodeId: 'data-slot-1',
    inputsValues: [{
      id:'生成文件id',
      name:'生成文件名称(POSCAR,KPOINTS等)',
      status:'success',
    }]
  },
  timestamp: 1694560000000,
}*/
