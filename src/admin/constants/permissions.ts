export const PERMISSIONS = {
  // User Management
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_APPROVE: 'user:approve',
  USER_ASSIGN_ROLE: 'user:assign-role',

  // Role Management
  ROLE_VIEW: 'role:view',
  ROLE_CREATE: 'role:create',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',

  // Clinic Management
  CLINIC_VIEW: 'clinic:view',
  CLINIC_CREATE: 'clinic:create',
  CLINIC_UPDATE: 'clinic:update',
  CLINIC_DELETE: 'clinic:delete',

  // Family Management
  FAMILY_VIEW: 'family:view',
  FAMILY_CREATE: 'family:create',
  FAMILY_UPDATE: 'family:update',
  FAMILY_DELETE: 'family:delete',

  // Messages
  MESSAGE_VIEW: 'message:view',
  MESSAGE_SEND: 'message:send',
  MESSAGE_DELETE: 'message:delete',

  // Notifications
  NOTIFICATION_VIEW: 'notification:view',
  NOTIFICATION_CREATE: 'notification:create',
  NOTIFICATION_DELETE: 'notification:delete',

  // Emergency Services
  EMERGENCY_VIEW: 'emergency:view',
  EMERGENCY_CREATE: 'emergency:create',
  EMERGENCY_UPDATE: 'emergency:update',
  EMERGENCY_DELETE: 'emergency:delete',
  EMERGENCY_MANAGE_REQUESTS: 'emergency:manage-requests',

  // Videos
  VIDEO_VIEW: 'video:view',
  VIDEO_UPLOAD: 'video:upload',
  VIDEO_UPDATE: 'video:update',
  VIDEO_DELETE: 'video:delete',

  // Pharmacy
  PHARMACY_VIEW: 'pharmacy:view',
  PHARMACY_MANAGE: 'pharmacy:manage',

  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',

  // Statistics & Reports
  STATISTICS_VIEW: 'statistics:view',

  // System Administration
  SYSTEM_ADMIN: 'system:admin',
};

export const PERMISSION_GROUPS = {
  USER_MANAGEMENT: {
    name: 'User Management',
    permissions: [
      PERMISSIONS.USER_VIEW,
      PERMISSIONS.USER_CREATE,
      PERMISSIONS.USER_UPDATE,
      PERMISSIONS.USER_DELETE,
      PERMISSIONS.USER_APPROVE,
      PERMISSIONS.USER_ASSIGN_ROLE,
    ],
  },
  ROLE_MANAGEMENT: {
    name: 'Role Management',
    permissions: [
      PERMISSIONS.ROLE_VIEW,
      PERMISSIONS.ROLE_CREATE,
      PERMISSIONS.ROLE_UPDATE,
      PERMISSIONS.ROLE_DELETE,
    ],
  },
  CLINIC_MANAGEMENT: {
    name: 'Clinic Management',
    permissions: [
      PERMISSIONS.CLINIC_VIEW,
      PERMISSIONS.CLINIC_CREATE,
      PERMISSIONS.CLINIC_UPDATE,
      PERMISSIONS.CLINIC_DELETE,
    ],
  },
  FAMILY_MANAGEMENT: {
    name: 'Family Management',
    permissions: [
      PERMISSIONS.FAMILY_VIEW,
      PERMISSIONS.FAMILY_CREATE,
      PERMISSIONS.FAMILY_UPDATE,
      PERMISSIONS.FAMILY_DELETE,
    ],
  },
  MESSAGING: {
    name: 'Messaging',
    permissions: [
      PERMISSIONS.MESSAGE_VIEW,
      PERMISSIONS.MESSAGE_SEND,
      PERMISSIONS.MESSAGE_DELETE,
    ],
  },
  NOTIFICATIONS: {
    name: 'Notifications',
    permissions: [
      PERMISSIONS.NOTIFICATION_VIEW,
      PERMISSIONS.NOTIFICATION_CREATE,
      PERMISSIONS.NOTIFICATION_DELETE,
    ],
  },
  EMERGENCY_SERVICES: {
    name: 'Emergency Services',
    permissions: [
      PERMISSIONS.EMERGENCY_VIEW,
      PERMISSIONS.EMERGENCY_CREATE,
      PERMISSIONS.EMERGENCY_UPDATE,
      PERMISSIONS.EMERGENCY_DELETE,
      PERMISSIONS.EMERGENCY_MANAGE_REQUESTS,
    ],
  },
  VIDEOS: {
    name: 'Videos',
    permissions: [
      PERMISSIONS.VIDEO_VIEW,
      PERMISSIONS.VIDEO_UPLOAD,
      PERMISSIONS.VIDEO_UPDATE,
      PERMISSIONS.VIDEO_DELETE,
    ],
  },
  PHARMACY: {
    name: 'Pharmacy',
    permissions: [
      PERMISSIONS.PHARMACY_VIEW,
      PERMISSIONS.PHARMACY_MANAGE,
    ],
  },
  SETTINGS: {
    name: 'Settings',
    permissions: [
      PERMISSIONS.SETTINGS_VIEW,
      PERMISSIONS.SETTINGS_UPDATE,
    ],
  },
  STATISTICS: {
    name: 'Statistics & Reports',
    permissions: [
      PERMISSIONS.STATISTICS_VIEW,
    ],
  },
  SYSTEM: {
    name: 'System Administration',
    permissions: [
      PERMISSIONS.SYSTEM_ADMIN,
    ],
  },
};
