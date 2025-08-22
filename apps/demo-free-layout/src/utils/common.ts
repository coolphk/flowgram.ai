export const getNotifyKey = (assetIs: string, toolId: string) => {
  return `${assetIs}-${toolId}`
}
