// 转换函数：将ctx.document.toJSON()的数据转换为ISaveContent格式
import { DataSlot, SaveRequest, ISaveValidation, Workflow, DataSlotNodeData } from "../typings";
import { WorkflowNodeType } from "../nodes";

export const convertToSaveContent = async (dtId: string, documentData: any): Promise<SaveRequest> => {

  const dataslots: DataSlot[] = [];
  const workflows: Workflow[] = [];
  let raw = JSON.stringify(documentData);

  // 处理节点数据 - 使用map和Promise.all进行并发处理
  const nodeProcessingPromises = documentData.nodes.map(async (node: any) => {
    const nodeData = node.data;

    if (node.type === WorkflowNodeType.DataSlot) {
      const typedNodeData = nodeData as DataSlotNodeData;
      // 获取data-slot节点的serverId
      const serverId = nodeData?.serverId || node.id;

      // 获取连接信息
      let from = '';
      let to = '';

      // 从edges中查找连接信息
      const incomingEdge = documentData.edges.find((edge: any) => edge.targetNodeID === node.id);
      const outgoingEdge = documentData.edges.find((edge: any) => edge.sourceNodeID === node.id);
      // console.log('incomingEdge', incomingEdge)
      // console.log('outgoingEdge', outgoingEdge)

      if (incomingEdge) {
        from = documentData.nodes.find((node: any) => node.id === incomingEdge.sourceNodeID)?.data?.serverId || '';
      }

      if (outgoingEdge) {
        to = documentData.nodes.find((node: any) => node.id === outgoingEdge.targetNodeID)?.data?.serverId || '';
      }

      // 收集所有需要处理的验证项
      const validationItems = typedNodeData?.rawData?.[typedNodeData.from!] || [];

      const validations: ISaveValidation[] = validationItems.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          validations: item.validation
        };
      });

      return {
        type: 'dataslot',
        data: {
          id: serverId,
          type: node.type,
          name: nodeData.title || '',
          description: '',
          validations: validations,
          tools: [],
          from,
          to,
          uploadFiles: [],
          nodeId: node.id
        }
      };
    } else if (node.type === 'workflow') {
      // 获取workflow节点的serverId
      const serverId = node.data?.serverId || node.id;
      return {
        type: 'workflow',
        data: {
          id: serverId,
          type: node.type,
          original: nodeData.rawData?.id,
          inputs: nodeData.rawData?.inputs || [],
          outputs: nodeData.rawData?.outputs || [],
          nodeId: node.id
        }
      };
    }

    return null;
  });

  // 等待所有节点处理完成
  const processedNodes = await Promise.all(nodeProcessingPromises);

  // 分离dataslots和workflows
  processedNodes.forEach(result => {
    if (result?.type === 'dataslot') {
      dataslots.push(result.data);
    } else if (result?.type === 'workflow') {
      workflows.push(result.data);
    }
  });

  return {
    id: dtId,
    dataslots,
    workflows,
    raw
  };
};
