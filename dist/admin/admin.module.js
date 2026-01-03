"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
;
permissions: List.from(json['permissions'] ?? []), name;
json['name'] ?? '', ;
return PermissionGroup(factory, PermissionGroup.fromJson(Map < String, dynamic > json), {});
required;
this.permissions, required;
this.name, PermissionGroup({ final, permissions, final, String, name, class: PermissionGroup }, {});
updatedAt: updatedAt ?? this.updatedAt, createdAt;
createdAt ?? this.createdAt, isSystemRole;
isSystemRole ?? this.isSystemRole, isActive;
isActive ?? this.isActive, permissions;
permissions ?? this.permissions, description;
description ?? this.description, displayName;
displayName ?? this.displayName, name;
name ?? this.name, id;
id ?? this.id, ;
return (0, role_entity_1.Role)();
{
    DateTime ? updatedAt : , DateTime ? createdAt : , bool ? isSystemRole : , bool ? isActive : , (List) ? permissions : , String ? description : , String ? displayName : , String ? name : , String ? id : , role_entity_1.Role;
    copyWith({});
}
;
'updatedAt';
updatedAt.toIso8601String(), 'createdAt';
createdAt.toIso8601String(), 'isSystemRole';
isSystemRole, 'isActive';
isActive, 'permissions';
permissions, 'description';
description, 'displayName';
displayName, 'name';
name, 'id';
id, ;
return { toJson() { }, DateTime, : .now(), DateTime, : .parse(json['updatedAt']), updatedAt: json['updatedAt'] != null, DateTime, : .now(), DateTime, : .parse(json['createdAt']), createdAt: json['createdAt'] != null, isSystemRole: json['isSystemRole'] ?? false, isActive: json['isActive'] ?? true, permissions: List.from(json['permissions'] ?? []), description: json['description'], displayName: json['displayName'] ?? '', name: json['name'] ?? '', id: json['id'] ?? '', return: (0, role_entity_1.Role)(factory, role_entity_1.Role.fromJson(Map < String, dynamic > json), {}), required, this: .updatedAt, required, this: .createdAt, required, this: .isSystemRole, required, this: .isActive, required, this: .permissions, this: .description, required, this: .displayName, required, this: .name, required, this: .id, Role({ final, DateTime, updatedAt, final, DateTime, createdAt, final, bool, isSystemRole, final, bool, isActive, final, List }, , String) { } } > permissions;
final;
String ? description : ;
final;
String;
displayName;
final;
String;
name;
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const user_entity_1 = require("../users/entities/user.entity");
const clinic_entity_1 = require("../clinics/entities/clinic.entity");
const role_entity_1 = require("./entities/role.entity");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, clinic_entity_1.Clinic, role_entity_1.Role])],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map