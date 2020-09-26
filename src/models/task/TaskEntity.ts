export class TaskEntity {
    id: string;
    title: string;
    description?: string;
    category?: string;
    spaceId: string;
    completed: boolean;
    completedAt?: string;
    dueDate?: string;
    userId: string;
}
