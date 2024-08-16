// src/models/Pokemon.js

class Pokemon {
    constructor(name, id, image, hp, attack) { // Ajout du paramètre 'attack'
        this.name = name;
        this.id = id;
        this.image = image;
        this.hp = hp;
        this.attack = attack; // Nouvelle propriété pour l'attaque
    }
}

export default Pokemon;
