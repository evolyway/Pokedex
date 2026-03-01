import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';

import { provideRouter } from '@angular/router';
import { RoleDetails } from './role-details';
import { Roles } from '#services/roles';

import { Role } from '#types/role';
import Camp from '#types/camp';
import Aura from '#types/aura';

describe('RoleDetails', () => {
	async function compileComponents(url: string = '/', roles: Role[] = []) {
		await TestBed.configureTestingModule({
			imports: [RoleDetails],
			providers: [
				provideRouter([{ path: 'roles/:name', component: RoleDetails }]),
				{ provide: Roles, useValue: { list: roles }}
			]
		}).compileComponents();
		const harness = await RouterTestingHarness.create();
		const activeComponent = await harness.navigateByUrl(url) as RoleDetails;
		const fixture = harness.fixture;
		const compiled = fixture.nativeElement as HTMLElement;
		return { harness, activeComponent, fixture, compiled };
	}

	it.concurrent('should create', async () => {
		await compileComponents();
		const fixture = TestBed.createComponent(RoleDetails);
		const componentInstance = fixture.componentInstance;
		expect(componentInstance).toBeTruthy();
	});

	it('should show "Role not found" if role does not exist', async () => {
		const { activeComponent, compiled } = await compileComponents('/roles/nonexistent');
		expect(activeComponent).toBeInstanceOf(RoleDetails);
		expect(activeComponent.role()).toBeUndefined();
		expect(compiled.textContent).toContain('Rôle non trouvé.');
	});

	it('should show role details if role exists', async () => {
		const { activeComponent, compiled } = await compileComponents('/roles/example', [
			new Role({
				name: 'example',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				details: [],
			})
		]);
		expect(activeComponent).toBeInstanceOf(RoleDetails);
		expect(activeComponent.role).not.toBeUndefined();
		expect(compiled.textContent).not.toContain('Rôle non trouvé.');
	});

	describe('generated description sentences', () => {
		async function getDescriptionSentences(role: Role) {
			const { compiled } = await compileComponents(`/roles/${role.name}`, [role]);
			expect(compiled.textContent).not.toBe('Rôle non trouvé.');
			const descriptionElement = compiled.querySelector('em');
			expect(descriptionElement).not.toBeNull();
			return descriptionElement!.textContent!.replaceAll(/\s+/g, ' ').trim();
		}

		it('role without anything', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				details: [],
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe('test est un rôle sans caractéristiques ni pouvoirs.');
		});
	});
});
