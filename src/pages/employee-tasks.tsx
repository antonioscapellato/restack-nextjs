import React from "react";
import Header from "../components/Header";
import { useTasks } from "../components/TasksContext";

export default function EmployeeTasks() {
  const { tasks } = useTasks();
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-start pt-20">
        <div className="w-full max-w-4xl mx-auto pt-16 px-4 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-2 tracking-tight">
            Employee Tasks Dashboard <span className="inline-block align-middle">📋</span>
          </h1>
          <p className="text-lg text-gray-600 text-center mb-10">
            Manage tasks and requests from Tinkerbell here. Keep track of bookings, inquiries, and customer requests.
          </p>
          <div className="w-full bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {tasks.map((task, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge badge-outline ${task.status === "Pending" ? "badge-warning" : task.status === "In Progress" ? "badge-info" : "badge-success"}`}>{task.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
} 