import type jsonRole from '#types/jsonRole';
import Camp from '#types/camp';
import Aura from '#types/aura';

const roles: jsonRole[] = [
	{
		"name": "Eterna",
		"camp": Camp.Solitaire,
		"aura": Aura.Neutre,
		"caracteristiques": [
			"À chaque fois qu'un ennemi du village meurt elle absorbe son pouvoir"
		],
		"pouvoirs": {
			"nuit": [
				"À partir du moment où elle aura un pouvoir elle pourra l'utiliser dans l'état où il est, si elle vient a avoir 2 pouvoirs ou plus elle ne pourra pas utiliser le même pouvoir 2 nuits de suite."
			]
		},
		"details": [
			"Toute les caractéristiques du rôle qu'elle utilise sera activée (sauf pour l'accès à des salons), de plus Eterna prendra l'aura du rôle utiliser.\n\nSi Eterna récupère le pouvoir d'un Oni, elle peut en plus tuer une personne de son choix tout en ayant les caractéristiques des Kill Oni.\n\nSi Eterna récupère le pouvoir d'un Perfide, elle peut en plus essayer de deviner le rôle de la personne choisie pour essayer de la tuer tout en ayant les caractéristiques des Kill Perfides."
		],
		"exemples": [
			"Extrabuki est mort je suis Eterna donc j'utilise son pouvoir, donc je peux tuer et je devient invulnérable a l'attaque des onis pour cette nuit, en conséquence mon aura devient Bestiale."
		]
	},
];

export default roles;
