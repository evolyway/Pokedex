import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';

import { provideRouter } from '@angular/router';
import { RoleDetails } from './role-details';
import { Roles } from '#services/roles';

import { Role } from '#types/role';
import Camp from '#types/camp';
import Aura from '#types/aura';

describe('RoleDetails', () => {
	async function compileComponents(url = '/role/', roles: Role[] = []) {
		await TestBed.configureTestingModule({
			imports: [RoleDetails],
			providers: [
				provideRouter([{ path: 'role/:name', component: RoleDetails }]),
				{ provide: Roles, useValue: { list: roles } },
			],
		}).compileComponents();
		const harness = await RouterTestingHarness.create();
		const activeComponent = (await harness.navigateByUrl(
			url,
		)) as RoleDetails;
		expect(activeComponent).toBeInstanceOf(RoleDetails);
		const fixture = harness.fixture;
		const compiled = fixture.nativeElement as HTMLElement;
		return { harness, activeComponent, fixture, compiled };
	}

	it('should create', async () => {
		const { fixture } = await compileComponents();
		const componentInstance = fixture.componentInstance;
		expect(componentInstance).toBeTruthy();
	});

	it('should show "Role not found" if role does not exist', async () => {
		const { activeComponent, compiled } =
			await compileComponents('/role/nonexistent');
		expect(activeComponent).toBeInstanceOf(RoleDetails);
		expect(activeComponent.role()).toBeUndefined();
		expect(compiled.textContent).toContain('Rôle non trouvé');
	});

	it('should show role details if role exists', async () => {
		const { activeComponent, compiled } = await compileComponents(
			'/role/example',
			[
				new Role({
					name: 'example',
					camp: Camp.Oni,
					aura: Aura.Neutre,
				}),
			],
		);
		expect(activeComponent).toBeInstanceOf(RoleDetails);
		expect(activeComponent.role()).not.toBeUndefined();
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
	});

	describe('generated description sentences', () => {
		async function getDescriptionSentences(role: Role) {
			const { compiled } = await compileComponents(`/role/${role.name}`, [
				role,
			]);
			expect(compiled.textContent).not.toContain('Rôle non trouvé');
			const descriptionElement = compiled.querySelector('em');
			expect(descriptionElement).not.toBeNull();
			return descriptionElement!
				.textContent!.replaceAll(/\s+/g, ' ')
				.trim();
		}

		it('role without anything', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle sans caractéristiques ni pouvoirs',
			);
		});

		it('role with 1 characteristic', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				caracteristiques: ['caractéristique1'],
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle avec une caractéristique',
			);
		});

		it('role with multiple characteristics', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				caracteristiques: ['caractéristique1', 'caractéristique2'],
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle avec des caractéristiques',
			);
		});

		it('role with 1 power', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				pouvoirs: {
					jour: ['pouvoir1'],
				},
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe('test est un rôle avec un pouvoir');
		});

		it('role with multiple powers', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				pouvoirs: {
					jour: ['pouvoir1', 'pouvoir2'],
				},
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe('test est un rôle avec des pouvoirs');
		});

		it('role with 1 characteristic and 1 power', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				caracteristiques: ['caractéristique1'],
				pouvoirs: {
					jour: ['pouvoir1'],
				},
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle avec une caractéristique et un pouvoir',
			);
		});

		it('role with multiple characteristics and multiple powers', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				caracteristiques: ['caractéristique1', 'caractéristique2'],
				pouvoirs: {
					jour: ['pouvoir1', 'pouvoir2'],
				},
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle avec des caractéristiques et des pouvoirs',
			);
		});

		it('role with 1 characteristic and multiple powers', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				caracteristiques: ['caractéristique1'],
				pouvoirs: {
					jour: ['pouvoir1', 'pouvoir2'],
				},
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle avec une caractéristique et des pouvoirs',
			);
		});

		it('role with multiple characteristics and 1 power', async () => {
			const role = new Role({
				name: 'test',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				caracteristiques: ['caractéristique1', 'caractéristique2'],
				pouvoirs: {
					jour: ['pouvoir1'],
				},
			});
			const description = await getDescriptionSentences(role);
			expect(description).toBe(
				'test est un rôle avec des caractéristiques et un pouvoir',
			);
		});
	});

	it('description table should have correct characteristics and powers', async () => {
		const role = new Role({
			name: 'test',
			camp: Camp.Oni,
			aura: Aura.Neutre,
			caracteristiques: ['caractéristique1', 'caractéristique2'],
			pouvoirs: {
				jour: ['pouvoir de jour 1', 'pouvoir de jour 2'],
				nuit: ['pouvoir de nuit 1', 'pouvoir de nuit 2'],
			},
		});
		const { compiled } = await compileComponents(`/role/${role.name}`, [
			role,
		]);
		expect(compiled.textContent).not.toContain('Rôle non trouvé');

		const descriptionRows = Array.from(
			compiled.querySelectorAll('table tr'),
		).map((row) =>
			Array.from(row.querySelectorAll('td')).map(
				(cell) => cell.textContent?.trim() || '',
			),
		);
		expect(descriptionRows.length).toBe(6); // 2 characteristic + 2 day powers + 2 night powers
		expect(
			descriptionRows.every((cells) => cells.length === 2),
		).toBeTruthy();

		expect(descriptionRows[0][0]).toBe('Caractéristique :');
		expect(descriptionRows[0][1]).toBe('caractéristique1');
		expect(descriptionRows[1][0]).toBe('Caractéristique :');
		expect(descriptionRows[1][1]).toBe('caractéristique2');
		expect(descriptionRows[2][0]).toBe('Pouvoir de jour :');
		expect(descriptionRows[2][1]).toBe('pouvoir de jour 1');
		expect(descriptionRows[3][0]).toBe('Pouvoir de jour :');
		expect(descriptionRows[3][1]).toBe('pouvoir de jour 2');
		expect(descriptionRows[4][0]).toBe('Pouvoir de nuit :');
		expect(descriptionRows[4][1]).toBe('pouvoir de nuit 1');
		expect(descriptionRows[5][0]).toBe('Pouvoir de nuit :');
		expect(descriptionRows[5][1]).toBe('pouvoir de nuit 2');
	});

	it('should update role details when navigating to another role', async () => {
		const roles = [
			new Role({
				name: 'role1',
				camp: Camp.Oni,
				aura: Aura.Neutre,
			}),
			new Role({
				name: 'role2',
				camp: Camp.Oni,
				aura: Aura.Neutre,
			}),
		];
		const { harness, compiled } = await compileComponents(
			'/role/role1',
			roles,
		);
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
		expect(compiled.textContent).toContain('role1');
		expect(compiled.textContent).not.toContain('role2');

		await harness.navigateByUrl('/role/role2');
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
		expect(compiled.textContent).toContain('role2');
		expect(compiled.textContent).not.toContain('role1');
	});

	it('should show details if any', async () => {
		const role = new Role({
			name: 'test',
			camp: Camp.Oni,
			aura: Aura.Neutre,
			details: ['detail1', 'detail2'],
		});
		const { compiled } = await compileComponents(`/role/${role.name}`, [
			role,
		]);
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
		expect(compiled.textContent).toContain('detail1');
		expect(compiled.textContent).toContain('detail2');
	});

	it('should show examples if any', async () => {
		const role = new Role({
			name: 'test',
			camp: Camp.Oni,
			aura: Aura.Neutre,
			exemples: ['exemple1', 'exemple2'],
		});
		const { compiled } = await compileComponents(`/role/${role.name}`, [
			role,
		]);
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
		const exemplesElement = Array.from(compiled.querySelectorAll('em'));
		expect(exemplesElement.length).toBeGreaterThan(1);
		expect(
			exemplesElement.some((el) => el.textContent?.includes('exemple1')),
		).toBeTruthy();
		expect(
			exemplesElement.some((el) => el.textContent?.includes('exemple2')),
		).toBeTruthy();
	});

	it('should redirect when clicking any see also role', async () => {
		const roles = [
			new Role({
				name: 'role1',
				camp: Camp.Oni,
				aura: Aura.Neutre,
				seeAlso: ['role2'],
			}),
			new Role({
				name: 'role2',
				camp: Camp.Oni,
				aura: Aura.Neutre,
			}),
		];
		const { fixture, compiled } = await compileComponents(
			'/role/role1',
			roles,
		);
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
		const seeAlsoLink = compiled.querySelector('a');
		expect(seeAlsoLink).not.toBeNull();
		expect(seeAlsoLink?.textContent).toBe('role2');

		seeAlsoLink?.dispatchEvent(new MouseEvent('click'));
		await fixture.whenStable();
		fixture.detectChanges();
		expect(compiled.textContent).not.toContain('Rôle non trouvé');
		expect(compiled.textContent).toContain('role2');
		expect(compiled.textContent).not.toContain('role1');
	});
});
