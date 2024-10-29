export interface Task {
  id: number;
  title: string;
  status: "todo" | "inProgress" | "done";
  priority: "low" | "medium" | "high";
}
