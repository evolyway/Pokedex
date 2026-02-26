import { Component } from '@angular/core';
import Aura, { getColor } from '#types/aura';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-text-aura',
  imports: [],
  templateUrl: './aura.html',
  styleUrl: './aura.css',
})
export class TextAura implements OnInit {
	@Input() aura!: Aura;
	auraColor = '';

	ngOnInit() {
		this.auraColor = getColor(this.aura);
	}
}
