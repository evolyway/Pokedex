import { RenderMode, ServerRoute } from '@angular/ssr';

import { Roles } from '#services/roles';
import { inject } from '@angular/core';
import Camp from '#types/camp';
import Aura from '#types/aura';

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
	{
		path: 'camp/:name',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => {
			return Object.values(Camp).map((camp) => ({
				name: camp,
			}));
		},
	},
	{
		path: 'aura/:name',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => {
			return Object.values(Aura).map((aura) => ({
				name: aura,
			}));
		},
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
