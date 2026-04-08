import { RenderMode, ServerRoute } from '@angular/ssr';

import { Roles } from '#services/roles';
import { inject } from '@angular/core';
import Camp from '#types/camp';
import Aura from '#types/aura';
import { getAllKeyValueCombinations } from '#lib/record';

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

