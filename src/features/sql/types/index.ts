export interface Task {
  id: number;
  text: string;
  solution: string;
}

export interface Exercise {
  lesson_no: number;
  name: string;
  tasks: Task[];
}

export interface CompletedTasks {
  [key: number]: boolean;
}
