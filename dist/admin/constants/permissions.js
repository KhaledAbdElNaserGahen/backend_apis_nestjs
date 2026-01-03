"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION_GROUPS = exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    USER_VIEW: 'user:view',
    USER_CREATE: 'user:create',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',
    USER_APPROVE: 'user:approve',
    USER_ASSIGN_ROLE: 'user:assign-role',
    ROLE_VIEW: 'role:view',
    ROLE_CREATE: 'role:create',
    ROLE_UPDATE: 'role:update',
    ROLE_DELETE: 'role:delete',
    CLINIC_VIEW: 'clinic:view',
    CLINIC_CREATE: 'clinic:create',
    CLINIC_UPDATE: 'clinic:update',
    CLINIC_DELETE: 'clinic:delete',
    FAMILY_VIEW: 'family:view',
    FAMILY_CREATE: 'family:create',
    FAMILY_UPDATE: 'family:update',
    FAMILY_DELETE: 'family:delete',
    MESSAGE_VIEW: 'message:view',
    MESSAGE_SEND: 'message:send',
    MESSAGE_DELETE: 'message:delete',
    NOTIFICATION_VIEW: 'notification:view',
    NOTIFICATION_CREATE: 'notification:create',
    NOTIFICATION_DELETE: 'notification:delete',
    EMERGENCY_VIEW: 'emergency:view',
    EMERGENCY_CREATE: 'emergency:create',
    EMERGENCY_UPDATE: 'emergency:update',
    EMERGENCY_DELETE: 'emergency:delete',
    EMERGENCY_MANAGE_REQUESTS: 'emergency:manage-requests',
    VIDEO_VIEW: 'video:view',
    VIDEO_UPLOAD: 'video:upload',
    VIDEO_UPDATE: 'video:update',
    VIDEO_DELETE: 'video:delete',
    PHARMACY_VIEW: 'pharmacy:view',
    PHARMACY_MANAGE: 'pharmacy:manage',
    SETTINGS_VIEW: 'settings:view',
    SETTINGS_UPDATE: 'settings:update',
    STATISTICS_VIEW: 'statistics:view',
    SYSTEM_ADMIN: 'system:admin',
};
exports.PERMISSION_GROUPS = {
    USER_MANAGEMENT: {
        name: 'User Management',
        permissions: [
            exports.PERMISSIONS.USER_VIEW,
            exports.PERMISSIONS.USER_CREATE,
            exports.PERMISSIONS.USER_UPDATE,
            exports.PERMISSIONS.USER_DELETE,
            exports.PERMISSIONS.USER_APPROVE,
            exports.PERMISSIONS.USER_ASSIGN_ROLE,
        ],
    },
    ROLE_MANAGEMENT: {
        name: 'Role Management',
        permissions: [
            exports.PERMISSIONS.ROLE_VIEW,
            exports.PERMISSIONS.ROLE_CREATE,
            exports.PERMISSIONS.ROLE_UPDATE,
            exports.PERMISSIONS.ROLE_DELETE,
        ],
    },
    CLINIC_MANAGEMENT: {
        name: 'Clinic Management',
        permissions: [
            exports.PERMISSIONS.CLINIC_VIEW,
            exports.PERMISSIONS.CLINIC_CREATE,
            exports.PERMISSIONS.CLINIC_UPDATE,
            exports.PERMISSIONS.CLINIC_DELETE,
        ],
    },
    FAMILY_MANAGEMENT: {
        name: 'Family Management',
        permissions: [
            exports.PERMISSIONS.FAMILY_VIEW,
            exports.PERMISSIONS.FAMILY_CREATE,
            exports.PERMISSIONS.FAMILY_UPDATE,
            exports.PERMISSIONS.FAMILY_DELETE,
        ],
    },
    MESSAGING: {
        name: 'Messaging',
        permissions: [
            exports.PERMISSIONS.MESSAGE_VIEW,
            exports.PERMISSIONS.MESSAGE_SEND,
            exports.PERMISSIONS.MESSAGE_DELETE,
        ],
    },
    NOTIFICATIONS: {
        name: 'Notifications',
        permissions: [
            exports.PERMISSIONS.NOTIFICATION_VIEW,
            exports.PERMISSIONS.NOTIFICATION_CREATE,
            exports.PERMISSIONS.NOTIFICATION_DELETE,
        ],
    },
    EMERGENCY_SERVICES: {
        name: 'Emergency Services',
        permissions: [
            exports.PERMISSIONS.EMERGENCY_VIEW,
            exports.PERMISSIONS.EMERGENCY_CREATE,
            exports.PERMISSIONS.EMERGENCY_UPDATE,
            exports.PERMISSIONS.EMERGENCY_DELETE,
            exports.PERMISSIONS.EMERGENCY_MANAGE_REQUESTS,
        ],
    },
    VIDEOS: {
        name: 'Videos',
        permissions: [
            exports.PERMISSIONS.VIDEO_VIEW,
            exports.PERMISSIONS.VIDEO_UPLOAD,
            exports.PERMISSIONS.VIDEO_UPDATE,
            exports.PERMISSIONS.VIDEO_DELETE,
        ],
    },
    PHARMACY: {
        name: 'Pharmacy',
        permissions: [
            exports.PERMISSIONS.PHARMACY_VIEW,
            exports.PERMISSIONS.PHARMACY_MANAGE,
        ],
    },
    SETTINGS: {
        name: 'Settings',
        permissions: [
            exports.PERMISSIONS.SETTINGS_VIEW,
            exports.PERMISSIONS.SETTINGS_UPDATE,
        ],
    },
    STATISTICS: {
        name: 'Statistics & Reports',
        permissions: [
            exports.PERMISSIONS.STATISTICS_VIEW,
        ],
    },
    SYSTEM: {
        name: 'System Administration',
        permissions: [
            exports.PERMISSIONS.SYSTEM_ADMIN,
        ],
    },
};
//# sourceMappingURL=permissions.js.map