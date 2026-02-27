import { Component } from '@angular/core';
import Camp, { getColor } from '#types/camp';
import { Input, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { normalize } from '#lib/text';

@Component({
	selector: 'app-text-camp',
	imports: [],
	templateUrl: './camp.html',
	styleUrl: './camp.css',
})
export class TextCamp implements OnInit {
	route = inject(Router);

	@Input() camp!: Camp;
	campColor = '';

	ngOnInit() {
		this.campColor = getColor(this.camp);
	}

	redirect() {
		this.route.navigate(['/camp', normalize(this.camp)]);
	}
}
