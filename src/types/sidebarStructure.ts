// { "page1": "path/to/page1", "group1": { "page2": "path/to/page2" }, "group2": [ "path/to/group2page", { "page3": "path/to/page3" } ] }
export type SidebarNode = null | string | SidebarTree | [string, SidebarTree];
export interface SidebarTree {
	[key: string]: SidebarNode;
}
