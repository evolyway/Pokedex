import type { SidebarStructure, SidebarStructureEntries } from '#types/sidebarStructure';
import type Camp from '#types/camp';
import { Role } from '#types/role';

const getRolesGrouped: (roles: Role[], groupBy: (role: Role) => string) => SidebarStructureEntries = (roles: Role[], groupBy: (role: Role) => string) =>
	/* { "camp": { "name": "/role/normalizedName" } } */
	Object.entries(Object.groupBy(
			roles,
			groupBy
		))
			.filter(([,roles]) => roles !== undefined)
			.reduce((acc, [camp, roles]) => ({
				...acc,
				[camp]: roles!.reduce((acc, role) => ({
					...acc,
					[role.name]: `/role/${role.normalizedName}`,
				}), {} as Record<string, string>),
			}), {} as Record<Camp, Record<string, string>>);

export const getSidebarStructure: (roles: Role[]) => SidebarStructure = (roles: Role[]) => ({
	"Entries": getRolesGrouped(roles, role => role.camp),
});
