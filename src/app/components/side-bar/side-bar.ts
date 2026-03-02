import { Component, Input, OnInit } from '@angular/core';
import { SidebarNode, SidebarTree } from '#types/sidebarStructure';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-side-bar',
	imports: [RouterModule],
	templateUrl: './side-bar.html',
	styleUrl: './side-bar.css',
})
export class SideBar implements OnInit {
	@Input() structure!: SidebarTree;
	@Input() openDepth: number = 0;
	entriesData: SidebarNodeData[] = [];

	ngOnInit() {
		this.entriesData = Object.entries(this.structure).map(
			([name, entry]) =>
				new SidebarNodeData(name, entry, this.openDepth <= 0),
		);
	}
}

class SidebarNodeData {
	name!: string;
	entries!: SidebarNode;
	link?: string;
	group?: {
		children: SidebarTree;
		collapsed: boolean;
		toggle: () => void;
	};

	constructor(name: string, entries: SidebarNode, collapsed = true) {
		this.name = name;
		this.entries = entries;

		if (entries === null) {
			// visible non-clickable line
		} else if (typeof entries === 'string') {
			// link
			this.link = entries;
		} else {
			// groups
			let children: SidebarTree;
			if (entries instanceof Array) {
				// with link
				this.link = entries[0];
				children = entries[1];
			} else {
				// without link
				children = entries;
			}
			this.group = {
				children,
				collapsed,
				toggle: () => {
					this.group!.collapsed = !this.group!.collapsed;
				},
			};
		}
	}
}
