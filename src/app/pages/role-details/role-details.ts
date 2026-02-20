import { ActivatedRoute } from '@angular/router';
import { Component, inject, WritableSignal, signal } from '@angular/core';
import { Roles } from '#services/roles';
import type { Role } from '#types/role';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-role-details',
	imports: [RouterModule],
	templateUrl: './role-details.html',
	styleUrl: './role-details.css',
})
export class RoleDetails {
	private route = inject(ActivatedRoute);
	private readonly _role: WritableSignal<Role | undefined> = signal(undefined);
	public readonly role = this._role.asReadonly();
	roleService = inject(Roles);
	protected descriptions: { type: string; text: string }[] = [];

	ngOnInit() {
		this.route.params.subscribe((params) => {
			const name = params['name'];
			const role = this.roleService.list.find((role) => role.normalizedName === name);
			this._role.set(role);
			if (!role) return;
			this.descriptions = [
				...role.caracteristiques.map((carac) => ({
					type: 'Caractéristique',
					text: carac,
				})),
				...role.pouvoirs.jour.map((pouvoir) => ({
					type: 'Pouvoir de jour',
					text: pouvoir,
				})),
				...role.pouvoirs.nuit.map((pouvoir) => ({
					type: 'Pouvoir de nuit',
					text: pouvoir,
				})),
			];
		});
	}
}
