
export interface RouteRequest {
    userId?: string;
    name?: string | undefined;
    fromLat?: number;
    fromLon?: number;
    toLat?: number;
    toLon?: number;
    fromAddressName?: string | undefined;
    toAddressName?: string | undefined;
    notificationEnabled?: boolean;
}
