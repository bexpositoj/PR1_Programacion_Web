
///////////////////////////////////////////////////////////////////////////////
//		Benjamín Expósito Jaramillo                                          //
//		TIDM Programación web (UOC)                                          //
//		PR 1 - Noviembre de 2025                                             //
//		URL - https://bexpositoj.github.io/PR1_Funciones_y_clases/           //
//		GITHUB - https://github.com/bexpositoj/PR1_Funciones_y_clases        //
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// 1. Creación de la clase Pokemon, que representa a un objeto Pokemon //
/////////////////////////////////////////////////////////////////////////


// Definición de la clase Pokemon.
class Pokemon {
	constructor( { id, name, description, height, weight, baseExperience, abilities, types, sprites, stats } ){
		this.id = id;
		this.name = name;
		this.description = description;
		this.height = height;
		this.weight = weight;
		this.baseExperience = baseExperience;
		this.abilities = abilities;
		this.types = types;
		this.sprites = sprites;
		this.stats = stats;
	}

	/////////////////////
	// === Getters === //
	/////////////////////
	
	get ID() { return this.id;	}
	get Name() { return this.name; }
	get Description() { return this.description; }
	get Height() { return this.height; }
	get Weight() { return this.weight; }
	get BaseExperience() { return this.baseExperience; }
	get Abilities() { return this.abilities; }
	get Types() { return this.types; }
	get Sprites() { return this.sprites; }
	get Stats() { return this.stats; }
	
	/////////////////////
	// === Setters === //
	/////////////////////
	
	set ID( idPokemon ) { this.id = idPokemon; }
	set Name( namePokemon ) { this.name = namePokemon; }
	set Description( DescriptionPokemon ) { this.description = DescriptionPokemon; }
	set Height( heightPokemon ) { this.height = heightPokemon; }
	set Weight( weightPokemon ) { this.weight = weightPokemon; }
	set BaseExperience( baseExperiencePokemon ) { this.baseExperience = baseExperiencePokemon; }
	set Abilities( abilitiesPokemon ) { this.abilities = typesPokemon; }
	set Types( typesPokemon ) { this.types = typesPokemon; }
	set Sprites( spritesPokemon ) { this.sprites = sprites; }
	set Stats( statsPokemon ) { this.stats = statsPokemon; }
}


/////////////////////////////////////////
// 2. Creación de la clase PokemonList //
/////////////////////////////////////////


// Definición de la clase PokemonList.
class PokemonList {
	constructor() {
		this.List = [];
	}

	// Añadir un Pokémon a la lista con "push()".
	addPokemon( pokemon ) {
		this.List.push( pokemon );
	}

	// Eliminar un Pokémon de la lista por ID.
	// Primero buscamos el indice de la array y despues utilizamos "splice()" para eliminar el indice en la array.
	removePokemon( pokemonId ) {
		const indice = this.List.findIndex( ( pokemon ) => pokemon.id === pokemonId );
		if ( indice !== -1 ) {
			this.List.splice(indice , 1);
		}
	}

	// Mostrar la lista de Pokémon (nombre, tipo principal e imagen).
	// Empleamos "forEach()" para recorrer todos los elementos de la array y mostrarlos por consola.
	showList() {
		this.List.forEach( ( pokemon ) => console.log( pokemon.name ) );
	}


	// Añadimos la función "length()" por comodidad, para devolver la longitud de la lista.
	get length(){
		return this.List.length;
	}
	

	/////////////////////////
	// 3. Funciones flecha //
	/////////////////////////


	// Añadir múltiples Pokémon a la vez.
	// Tratamos como array la entrada "rest" y la recorremos con "forEach()" y realizamos el "push()" para cada elemento.
	addMultiplePokemons = ( ...pokemons ) => {
		pokemons.forEach ( ( pokemon ) => this.List.push( pokemon ) );
	};


	// Obtener Pokémon dentro de un rango de peso.
	// Empleamos "filter()" para obtener los pokemons indicados.
	getPokemonsByWeightRange = (minWeight, maxWeight) => {
		return this.List.filter ( ( pokemon ) => pokemon.weight < maxWeight && pokemon.weight > minWeight );
	};


	// Ordenar Pokémon por experiencia base.
	// Empleamos "sort()" para ordenar los pokemon. De la forma que esta dispuesto (a - b), el orden será de menor a mayor.
	sortPokemonsByBaseExperience = () => {
		return this.List.sort( (a, b) => a.BaseExperience - b.BaseExperience );
	};


	// He decidido incluir las funciones descritas en la estructura como métodos en la clase, ya que en todos los casos
	// se hacia uso de una lista de pokemons, es decir, se hace uso de un objeto instanciado tipo PokemonList.
	
	
	////////////////////////////////////////////////////////
	// 4. Función recursiva para buscar un Pokémon por ID //
	////////////////////////////////////////////////////////
	
	// Definimos la función recursiva de modo que se compruebe si el indice a excedido el tamaño de la array,
	// sino, se comprueba si en el indice actual el "id" coincide y sino, se llama de nuevo la función con 
	// "indice + 1", para seguir buscando.
	findPokemonById ( id, index = 0 ) {
	
		let i = index;
		if ( i > this.length - 1 ){
			return 0; // Devolvemos 0 a modo de dar a entender que no se ha encontrado el pokemon.
		} else if ( this.List[i].ID === id ){
			return this.List[i];
		} else {
			return this.findPokemonById( id, index + 1); // Llamada recursiva.
		}
	
	}

	///////////////////////////////////////////////////////
	// 5. Uso de reduce para encontrar el tipo más común //
	///////////////////////////////////////////////////////
	
	getMostCommonType () {
	
		// Creamos una variable que contendrá un recuento de los tipos de pokemon que hay en la lista, usando "reduce()".
		const recuentoTipos = this.List.reduce( ( acumulador, pokemon ) => {
	
			pokemon.Types.forEach( (tipo) => { // Recorremos los tipos que contiene el pokemon.
				
				// El acumulador almacenará cada tipo que se encuentre en forma de objeto.
				if ( acumulador[tipo] != null ){ 
					acumulador[tipo] = acumulador[tipo] +1; // Si no es "null" quiere decir que ya lo a visto y entonces le sumamos 1.
				} else { 
					acumulador[tipo] = 1; // Si es "null" no estará definido y entonces la definimos inicializandola.
				}
			});
			
			return acumulador; // Devolvemos el recuento.
	
		}, {} );
	
		// Ahora se revisa qué tipo de pokemon tiene un mayor recuento.
		let tipoComun = "";
		let contador = 0;
	
		// Se emplea la forma clasica con "for" de recorrer elementos de pares Clave-Valor.
		for (const tipo in recuentoTipos) {
			if (contador < recuentoTipos[tipo]) {
				tipoComun = tipo;
				contador = recuentoTipos[tipo];
			}
		} 
	
		return tipoComun; // Devolvemos la string con el tipo.
	}
	
	////////////////////////////////////////////////////////////////////
	// 6. Uso de map y filter para obtener Pokémon fuertes por ataque //
	////////////////////////////////////////////////////////////////////

	// Se emplea filter para obtener los pokemons con ataque mayor al ataque minimo y map para obtener sus nombres.
	getStrongPokemons( minAttack ) {
		
		const Pokefuertes = this.List.filter ( pokemon => pokemon.Stats["attack"] >= minAttack );
		return Pokefuertes.map( (pokemon) => pokemon.Name );
		
	}
	
}


////////////////////////////////////////////////////////////
// FUNCIONES QUE SE HAN INCLUIDO COMO METODOS DE LA CLASE //
////////////////////////////////////////////////////////////

/*
	function findPokemonById ( pokemonList, id, index = 0 ) {
	
		let i = index;
		if ( i > pokemonList.length - 1 ){
			return 0; // Devolvemos 0 a modo de dar a entender que no se ha encontrado el pokemon.
		} else if ( pokemonList.List[i].ID === id ){
			return pokemonList.List[i];
		} else {
			return pokemonList.findPokemonById( id, index + 1); // Llamada recursiva.
		}
	
	}
	
	function getMostCommonType ( pokemonList ) {
	
		// Creamos una variable que contendrá un recuento de los tipos de pokemon que hay en la lista.
		const recuentoTipos = pokemonList.List.reduce( ( acumulador, pokemon ) => { // Llamamos a la función "reduce()" y definimos el callback.
	
			pokemon.Types.forEach( (tipo) => { // Recorremos los tipos que contiene el pokemon.
				
				// El acumulador almacenará cada tipo que se encuentre en forma de objeto.
				if ( acumulador[tipo] != null ){ 
					acumulador[tipo] = acumulador[tipo] +1; // Si no es "null" quiere decir que ya lo a visto y entonces le sumamos 1.
				} else { 
					acumulador[tipo] = 1; // Si es "null" no estará definido y entonces la definimos inicializandolo.
				}
			});
			
			return acumulador; // Devolvemos el recuento.
	
		}, {} );
	
		// Ahora se revisa qué tipo de pokemon tiene un mayor recuento.
		let tipoComun = "";
		let contador = 0;
	
		// Se emplea la forma clasica con "for" de recorrer elementos de pares Clave-Valor.
		for (const tipo in recuentoTipos) {
			if (contador < recuentoTipos[tipo]) {
				tipoComun = tipo;
				contador = recuentoTipos[tipo];
			}
		} 
	
		return tipoComun; // Devolvemos la string con el tipo.
	}
	

	function getStrongPokemons( pokemons, minAttack ) {
		
		const Pokefuertes = pokemons.List.filter ( pokemon => pokemon.Stats["attack"] >= minAttack );
		return Pokefuertes.map( (pokemon) => pokemon.Name );
		
	}
*/




/* ====================================
	 DATOS DE EJEMPLO PARA LA VALIDACIÓN
	 ==================================== */

// He hecho cambios en las definiciones que habian en el fichero de estructura base.

// 1.- Se ha modificado la definición de los stats. En vez de ser una array que contienen como una propiedad el nombre del stat (que no tiene mucha utilidad), 
//     lo he cambiado a un objeto formado por cada stat definido en pares de clave/valor.

// 2.- Se ha añadido la propiedad "abilities" que la forma mas apropiada es una array.


// Creamos algunos Pokémon válidos
const pikachu = new Pokemon({
	id: 25,
	name: "Pikachu",
	description: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
	height: 4,
	weight: 60,
	baseExperience: 112,
	abilities: ["Ataque rapido", "Rayo"],
	types: ["electric"],
	sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
	stats: {
		"hp": 35,
		"attack": 55,
		"defense": 40,
		"speed": 90 
	}
});

const bulbasaur = new Pokemon({
	id: 1,
	name: "Bulbasaur",
	description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
	height: 7,
	weight: 69,
	baseExperience: 64,
	abilities: ["Latigo cepa"],
	types: ["grass", "poison"],
	sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
	stats: {
		"hp": 45,
		"attack": 49,
		"defense": 49,
		"speed": 45 
	}
});

const charmander = new Pokemon({
	id: 4,
	name: "Charmander",
	description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
	height: 6,
	weight: 85,
	baseExperience: 62,
	abilities: ["Ascuas"],
	types: ["fire"],
	sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
	stats: {
		"hp": 39,
		"attack": 52,
		"defense": 43,
		"speed": 65 
	}
});

// Añadido Charmeleon.
const charmeleon = new Pokemon({
	id: 5,
	name: "Charmeleon",
	description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
	height: 10,
	weight: 120,
	baseExperience: 300,
	abilities: ["Ascuas", "Arañazo"],
	types: ["fire"],
	sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
	stats: {
		"hp": 50,
		"attack": 64,
		"defense": 46,
		"speed": 70 
	}
});

// Añadido Charizard.
const charizard = new Pokemon({
	id: 6,
	name: "Charizard",
	description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
	height: 16,
	weight: 200,
	baseExperience: 500,
	abilities: ["Ascuas", "Arañazo", "Lanzallamas"],
	types: ["fire"],
	sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
	stats: {
		"hp": 60,
		"attack": 72,
		"defense": 50,
		"speed": 60 
	}
});

/* ====================================
		EJEMPLOS DE USO Y VALIDACIÓN
		==================================== */


// Uso de getters y setters
console.log( "Uso de getters y setters" );
console.log( bulbasaur.Types );
bulbasaur.Description = "Uso del Setter de la descripción. Programación web, UOC 2025.";
console.log( bulbasaur.Description );

// Crear una lista de Pokémons
console.log( "Se define el objeto PokeLista." );
const PokeLista = new PokemonList();

// Ejemplo 1: añadir un Pokémon
console.log( "EJEMPLO 1: añadir un Pokémon (pikachu)" );
PokeLista.addPokemon( pikachu );

// Ejemplo 2: añadir múltiples Pokémons
console.log( "EJEMPLO 2: añadir múltiples Pokémons (bulbasaur, charmander, charmeleon, charizard)" );
PokeLista.addMultiplePokemons( bulbasaur, charmander, charmeleon, charizard );

// Ejemplo 3: eliminar un Pokémon
console.log( "EJEMPLO 3: eliminar un Pokémon (id 1 -> bulbasaur)" );
PokeLista.removePokemon( 1 );

// Ejemplo 4: mostrar la lista de Pokémons
console.log( "EJEMPLO 4: mostrar la lista de Pokémons" );
PokeLista.showList();

// Ejemplo 5: obtener Pokémon por rango de peso.
console.log( "EJEMPLO 5: obtener Pokémon por rango de peso (entre  40 y 100)." );
console.log( PokeLista.getPokemonsByWeightRange( 40, 100 ) );

// Ejemplo 6: ordenar Pokémon por experiencia base.
console.log( "EJEMPLO 6: ordenar Pokémon por experiencia base." );
console.log( PokeLista.sortPokemonsByBaseExperience() );

// Ejemplo 7: F. Recursiva para buscar un Pokémon por ID.
console.log( "EJEMPLO 7: F. Recursiva para buscar un Pokémon por ID (ID -> 6)." );
console.log( PokeLista.findPokemonById(  6 ) );

// Ejemplo 8: Tipo más común.
console.log( "EJEMPLO 8: Tipo más común." );
console.log( PokeLista.getMostCommonType() );

// Ejemplo 9: Pokémon fuertes por ataque
console.log( "EJEMPLO 9: Pokémon fuertes por ataque (ataque min. -> 60)." );
console.log( PokeLista.getStrongPokemons( 60 ) );