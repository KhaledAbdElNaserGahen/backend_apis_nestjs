import { DataSource } from 'typeorm';
import { Role } from '../src/admin/entities/role.entity';
import { PERMISSIONS } from '../src/admin/constants/permissions';
import { ObjectId } from 'mongodb';

export async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);

  // Check if roles already exist
  const existingRoles = await roleRepository.count();
  if (existingRoles > 0) {
    console.log('✅ Roles already seeded');
    return;
  }

  const defaultRoles = [
    {
      id: new ObjectId().toString(),
      name: 'superadmin',
      displayName: 'Super Administrator',
      description: 'Full system access with all permissions',
      permissions: Object.values(PERMISSIONS),
      isActive: true,
      isSystemRole: true,
    },
    {
      id: new ObjectId().toString(),
      name: 'admin',
      displayName: 'Administrator',
      description: 'Administrative access to manage users and content',
      permissions: [
        PERMISSIONS.USER_VIEW,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_APPROVE,
        PERMISSIONS.CLINIC_VIEW,
        PERMISSIONS.CLINIC_CREATE,
        PERMISSIONS.CLINIC_UPDATE,
        PERMISSIONS.FAMILY_VIEW,
        PERMISSIONS.MESSAGE_VIEW,
        PERMISSIONS.NOTIFICATION_VIEW,
        PERMISSIONS.NOTIFICATION_CREATE,
        PERMISSIONS.EMERGENCY_VIEW,
        PERMISSIONS.EMERGENCY_MANAGE_REQUESTS,
        PERMISSIONS.VIDEO_VIEW,
        PERMISSIONS.VIDEO_UPLOAD,
        PERMISSIONS.STATISTICS_VIEW,
      ],
      isActive: true,
      isSystemRole: true,
    },
    {
      id: new ObjectId().toString(),
      name: 'doctor',
      displayName: 'Doctor',
      description: 'Medical professional with access to patient care features',
      permissions: [
        PERMISSIONS.USER_VIEW,
        PERMISSIONS.CLINIC_VIEW,
        PERMISSIONS.FAMILY_VIEW,
        PERMISSIONS.MESSAGE_VIEW,
        PERMISSIONS.MESSAGE_SEND,
        PERMISSIONS.NOTIFICATION_VIEW,
        PERMISSIONS.EMERGENCY_VIEW,
        PERMISSIONS.EMERGENCY_MANAGE_REQUESTS,
        PERMISSIONS.VIDEO_VIEW,
        PERMISSIONS.PHARMACY_VIEW,
      ],
      isActive: true,
      isSystemRole: true,
    },
    {
      id: new ObjectId().toString(),
      name: 'patient',
      displayName: 'Patient',
      description: 'Standard patient with basic access',
      permissions: [
        PERMISSIONS.FAMILY_VIEW,
        PERMISSIONS.FAMILY_CREATE,
        PERMISSIONS.FAMILY_UPDATE,
        PERMISSIONS.MESSAGE_VIEW,
        PERMISSIONS.MESSAGE_SEND,
        PERMISSIONS.NOTIFICATION_VIEW,
        PERMISSIONS.EMERGENCY_VIEW,
        PERMISSIONS.EMERGENCY_CREATE,
        PERMISSIONS.VIDEO_VIEW,
        PERMISSIONS.PHARMACY_VIEW,
        PERMISSIONS.SETTINGS_VIEW,
        PERMISSIONS.SETTINGS_UPDATE,
      ],
      isActive: true,
      isSystemRole: true,
    },
    {
      id: new ObjectId().toString(),
      name: 'moderator',
      displayName: 'Moderator',
      description: 'Content moderator with limited administrative access',
      permissions: [
        PERMISSIONS.USER_VIEW,
        PERMISSIONS.MESSAGE_VIEW,
        PERMISSIONS.MESSAGE_DELETE,
        PERMISSIONS.NOTIFICATION_VIEW,
        PERMISSIONS.NOTIFICATION_CREATE,
        PERMISSIONS.VIDEO_VIEW,
        PERMISSIONS.VIDEO_UPDATE,
        PERMISSIONS.EMERGENCY_VIEW,
      ],
      isActive: true,
      isSystemRole: false,
    },
  ];

  await roleRepository.save(defaultRoles);
  console.log('✅ Default roles seeded successfully');
}
