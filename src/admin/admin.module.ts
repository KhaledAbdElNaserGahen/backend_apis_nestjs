import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';































































































}  }    );      permissions: List<String>.from(json['permissions'] ?? []),      name: json['name'] ?? '',    return PermissionGroup(  factory PermissionGroup.fromJson(Map<String, dynamic> json) {  });    required this.permissions,    required this.name,  PermissionGroup({  final List<String> permissions;  final String name;class PermissionGroup {}  }    );      updatedAt: updatedAt ?? this.updatedAt,      createdAt: createdAt ?? this.createdAt,      isSystemRole: isSystemRole ?? this.isSystemRole,      isActive: isActive ?? this.isActive,      permissions: permissions ?? this.permissions,      description: description ?? this.description,      displayName: displayName ?? this.displayName,      name: name ?? this.name,      id: id ?? this.id,    return Role(  }) {    DateTime? updatedAt,    DateTime? createdAt,    bool? isSystemRole,    bool? isActive,    List<String>? permissions,    String? description,    String? displayName,    String? name,    String? id,  Role copyWith({  }    };      'updatedAt': updatedAt.toIso8601String(),      'createdAt': createdAt.toIso8601String(),      'isSystemRole': isSystemRole,      'isActive': isActive,      'permissions': permissions,      'description': description,      'displayName': displayName,      'name': name,      'id': id,    return {  Map<String, dynamic> toJson() {  }    );          : DateTime.now(),          ? DateTime.parse(json['updatedAt'])      updatedAt: json['updatedAt'] != null          : DateTime.now(),          ? DateTime.parse(json['createdAt'])      createdAt: json['createdAt'] != null      isSystemRole: json['isSystemRole'] ?? false,      isActive: json['isActive'] ?? true,      permissions: List<String>.from(json['permissions'] ?? []),      description: json['description'],      displayName: json['displayName'] ?? '',      name: json['name'] ?? '',      id: json['id'] ?? '',    return Role(  factory Role.fromJson(Map<String, dynamic> json) {  });    required this.updatedAt,    required this.createdAt,    required this.isSystemRole,    required this.isActive,    required this.permissions,    this.description,    required this.displayName,    required this.name,    required this.id,  Role({  final DateTime updatedAt;  final DateTime createdAt;  final bool isSystemRole;  final bool isActive;  final List<String> permissions;  final String? description;  final String displayName;  final String name;import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../users/entities/user.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Clinic, Role])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
