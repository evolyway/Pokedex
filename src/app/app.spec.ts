import { TestBed } from '@angular/core/testing';
import { App } from './app';

import { Roles } from '#services/roles';

describe('App', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [App],
			providers: [
				{ provide: Roles, useValue: { list: [] } },
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
