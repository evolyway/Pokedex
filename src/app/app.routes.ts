import { Routes } from '@angular/router';
import { Home } from '#pages/home';
import { RoleDetails } from '#pages/role-details';
import { RoleList } from '#pages/role-list';

import Camps from '#types/camp';
import Aura from '#types/aura';
import { Role } from '#types/role';

// prettier-ignore
export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'role/:name', component: RoleDetails },
	{ path: 'camp/:name', component: RoleList, data: { options: Object.values(Camps), optionGetter: (role: Role) => role.camp } },
	{ path: 'aura/:name', component: RoleList, data: { options: Object.values(Aura),  optionGetter: (role: Role) => role.aura } },
];
