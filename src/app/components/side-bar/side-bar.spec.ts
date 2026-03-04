import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBar, SidebarNodeData } from './side-bar';

import { provideRouter } from '@angular/router';

describe('SideBar', () => {
	let component: SideBar;
	let fixture: ComponentFixture<SideBar>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SideBar],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(SideBar);
		fixture.componentRef.setInput('structure', {});
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('SidebarNodeData', () => {
		it('with no link and no children', () => {
			const node = new SidebarNodeData('Node1', null);
			expect(node.name).toBe('Node1');
			expect(node.entries).toBeNull();
			expect(node.link).toBeUndefined();
			expect(node.group).toBeUndefined();
		});

		it('with a link', () => {
			const node = new SidebarNodeData('Node2', 'http://example.com');
			expect(node.name).toBe('Node2');
			expect(node.entries).toBe('http://example.com');
			expect(node.link).toBe('http://example.com');
			expect(node.group).toBeUndefined();
		});

		it('with children and no link', () => {
			const children = { Child1: null };
			const node = new SidebarNodeData('Node3', children);
			expect(node.name).toBe('Node3');
			expect(node.entries).toEqual(children);
			expect(node.link).toBeUndefined();
			expect(node.group).toBeDefined();
			expect(node.group!.children).toEqual(children);
			const initialCollapsed = node.group!.collapsed;
			node.group!.toggle();
			expect(node.group!.collapsed).toBe(!initialCollapsed);
		});

		it('with children and a link', () => {
			const children = { Child2: null };
			const node = new SidebarNodeData('Node4', [
				'http://example.com',
				children,
			]);
			expect(node.name).toBe('Node4');
			expect(node.entries).toEqual(['http://example.com', children]);
			expect(node.link).toBe('http://example.com');
			expect(node.group).toBeDefined();
			expect(node.group!.children).toEqual(children);
			const initialCollapsed = node.group!.collapsed;
			node.group!.toggle();
			expect(node.group!.collapsed).toBe(!initialCollapsed);
		});
	});

	it('should initialize entriesData with the correct structure', () => {
		fixture.componentRef.setInput('structure', {
			Section1: null,
			Section2: 'http://example.com',
			Section3: { Subsection1: null },
			Section4: ['http://example.com', { Subsection2: null }],
		});
		const entriesData = component.entriesData();

		expect(entriesData.length).toBe(4);

		expect(entriesData[0].name).toBe('Section1');
		expect(entriesData[0].entries).toBeNull();

		expect(entriesData[1].name).toBe('Section2');
		expect(entriesData[1].entries).toBe('http://example.com');

		expect(entriesData[2].name).toBe('Section3');
		expect(entriesData[2].entries).toEqual({ Subsection1: null });

		expect(entriesData[3].name).toBe('Section4');
		expect(entriesData[3].entries).toEqual([
			'http://example.com',
			{ Subsection2: null },
		]);
	});

	it('should create the nested structure correctly', async () => {
		fixture.componentRef.setInput('structure', {
			Section: {
				Subsection: '/example',
			},
		});
		fixture.detectChanges();

		const entriesData = component.entriesData();

		// entriesData
		expect(entriesData.length).toBe(1);
		const section = entriesData[0];
		expect(section.name).toBe('Section');
		expect(section.entries).toEqual({ Subsection: '/example' });
		expect(section.group).toBeDefined();
		expect(section.group!.children).toEqual({ Subsection: '/example' });

		// html
		const compiled = fixture.nativeElement as HTMLElement;
		const parent = compiled.querySelector('nav');
		expect(parent).toBeTruthy();
		expect(parent!.textContent).toContain('Section');
		const child = parent!.querySelector('nav nav');
		expect(child).toBeTruthy();
		expect(child!.textContent).toContain('Subsection');
		expect(child!.textContent).not.toContain('Section');
		const link = child!.querySelector('a');
		expect(link).toBeTruthy();
		expect(link!.getAttribute('href')).toBe('/example');
	});

	it('should toggle group collapsed state when toggle is called', () => {
		fixture.componentRef.setInput('structure', {
			Section: {
				Subsection: null,
			},
		});
		fixture.componentRef.setInput('openDepth', 1);
		fixture.detectChanges();

		const entriesData = component.entriesData();
		const section = entriesData[0];
		const button = fixture.nativeElement.querySelector('button');
		expect(button).toBeTruthy();
		expect(section.group).toBeDefined();
		expect(section.group!.collapsed).toBe(false);
		button.click();
		expect(section.group!.collapsed).toBe(true);
		button.click();
		expect(section.group!.collapsed).toBe(false);
	});

	describe('render all types of entries', () => {
		it('should render null entry', () => {
			fixture.componentRef.setInput('structure', {
				NullEntry: null,
			});
			fixture.detectChanges();
			const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.textContent).toContain('NullEntry');
			expect(compiled.querySelector('button')).toBeNull(); // No group
			expect(compiled.querySelector('a')).toBeNull(); // No link
		});

		it('should render link entry', () => {
			fixture.componentRef.setInput('structure', {
				LinkEntry: '/example',
			});
			fixture.detectChanges();
			const compiled = fixture.nativeElement as HTMLElement;
			expect(compiled.querySelector('button')).toBeNull(); // No group
			const link = compiled.querySelector('a');
			expect(link).toBeTruthy();
			expect(link!.getAttribute('href')).toBe('/example');
			expect(link!.textContent).toContain('LinkEntry');
		});

		it('should render group entry', () => {
			fixture.componentRef.setInput('structure', {
				GroupEntry: {
					SubEntry: null,
				},
			});
			fixture.detectChanges();
			const compiled = fixture.nativeElement as HTMLElement;
			const button = compiled.querySelector('button');
			expect(button).toBeTruthy();
			expect(button!.textContent).toContain('GroupEntry');
			expect(compiled.querySelector('a')).toBeNull(); // No link
			const child = compiled.querySelector('nav nav');
			expect(child).toBeTruthy();
			expect(child!.textContent).toContain('SubEntry');
		});

		it('should render group with link entry', () => {
			fixture.componentRef.setInput('structure', {
				GroupWithLink: ['/example', { SubEntry: null }],
			});
			fixture.detectChanges();
			const compiled = fixture.nativeElement as HTMLElement;
			const button = compiled.querySelector('button');
			expect(button).toBeTruthy();
			const link = button!.querySelector('a');
			expect(link).toBeTruthy();
			expect(link!.getAttribute('href')).toBe('/example');
			expect(link!.textContent).toContain('GroupWithLink');
			const child = compiled.querySelector('nav nav');
			expect(child).toBeTruthy();
			expect(child!.textContent).toContain('SubEntry');
		});
	});
});
