1. 将data-slot\form-meta中的逻辑拆分出来，在sidebar中显示的逻辑需要放入data-slot\sidebar，其他逻辑放入data-slot\node-render中，具体的拆分可以参考workflow节点
2. 在data-slot节点的siderender中添加一组上传组件
2. 上传组件可以参考test run form中的上传组件
3. 上传组件是根据当前节点的inputs动态生成的
4. siderender中添加一个上传组件的按钮
