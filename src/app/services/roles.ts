import { Injectable } from '@angular/core';
import { Role } from '#types/role';
import type jsonRole from '#types/jsonRole';
import RoleList from '#data';

@Injectable({
	providedIn: 'root',
})
export class Roles {
	public list: Role[] = (RoleList as jsonRole[]).map(
		(roleData) => new Role(roleData),
	);
}
