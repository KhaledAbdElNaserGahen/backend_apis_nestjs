import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from './entities/role.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('AdminService', () => {
  let service: AdminService;
  let usersRepository: Repository<User>;
  let rolesRepository: Repository<Role>;
  let clinicsRepository: Repository<Clinic>;

  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockRolesRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockClinicsRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRolesRepository,
        },
        {
          provide: getRepositoryToken(Clinic),
          useValue: mockClinicsRepository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    rolesRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    clinicsRepository = module.get<Repository<Clinic>>(getRepositoryToken(Clinic));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const users = [
        { id: '1', email: 'user1@example.com', name: 'User 1' },
        { id: '2', email: 'user2@example.com', name: 'User 2' },
      ];

      mockUsersRepository.find.mockResolvedValue(users);

      const result = await service.getUsers();

      expect(result).toEqual(users);
      expect(mockUsersRepository.find).toHaveBeenCalled();
    });

    it('should filter users by role', async () => {
      const filters = { role: 'doctor' };
      const users = [{ id: '1', email: 'doctor@example.com', role: 'doctor' }];

      mockUsersRepository.find.mockResolvedValue(users);

      const result = await service.getUsers(filters);

      expect(result).toEqual(users);
    });
  });

  describe('createRole', () => {
    it('should create a new role', async () => {
      const createRoleDto = {
        name: 'moderator',
        displayName: 'Moderator',
        description: 'Can moderate content',
        permissions: ['USER_VIEW', 'USER_UPDATE'],
      };

      const role = {
        id: '1',
        ...createRoleDto,
        isActive: true,
        isSystemRole: false,
      };

      mockRolesRepository.findOne.mockResolvedValue(null);
      mockRolesRepository.create.mockReturnValue(role);
      mockRolesRepository.save.mockResolvedValue(role);

      const result = await service.createRole(createRoleDto);

      expect(result).toEqual(role);
      expect(mockRolesRepository.create).toHaveBeenCalled();
      expect(mockRolesRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if role exists', async () => {
      const createRoleDto = {
        name: 'admin',
        displayName: 'Admin',
        permissions: [],
      };

      mockRolesRepository.findOne.mockResolvedValue({ name: 'admin' });

      await expect(service.createRole(createRoleDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('updateUserRole', () => {
    it('should update user role', async () => {
      const updateDto = {
        userId: '1',
        role: 'doctor',
      };

      const user = {
        id: '1',
        email: 'user@example.com',
        role: 'patient',
      };

      mockUsersRepository.findOne.mockResolvedValue(user);
      mockUsersRepository.save.mockResolvedValue({ ...user, role: 'doctor' });

      const result = await service.updateUserRole(updateDto);

      expect(result.role).toBe('doctor');
      expect(mockUsersRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateDto = {
        userId: '999',
        role: 'doctor',
      };

      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.updateUserRole(updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = '1';
      const user = { id: userId, email: 'user@example.com' };

      mockUsersRepository.findOne.mockResolvedValue(user);
      mockUsersRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteUser(userId);

      expect(mockUsersRepository.delete).toHaveBeenCalledWith({ id: userId });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteUser('999')).rejects.toThrow(NotFoundException);
    });
  });
});
