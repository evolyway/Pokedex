import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBar, SidebarNodeData } from './side-bar';

import { provideRouter } from '@angular/router';

describe('SideBar', () => {
	let component: SideBar;
	let fixture: ComponentFixture<SideBar>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SideBar],
			providers: [
				provideRouter([]),
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SideBar);
		component = fixture.componentInstance;
		component.structure = {};
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
			const node = new SidebarNodeData('Node4', ['http://example.com', children]);
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
		component.structure = {
			Section1: null,
			Section2: 'http://example.com',
			Section3: { Subsection1: null },
			Section4: ['http://example.com', { Subsection2: null }],
		};
		component.ngOnInit();
		expect(component.entriesData.length).toBe(4);

		expect(component.entriesData[0].name).toBe('Section1');
		expect(component.entriesData[0].entries).toBeNull();

		expect(component.entriesData[1].name).toBe('Section2');
		expect(component.entriesData[1].entries).toBe('http://example.com');

		expect(component.entriesData[2].name).toBe('Section3');
		expect(component.entriesData[2].entries).toEqual({ Subsection1: null });

		expect(component.entriesData[3].name).toBe('Section4');
		expect(component.entriesData[3].entries).toEqual(['http://example.com', { Subsection2: null }]);
	});
});
