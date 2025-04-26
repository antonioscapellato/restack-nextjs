import React, { createContext, useContext, useState, ReactNode } from "react";

export type Task = {
  type: string;
  description: string;
  status: string;
  created: string;
};

interface TasksContextType {
  tasks: Task[];
  addTasks: (newTasks: Task[]) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    // Initial demo tasks, can be empty or removed later
    {
      type: "Booking Request",
      description: "New haircut appointment for Sarah",
      status: "Pending",
      created: "2025-04-26 10:30",
    },
    {
      type: "Schedule Change",
      description: "Reschedule nail appointment for Maria",
      status: "In Progress",
      created: "2025-04-26 09:15",
    },
  ]);

  const addTasks = (newTasks: Task[]) => {
    setTasks((prev) => [...prev, ...newTasks]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
} 