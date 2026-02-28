enum Aura {
	Radieuse = 'Radieuse',
	Neutre = 'Neutre',
	Obscure = 'Obscure',
}
export default Aura;

export function getColor(aura: Aura): string {
	let color: string;
	switch (aura) {
		case Aura.Radieuse:
			color = 'blue';
			break;
		case Aura.Neutre:
			color = 'yellow';
			break;
		case Aura.Obscure:
			color = 'red';
			break;
		default:
			throw new Error(`Unknown aura: ${aura}`);
	}
	return `var(--color-aura-${color})`;
}
