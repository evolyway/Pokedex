import { Component } from '@angular/core';
import { Roles } from '#services/roles';
import { inject } from '@angular/core';
import { getSidebarStructure } from '../../side-bar-structure';
import { SideBarEntries } from './entries/entries';
import { SidebarTree, SidebarNode } from '#types/sidebarStructure';

@Component({
	selector: 'app-side-bar',
	imports: [SideBarEntries],
	templateUrl: './side-bar.html',
	styleUrl: './side-bar.css',
})
export class SideBar {
	roleService = inject(Roles);
	structure: SidebarTree = getSidebarStructure(this.roleService.list);
	structureEntries: [string, SidebarNode][] = Object.entries(this.structure);
}
