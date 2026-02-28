import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { normalize } from '#lib/text';
import { Router } from '@angular/router';
import Camp, { getColor as getCampColor } from '#types/camp';
import Aura, { getColor as getAuraColor } from '#types/aura';

@Component({
	selector: 'app-colored-text',
	imports: [],
	templateUrl: './colored-text.html',
	styleUrl: './colored-text.css',
})
export class ColoredText<T extends string> {
	route = inject(Router);

	@Input() value!: T;
	@Input() getColor!: (value: T) => string;
	@Input() routerLink?: string[];

	redirect() {
		if (!this.routerLink) return;
		this.route.navigate([...this.routerLink, normalize(this.value)]);
	}
}

// camp color text = ColoredText<Camp> { getColor: getCampColor, routerLink: ['/camp'] }
@Component({
	selector: 'app-camp-colored-text',
	imports: [],
	templateUrl: './colored-text.html',
	styleUrl: './colored-text.css',
})
export class CampColoredText extends ColoredText<Camp> {
	override getColor = getCampColor;
	override routerLink = ['/camp'];
}

// aura color text = ColoredText<Aura> { getColor: getAuraColor, routerLink: ['/aura'] }
@Component({
	selector: 'app-aura-colored-text',
	imports: [],
	templateUrl: './colored-text.html',
	styleUrl: './colored-text.css',
})
export class AuraColoredText extends ColoredText<Aura> {
	override getColor = getAuraColor;
	override routerLink = ['/aura'];
}
