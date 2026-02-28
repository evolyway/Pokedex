import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampList } from './camp-list';

describe('CampList', () => {
	let component: CampList;
	let fixture: ComponentFixture<CampList>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CampList],
		}).compileComponents();

		fixture = TestBed.createComponent(CampList);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
