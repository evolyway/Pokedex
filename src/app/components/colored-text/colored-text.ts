import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { normalize } from '#lib/text';
import { Router } from '@angular/router';

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
