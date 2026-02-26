enum Aura {
	Radieuse = 'Radieuse',
	Neutre = 'Neutre',
	Obscure = 'Obscure',
}
export default Aura;

export function getColor(aura: Aura): string {
	switch (aura) {
		case Aura.Radieuse:
			return 'blue';
		case Aura.Neutre:
			return 'yellow';
		case Aura.Obscure:
			return 'red';
		default:
			throw new Error(`Unknown aura: ${aura}`);
	}
}
