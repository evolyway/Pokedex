import { Component, inject } from '@angular/core';
import Aura, { getColor } from '#types/aura';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { normalize } from '#lib/text';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-aura',
  imports: [],
  templateUrl: './aura.html',
  styleUrl: './aura.css',
})
export class TextAura implements OnInit {
	route = inject(Router);

	@Input() aura!: Aura;
	auraColor = '';

	ngOnInit() {
		this.auraColor = getColor(this.aura);
	}

	redirect() {
		this.route.navigate(['/aura', normalize(this.aura)]);
	}
}
