export function getAllKeyValueCombinations(values: Record<string, string[]>): Record<string, string>[];
export function getAllKeyValueCombinations(values: [string, string[]][]): [string, string][][];
export function getAllKeyValueCombinations(values: Record<string, string[]> | [string, string[]][]): Record<string, string>[] | [string, string][][] {
	if (!Array.isArray(values)) return getAllKeyValueCombinations(Object.entries(values as Record<string, string[]>)).map(Object.fromEntries);

	if (values.length === 0) return [[]];

	const [[firstKey, firstValues], ...rest] = values;
	const combinationsOfRest = getAllKeyValueCombinations(rest);

	return firstValues.flatMap((firstValue) =>
		combinationsOfRest.map((combinationOfRest) => [
			[firstKey, firstValue] as [string, string],
			...combinationOfRest,
		])
	);
}

