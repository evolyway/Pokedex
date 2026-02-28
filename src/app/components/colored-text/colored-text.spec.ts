import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredText } from './colored-text';

describe('ColoredText', () => {
	let component: ColoredText<string>;
	let fixture: ComponentFixture<ColoredText<string>>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ColoredText],
		}).compileComponents();

		fixture = TestBed.createComponent(ColoredText);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
