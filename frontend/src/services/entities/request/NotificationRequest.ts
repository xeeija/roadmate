
export interface NotificationRequest {
    description?: string | undefined;
    url?: string | undefined;
    readAt?: Date | undefined;
    userId?: string;
    routeId?: string;
    dangerId?: string;
}
