import type { SidebarTree, SidebarNode } from '#types/sidebarStructure';
import type Camp from '#types/camp';
import { Role } from '#types/role';

const groupBy = <T>(
	array: T[],
	key: (item: T) => string,
): Record<string, T[]> =>
	array.reduce(
		(result, item) => ({
			...result,
			[key(item)]: [...(result[key(item)] || []), item],
		}),
		{} as Record<string, T[]>,
	);

const getRolesGrouped: (
	roles: Role[],
	groupBy: (role: Role) => string,
) => SidebarNode = (roles: Role[], key: (role: Role) => string) =>
	/* { "camp": [ "/camp/normalizedCamp", { "name": "/role/normalizedName" } ] } */
	Object.entries(groupBy(roles, key)).reduce(
		(acc, [camp, roles]) => ({
			...acc,
			[camp]: [
				`/camp/${camp.toLowerCase()}`,
				roles!.reduce(
					(acc, role) => ({
						...acc,
						[role.name]: `/role/${role.normalizedName}`,
					}),
					{} as Record<string, string>,
				),
			],
		}),
		{} as Record<Camp, [string, Record<string, string>]>,
	);

export const getSidebarStructure: (roles: Role[]) => SidebarTree = (
	roles: Role[],
) => ({
	Entries: getRolesGrouped(roles, (role) => role.camp),
});
