import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Roles } from '#services/roles';
import Camp from '#types/camp';
import { normalize } from '#lib/text';
import { Role } from '#types/role';

@Component({
	selector: 'app-camp-list',
	imports: [],
	templateUrl: './camp-list.html',
	styleUrl: './camp-list.css',
})
export class CampList implements OnInit {
	private route = inject(ActivatedRoute);
	roleService = inject(Roles);
	private _roles: WritableSignal<Role[]> = signal([]);
	public roles = this._roles.asReadonly();

	ngOnInit() {
		this.route.params.subscribe((params) => {
			const name = params['name'];
			const camp = Object.values(Camp).find((camp) => normalize(camp) === name);
			const roles = this.roleService.list.filter((role) => role.camp === camp);
			this._roles.set(roles);
		});
	}
}
