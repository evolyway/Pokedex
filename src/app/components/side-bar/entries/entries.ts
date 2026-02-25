import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { SidebarNode } from '#types/sidebarStructure';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-side-bar-entries',
	imports: [RouterModule],
	templateUrl: './entries.html',
	styleUrl: './entries.css',
})
export class SideBarEntries implements OnInit {
	@Input() entries!: [string, SidebarNode][];
	entriesData: SidebarNodeData[] = [];

	ngOnInit() {
		this.entriesData = this.entries.map(
			([name, entry]) => new SidebarNodeData(name, entry),
		);
	}
}

class SidebarNodeData {
	name!: string;
	entries!: SidebarNode;
	link?: string;
	group?: {
		children: [string, SidebarNode][];
		collapsed: boolean;
		toggle: () => void;
	};

	constructor(name: string, entries: SidebarNode) {
		this.name = name;
		this.entries = entries;

		if (entries === null) {
			// visible non-clickable line
		} else if (typeof entries === 'string') {
			// link
			this.link = entries;
		} else {
			// groups
			let children: [string, SidebarNode][];
			if (entries instanceof Array) {
				// with link
				this.link = entries[0];
				children = Object.entries(entries[1]);
			} else {
				// without link
				children = Object.entries(entries);
			}
			this.group = {
				children,
				collapsed: children.length >= 5,
				toggle: () => {
					this.group!.collapsed = !this.group!.collapsed;
				},
			};
		}
	}
}
