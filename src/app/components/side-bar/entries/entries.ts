import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { SidebarNode } from '#types/sidebarStructure';
import { OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
	selector: 'app-side-bar-entries',
	imports: [RouterModule],
	templateUrl: './entries.html',
	styleUrl: './entries.css',
})
export class SideBarEntries implements OnInit {
	@Input() entries!: [string, SidebarNode][];
	entriesData!: SidebarNodeData[];

	ngOnInit() {
		this.entriesData = this.entries.map(([name, entry]) => new SidebarNodeData(name, entry));
	}
}

class SidebarNodeData {
	name!: string;
	entries!: SidebarNode;
	link?: string;
	children?: [ string, SidebarNode ][];

	constructor(name: string, entries: SidebarNode) {
		this.name = name;
		this.entries = entries;

		if (typeof entries === 'string') {
			this.link = entries;
		} else if (entries instanceof Array) {
			this.link = entries[0];
			this.children = Object.entries(entries[1]);
		} else {
			this.children = Object.entries(entries);
		}
	}
}
