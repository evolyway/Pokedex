import { RenderMode, ServerRoute } from '@angular/ssr';

import { Roles } from '#services/roles';
import { inject } from '@angular/core';
import Camp from '#types/camp';
import Aura from '#types/aura';

const withPrerenderParams = (path: string, values: Record<string, string[]>): ServerRoute => ({
	path,
	renderMode: RenderMode.Prerender,
	getPrerenderParams: async () => getAllKeyValueCombinations(values),
});

export const serverRoutes: ServerRoute[] = [
	{
		path: 'role/:name',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => {
			const roles = inject(Roles);
			return roles.list.map((role) => ({
				name: role.normalizedName,
			}));
		},
	},
	withPrerenderParams('camp/:name', { name: Object.values(Camp) }),
	withPrerenderParams('aura/:name', { name: Object.values(Aura) }),
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];

function getAllKeyValueCombinations(values: Record<string, string[]>): Record<string, string>[];
function getAllKeyValueCombinations(values: [string, string[]][]): [string, string][][];
function getAllKeyValueCombinations(values: Record<string, string[]> | [string, string[]][]): Record<string, string>[] | [string, string][][] {
	if (!Array.isArray(values)) return getAllKeyValueCombinations(Object.entries(values as Record<string, string[]>)).map(Object.fromEntries);

	if (values.length === 0) return [[]];

	const [[firstKey, firstValues], ...rest] = values;
	const combinationsOfRest = getAllKeyValueCombinations(rest);

	return firstValues.flatMap((firstValue) =>
		combinationsOfRest.map((combinationOfRest) => [
			[firstKey, firstValue] as [string, string],
			...combinationOfRest,
		])
	);
}
