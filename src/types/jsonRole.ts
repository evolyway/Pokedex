import Camp from '#types/camp';
import Aura from '#types/aura';

interface Role {
	name: string;
	camp: Camp;
	aura: Aura;
	caracteristiques?: string[];
	pouvoirs?: {
		jour?: string[];
		nuit?: string[];
	};
	details?: string[];
	exemples?: string[];
	image?: string;
	seeAlso?: string[];
}
export default Role;
