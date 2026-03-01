import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';

import { provideRouter } from '@angular/router';
import { RoleDetails } from './role-details';
import { Roles } from '#services/roles';

import { Role } from '#types/role';
import Camp from '#types/camp';
import Aura from '#types/aura';

describe('RoleDetails', () => {
	let harness: RouterTestingHarness;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RoleDetails],
			providers: [
				provideRouter([{ path: 'roles/:name', component: RoleDetails }]),
				{ provide: Roles, useValue: { list: [] }}
			]
		}).compileComponents();
		harness = await RouterTestingHarness.create();
	});

	it.concurrent('should create', () => {
		const fixture = TestBed.createComponent(RoleDetails);
		const componentInstance = fixture.componentInstance;
		expect(componentInstance).toBeTruthy();
	});

	it('should show "Role not found" if role does not exist', async () => {
		const activeComponent = await harness.navigateByUrl('/roles/nonexistent') as RoleDetails;
		const compiled = harness.fixture.nativeElement as HTMLElement;
		expect(activeComponent).toBeInstanceOf(RoleDetails);
		expect(activeComponent.role()).toBeUndefined();
		expect(compiled.textContent).toContain('Rôle non trouvé.');
	});
});
