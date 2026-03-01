import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBar } from './side-bar';

import { Roles } from '#services/roles';
import { Role } from '#types/role';
import Camp from '#types/camp';
import Aura from '#types/aura';
import { provideRouter } from '@angular/router';

describe('SideBar', () => {
	let component: SideBar;
	let fixture: ComponentFixture<SideBar>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SideBar],
			providers: [
				provideRouter([]),
				{ provide: Roles, useValue: { list: [
					new Role({ name: 'role1', camp: Camp.Oni, aura: Aura.Neutre }),
					new Role({ name: 'role2', camp: Camp.Yokai, aura: Aura.Radieuse }),
				] } },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SideBar);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
