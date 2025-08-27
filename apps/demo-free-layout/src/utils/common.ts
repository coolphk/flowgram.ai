export const getNotifyKey = (assetId: string, toolId: string, nodeId?: string) => {
  return nodeId ? `${nodeId}-${assetId}-${toolId}` : `${assetId}-${toolId}`
}
