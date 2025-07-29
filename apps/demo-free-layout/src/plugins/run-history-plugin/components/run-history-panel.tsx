import { Table } from "@douyinfe/semi-ui";
import { RunHistoryService } from "../service";

interface RunHistoryPanelProps {
  service: RunHistoryService;
}

export const RunHistoryPanel: React.FC<RunHistoryPanelProps> = (props) => {
  const { service } = props;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "0.572px solid rgba(6, 7, 9, 0.10)",
        overflow: "hidden",
        boxShadow:
          "0px 2.289px 6.867px 0px rgba(0, 0, 0, 0.08), 0px 4.578px 13.733px 0px rgba(0, 0, 0, 0.04)",
        boxSizing: "border-box",
        padding: 8,
      }}
    >
      <Table columns={service.getColumns()} dataSource={[]} />
    </div>
  );
};
