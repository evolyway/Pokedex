import { normalize } from '#lib/text';

describe('lib', () => {
	describe('text', () => {
		describe('normalize', () => {
			test.each([
				['éèêë', 'eeee'],
				['àâä', 'aaa'],
				['îï', 'ii'],
				['ôö', 'oo'],
				['ùûü', 'uuu'],
				['ç', 'c'],
			])('should normalize "%s" to "%s"', (input, expected) => {
				expect(normalize(input)).toBe(expected);
			});

			test.each([
				['role name', 'role_name'],
				['role-name', 'role_name'],
				['role.name', 'role_name'],
				['role@name', 'rolename'],
				['role#name', 'rolename'],
			])('should normalize "%s" to "%s"', (input, expected) => {
				expect(normalize(input)).toBe(expected);
			});

			it('should cast to lowercase', () => {
				expect(normalize('RoLeNaMe')).toBe('rolename');
			});
		});
	});
});

