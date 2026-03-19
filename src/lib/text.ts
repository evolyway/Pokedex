export function normalize(name: string): string {
	return name
		.toLowerCase()
		.replaceAll(/[- .]/g, '_')
		.replaceAll(/[éèêë]/g, 'e')
		.replaceAll(/[àâä]/g, 'a')
		.replaceAll(/[îï]/g, 'i')
		.replaceAll(/[ôö]/g, 'o')
		.replaceAll(/[ùûü]/g, 'u')
		.replaceAll('ç', 'c')
		.replaceAll(/[^a-z0-9_]/g, '');
}
