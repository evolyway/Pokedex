enum Camp {
	Yokai = 'Yo-Kai',
	Oni = 'Oni',
	Perfid = 'Perfid',
	Solitaire = 'Solitaire',
	Special = 'Special',
}
export default Camp;

export function getColor(camp: Camp): string {
	switch (camp) {
		case Camp.Yokai:
			return 'green';
		case Camp.Oni:
			return 'pink';
		case Camp.Perfid:
			return 'purple';
		case Camp.Solitaire:
			return 'blue';
		case Camp.Special:
			return 'yellow';
		default:
			throw new Error(`Unknown camp: ${camp}`);
	}
}
