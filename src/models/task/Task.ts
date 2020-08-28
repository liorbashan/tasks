export class Task {
    id: string;
    title: string;
    description?: string;
    spaceId: string;
    completed: boolean;
    completedAt?: string;
    dueDate?: string;
    userId: string;
}