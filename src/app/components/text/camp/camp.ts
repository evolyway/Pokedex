import { Component } from '@angular/core';
import Camp, { getColor } from '#types/camp';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
	selector: 'app-text-camp',
	imports: [],
	templateUrl: './camp.html',
	styleUrl: './camp.css',
})
export class TextCamp implements OnInit {
	@Input() camp!: Camp;
	campColor = '';

	ngOnInit() {
		this.campColor = getColor(this.camp);
	}
}
