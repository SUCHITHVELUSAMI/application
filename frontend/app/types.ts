export interface Todo {
  id: number; // ID is required for existing todos
  title: string;
  description?: string; // Optional if you have a description field
  status: 'pending' | 'completed' | 'in progress'; // Include 'in progress' status
}
