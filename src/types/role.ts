import type Camp from '#types/camp';
import type Aura from '#types/aura';
import type jsonRole from '#types/jsonRole';
import { normalize } from '#lib/text';

export class Role {
	/* v8 ignore next */
	constructor(roleData: jsonRole) {
		this.name = roleData.name;
		this.normalizedName = normalize(roleData.name);
		this.camp = roleData.camp;
		this.aura = roleData.aura;
		this.caracteristiques = roleData.caracteristiques ?? [];
		this.pouvoirs = {
			jour: roleData.pouvoirs?.jour ?? [],
			nuit: roleData.pouvoirs?.nuit ?? [],
		};
		this.details = roleData.details ?? [];
		this.exemples = roleData.exemples ?? [];
		this.image = roleData.image ?? `roles/${this.normalizedName}.png`;
		this.seeAlso =
			roleData.seeAlso?.map((seeAlso) => ({
				name: seeAlso,
				normalizedName: normalize(seeAlso),
			})) ?? [];
	}
	name: string;
	camp: Camp;
	aura: Aura;
	caracteristiques: string[];
	pouvoirs: {
		jour: string[];
		nuit: string[];
	};
	details: string[];
	exemples: string[];
	image: string;
	seeAlso: {
		name: string;
		normalizedName: string;
	}[];

	normalizedName: string;
}
