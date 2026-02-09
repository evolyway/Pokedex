import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '#components/side-bar';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, SideBar],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {}
