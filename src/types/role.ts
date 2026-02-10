import Camp from '#types/camp';
import Aura from '#types/aura';
import type jsonRole from '#types/jsonRole';

export class Role {
	constructor(roleData: jsonRole) {
		this.name = roleData.name;
		this.normalizedName = Role.normalizeName(roleData.name);
		this.camp = roleData.camp;
		this.aura = roleData.aura;
		this.caracteristiques = roleData.caracteristiques ?? [];
		this.pouvoirs = {
			jour: roleData.pouvoirs?.jour ?? [],
			nuit: roleData.pouvoirs?.nuit ?? [],
		};
		this.details = roleData.details;
		this.exemples = roleData.exemples ?? [];
		this.image = roleData.image ?? `roles/${this.normalizedName}.png`;
		this.seeAlso =
			roleData.seeAlso?.map((seeAlso) => ({
				name: seeAlso,
				normalizedName: Role.normalizeName(seeAlso),
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

	static normalizeName(name: string): string {
		return name
			.toLowerCase()
			.replaceAll(/[- ]/g, '_')
			.replaceAll(/[éèêë]/g, 'e')
			.replaceAll(/[àâä]/g, 'a')
			.replaceAll(/[îï]/g, 'i')
			.replaceAll(/[ôö]/g, 'o')
			.replaceAll(/[ùûü]/g, 'u')
			.replaceAll('ç', 'c')
			.replaceAll(/[^a-z0-9_]/g, '');
	}
}
