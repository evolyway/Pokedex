import { Component } from '@angular/core';
import { Roles } from '#services/roles';
import { inject } from '@angular/core';
import { getSidebarStructure } from '../../side-bar-structure';

@Component({
	selector: 'app-side-bar',
	imports: [],
	templateUrl: './side-bar.html',
	styleUrl: './side-bar.css',
})
export class SideBar {
	roleService = inject(Roles);
	structure = getSidebarStructure(this.roleService.list);
	JSON = JSON;
}
