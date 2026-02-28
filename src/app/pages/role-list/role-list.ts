import {
	Component,
	Input,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { Roles } from '#services/roles';
import { normalize } from '#lib/text';
import { Role } from '#types/role';

@Component({
	selector: 'app-role-list',
	imports: [RouterModule],
	templateUrl: './role-list.html',
	styleUrl: './role-list.css',
})
export class RoleList implements OnInit {
	private route = inject(ActivatedRoute);
	roleService = inject(Roles);
	private _roles: WritableSignal<Role[]> = signal([]);
	public roles = this._roles.asReadonly();

	ngOnInit() {
		const options = this.route.snapshot.data['options'] as string[];
		const optionGetter = this.route.snapshot.data['optionGetter'] as (
			role: Role,
		) => string;

		this.route.params.subscribe((params) => {
			const name = params['name'];
			const option = options.find((option) => normalize(option) === name);
			const roles = this.roleService.list.filter(
				(role) => optionGetter(role) === option,
			);
			this._roles.set(roles);
		});
	}
}
