import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [App],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should toggle the sidebar on button click', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app.sidebarOpen()).toBe(false);
		const button = fixture.nativeElement.querySelector('header button');
		button.click();
		expect(app.sidebarOpen()).toBe(true);
		button.click();
		expect(app.sidebarOpen()).toBe(false);
	});
});
