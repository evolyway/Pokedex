import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '#components/side-bar';
import { Roles } from '#services/roles';
import { inject } from '@angular/core';
import { getSidebarStructure } from './side-bar-structure';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, SideBar],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit {
	sidebarOpen = signal(true);
	roleService = inject(Roles);
	sidebarData = getSidebarStructure(this.roleService.list);

	ngOnInit() {
		if (typeof window === 'undefined') return;

		this.resetSidebar();
		window.addEventListener('resize', this.resetSidebar.bind(this));
	}

	resetSidebar() {
		this.sidebarOpen.set(window.innerWidth >= 1024);
	}

	toggleSidebar() {
		this.sidebarOpen.update((open) => !open);
	}
}
