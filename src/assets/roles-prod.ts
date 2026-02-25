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
	{
		"name": "Jibanyan",
		"camp": Camp.Yokai,
		"aura": Aura.Neutre,
		"details":[
			"Jibanyan est un simple Yo-Kai qui ne possède aucuns pouvoirs."
		]
	},
	{
		"name": "Robonyan",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Robonyan peut demander à connaître le rôle d'un joueur, il connaîtra donc son rôle."
			]
		},
		"details": [],
		"exemples": [
			"Je suis Robonyan et je décide de connaître le rôle de Tabuki, je verrai : \"Le rôle de Tabuki est : Jibanyan\" si celui-ci est Jibanyan"
		]
	},
	{
		"name": "Kyubi",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Kyubi peut choisir 3 personnes, et est prévenu si il y a un Oni ou plus parmi ces trois joueurs (Kyubi ne sait pas le nombre d'Onis précisément, il sait juste si il y en a au moins un ou non) "
			]
		},
		"details": [
			"Kyubi n'est pas capable de savoir si il y a des Perfides, Solitaires ou membres de couples avec son pouvoir."
		],
		"exemples": [
			"Je suis Kyubi et je décide de regarder si il y a au moins un Oni entre Tabuki, Ghia et Le Sniper, je verrai : \"Il y a au moins un Oni ou plus parmi cette liste de joueurs\" si Tabuki est Oni et les 2 autres non."
		]
	},
	{
		"name": "Robonyan Ultime",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Une nuit sur deux, Robonyan Ultime peut poser une question fermée au Maitre du Yo-Kai World (Une question fermée est une question à laquelle on ne peut y répondre que par oui ou par non)"
			]
		},
		"details": [],
		"exemples": [
			"Je suis Robonyan Ultime et je demande au Maitre du Yo-Kai World \"Tabuki est-il en couple ?\" Je verrai : \"Oui\" si Tabuki est en couple."
		]
	},
	{
		"name": "Obskyurbi",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Obskyurbi peut choisir 3 personnes, et est prévenu si il y a un Perfide ou plus parmi ces trois joueurs (Obskyurbi ne sait pas le nombre de Perfides précisément, il sait juste si il y en a au moins un ou non)"
			]
		},
		"details": [
			"Obskyurbi n'est pas capable de savoir si il y a des Onis, Solitaires ou membres de couples avec son pouvoir."
		],
		"exemples": [
			"Je suis Obskyurbi et je décide de regarder si il y a au moins un Perfide entre Tabuki, Lace et Le Sniper, je verrai : \"Il y a au moins un Perfide ou plus parmi cette liste de joueurs\" si Tabuki est Perfide et les 2 autres non."
		]
	},
	{
		"name": "Égare-dare",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Égare-dare peut choisir de regarder le dernier message pertinent envoyé dans le salon de son choix. (Les salons privés des joueurs ne peuvent être regardés"
			]
		},
		"details": [
			"Égare-Dare ne peut recevoir que des messages importants, un message comme \"Bonne nuit\" ne lui sera pas envoyé. Si en revanche, aucuns messages n'est importants, un message non-important lui sera envoyé tout de même."
		],
		"exemples": [
			"Je suis Égare-Dare et je veux connaître le dernier message envoyé dans la Terr'heure, je verrai : \"Le dernier message de la Terr'heure est : Donc, on tue Tabuki cette nuit\""
		]
	},
	{
		"name": "Espi",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Espi peut demander à connaître l'aura d'un joueur, il connaîtra donc son aura."
			]
		},
		"details": [
			"Il existe 4 types d'auras différentes ; Radieuse, Obscure, Bestiale et Neutre. Vous pouvez les retrouver sur les fiches de chaque rôle"
		],
		"exemples": [
			"Je suis Espi et je décide de connaître l'aura de Tabuki, je verrai : \"L'aura de Tabuki est : Bestiale\" si celui-ci possède une aura bestiale."
		]
	},
	{
		"name": "Couchtar",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"caracteristiques": [
			"Couchtar peut parler la nuit dans le Yo-Kai World, cependant, tout le monde verra ses messages."
		],
		"pouvoirs": {
			"nuit": [
				"Soit, chaque nuit, Couchtar peut demander à savoir si un joueur a parlé durant la nuit.",
				"Soit, chaque nuit, Couchtar peut demander à connaître le nombre de personnes qui ont parlés la nuit (sans compter les tickets)."
			]
		},
		"details": [
			"Couchtar peut donc décider quel pouvoir il utilise chaque nuit",
			"Couchtar ne connait pas dans quel salon les messages ont étés envoyés.",
			"Couchtar à ses informations au matin.",
			"Parler dans le Yo-Kai World de nuit signifie aussi de montrer à tous son propre rôle."
		],
		"exemples": [
			"Je suis Couchtar et je veux savoir si Tabuki a parlé durant la nuit, je verrai : \"Tabuki a parlé durant la nuit\" si Tabuki a parlé dans New-Yorkai (salon des Komaventuriers)",
			"Je suis Couchtar et je veux savoir combien de personnes ont parlés la nuit, je verrai : \"6 personnes ont parlés pendant la nuit\" si 2 personnes ont parlés dans le Palais Enma, 2 ont parlés dans New-Yorkai, 2 ont parlés dans le salon des Fruitnyan."
		]
	},
	{
		"name": "Robonyan F",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Robonyan F peut demander à connaître tous les pouvoirs qui ont étés effectués depuis le début de la partie sur la personne choisie."
			]
		},
		"details": [],
		"exemples": [
			"Je suis Robonyan F et je décide de connaître les envoûtements qu'à subit Tabuki, je verrai : \"Tabuki a été bloqué, Tabuki a été vampirisé, Tabuki a été protégé des Onis et Tabuki a été regardé par le Robonyan\" si Tabuki a été bloqué, vampirisé, protégé contre les Onis et regardé par le Robonyan."
		]
	},
	{
		"name": "Mog-nyan",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Soit, chaque nuit, il demande à connaître le nombre de personnes qui ont utilisés leurs pouvoirs durant la nuit.",
				"Soit, chaque nuit il peut demander à savoir si une personne en particulier a utilisé son pouvoir et si oui, sur qui il l'a utilisé."
			]
		},
		"details": [
			"Mog-nyan peut donc décider quel pouvoir il utilise chaque nuit",
			"Le kill des Onis, l'exposition des Perfides et le kill des Perfides ne sont pas des pouvoirs.",
			"Le pouvoir utilisé par Mog-Nyan compte dans le nombre de pouvoirs effectués durant la nuit."
		],
		"exemples": [
			"Je suis Mog-Nyan et je demande de savoir combien de joueurs ont effectués leurs actions, je verrai \" 7joueurs ont effectués leurs actions\" si Mog-Nyan, Robonyan, Kyubi, Suprarachnus, Camélia, Laure et Marge ont utilisés leurs pouvoirs. ",
			"Je suis Mog-Nyan et je veux savoir si Tabuki a effectué une action, je verrai : \"Tabuki a effectué une action sur Le Sniper\" si Tabuki est Robonyan et a utilisé son pouvoir sur Le Sniper. "
		]
	},
	{
		"name": "Dr. Néant",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"nuit": [
				"Chaque nuit, Dr. Néant peut inviter la personne morte de son choix dans son ticket durant la nuit."
			]
		},
		"details": [
			"La personne morte invitée dans le ticket garde l'accès aux Lymbes Éternelles pendant ce temps.",
			"Il ne peut pas inviter la même personne 2fois dans la même partie."
		]
	},
	{
		"name": "Mamollina",
		"camp": Camp.Yokai,
		"aura": Aura.Radieuse,
		"pouvoirs": {
			"jour": [
				"Une fois par partie, lors du jour, Mamollina peut choisir d'exposer le rôle de son choix. Le joueur ayant ce rôle sera montré avec 4 autres personnes de la partie dans le salon des annonces (les 5 joueurs exposés sont des joueurs encore en vie)"
			]
		},
		"details": [],
		"exemples": [
			"Je suis Mamollina et je demande de spoiler le rôle de Gargaros, je verrai dans le salon des annonces : \"Gargaros est parmis Tabuki, Ghia, Le Sniper, Lace et Elina\" si Tabuki est Gargaros."
		]
	}
];

export default roles;
