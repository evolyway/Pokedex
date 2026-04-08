import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingHarness } from '@angular/router/testing';
import { RoleList } from './role-list';
import { provideRouter } from '@angular/router';

import Camps from '#types/camp';
import Aura from '#types/aura';
import { Role } from '#types/role';

describe('CampList', () => {
	async function compileComponents(url = 'camp/oni') {
		await TestBed.configureTestingModule({
			imports: [RoleList],
			providers: [
				provideRouter([
					{ path: 'camp/:name', component: RoleList, data: { options: Object.values(Camps), optionGetter: (role: Role) => role.camp } },
					{ path: 'aura/:name', component: RoleList, data: { options: Object.values(Aura),  optionGetter: (role: Role) => role.aura } },
				]),
			],
		}).compileComponents();

		const harness = await RouterTestingHarness.create();
		const activatComponent = (await harness.navigateByUrl(url)) as RoleList;
		expect(activatComponent).toBeInstanceOf(RoleList);
		const fixture = harness.fixture;
		const compiled = fixture.nativeElement as HTMLElement;
		return { harness, activatComponent, fixture, compiled };
	};

	it('should create', async () => {
		const { fixture } = await compileComponents();
		const componentInstance = fixture.componentInstance;
		expect(componentInstance).toBeTruthy();
	});
});
