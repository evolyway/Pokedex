enum Camp {
	Yokai = 'Yo-Kai',
	Oni = 'Oni',
	Perfid = 'Perfid',
	Solitaire = 'Solitaire',
	Special = 'Special',
}
export default Camp;

export function getColor(camp: Camp): string {
	let color: string;
	switch (camp) {
		case Camp.Yokai:
			color = 'green';
			break;
		case Camp.Oni:
			color = 'pink';
			break;
		case Camp.Perfid:
			color = 'purple';
			break;
		case Camp.Solitaire:
			color = 'blue';
			break;
		case Camp.Special:
			color = 'yellow';
			break;
		default:
			throw new Error(`Unknown camp: ${camp}`);
	}
	return `var(--color-camp-${color})`;
}
