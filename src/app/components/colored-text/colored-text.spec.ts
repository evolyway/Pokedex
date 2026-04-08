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
		fixture.componentRef.setInput('value', 'test');
		fixture.componentRef.setInput('getColor', (value: string) => `color-${value}`);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
