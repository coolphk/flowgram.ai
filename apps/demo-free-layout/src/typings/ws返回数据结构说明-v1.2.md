
### 消息类型
  - UPLOAD_FILE
  - RUN_TOOL
  - RUN_WORKFLOW
### upload接口WS回执消息
```json
{
  "nodeId": "由提交接口传入的nodeId",
  "type": "UPLOAD_FILE",
  "timestamp": 1694560000000,
  "payload": {
    "description": "上传文件成功",
    "assetsId": "xxx",
    "status": "success|需要补充其他状态"
  }
}
```
### run-tool接口WS回执消息
```json
{
  "nodeId": "由提交接口传入的nodeId",
  "type": "RUN_TOOL",
  "timestamp": 1694560000000,
  "payload": {
    "status": "success",
    "assetsId": ["xxx"],
    "toolId": "xxx",
    "url": "xxx"
  }
}
```
### run-workflow接口WS回执消息
```json
{
  "nodeId": "由提交接口传入的nodeId",
  "type": "RUN_WORKFLOW",
  "timestamp": 1694560000000,
  "payload": {
    "status": "success",//workflow节点状态
    "nextNodes": [{
      "id": "data-slot-1",//下游节点id
      "type":"data-slot|workflow|....",
      "assets": [{
        "id": "1|2|3...", //生成的资产id
        "name":"poscar，kpoints等", //生成的资产名称
        "status": "success|失败状态" //资产状态
      }]
    }]
  }
}
```

