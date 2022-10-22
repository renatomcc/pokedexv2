export function setCardBGColor(type1: string, type2: string | null, length: number) {

    let firstColor: string = '', secondColor: string = '', finalColor: string[];

    switch (type1) {
        case 'bug':
            firstColor = 'rgba(63,229,106,0.3)'
            break;
        case 'dark':
            firstColor = 'rgba(62, 62, 62, 0.6)'
            break;
        case 'dragon':
            firstColor = 'rgba(19,59,187,0.4)'
            break;
        case 'electric':
            firstColor = 'rgba(207,255,15,0.4)'
            break;
        case 'fairy':
            firstColor = 'rgba(255, 99, 216, 0.6)'
            break;
        case 'fighting':
            firstColor = 'rgba(193,67,67,0.4)'
            break;
        case 'fire':
            firstColor = 'rgba(255,138,0,0.4)'
            break;
        case 'flying':
            firstColor = 'rgba(91, 253, 255,0.4)'
            break;
        case 'ghost':
            firstColor = 'rgba(118,44,166,0.4)'
            break;
        case 'grass':
            firstColor = 'rgba(6,165,48,0.4)'
            break;
        case 'ground':
            firstColor = 'rgba(144, 140, 45,0.6)'
            break;
        case 'ice':
            firstColor = 'rgba(17,214,232,0.4)'
            break;
        case 'steel':
            firstColor = 'rgba(127,158,161,0.6)'
            break;
        case 'normal':
            firstColor = 'rgba(225,197,152,0.7)'
            break;
        case 'poison':
            firstColor = 'rgba(160,7,166,0.4)'
            break;
        case 'psychic':
            firstColor = 'rgba(255,131,187,0.6)'
            break;
        case 'rock':
            firstColor = 'rgba(178,163,163,0.4)'
            break;
        case 'water':
            firstColor = 'rgba(43,141,241,0.4)'
            break;
    }
    if (length == 2) {
        switch (type2) {
            case 'bug':
                secondColor = 'rgba(63,229,106,0.7)'
                break;
            case 'dark':
                secondColor = 'rgba(62, 62, 62, 0.7)'
                break;
            case 'dragon':
                secondColor = 'rgba(19,59,187,0.7)'
                break;
            case 'electric':
                secondColor = 'rgba(207,255,15,0.7)'
                break;
            case 'fairy':
                secondColor = 'rgba(255,73,219,0.7)'
                break;
            case 'fighting':
                secondColor = 'rgba(193,67,67,0.7)'
                break;
            case 'fire':
                secondColor = 'rgba(255,138,0,0.7)'
                break;
            case 'flying':
                secondColor = 'rgba(205,228,229,0.7)'
                break;
            case 'ghost':
                secondColor = 'rgba(118,44,166,0.7)'
                break;
            case 'grass':
                secondColor = 'rgba(6,165,48,0.7)'
                break;
            case 'ground':
                secondColor = 'rgba(166,172,0,0.7)'
                break;
            case 'ice':
                secondColor = 'rgba(17,214,232,0.7)'
                break;
            case 'steel':
                secondColor = 'rgba(127,158,161,0.7)'
                break;
            case 'normal':
                secondColor = 'rgba(225,197,152,0.7)'
                break;
            case 'poison':
                secondColor = 'rgba(160,7,166,0.7)'
                break;
            case 'psychic':
                secondColor = 'rgba(255,131,187,0.7)'
                break;
            case 'rock':
                secondColor = 'rgba(178,163,163,0.7)'
                break;
            case 'water':
                secondColor = 'rgba(43,141,241,0.7)'
                break;
        }
    } else {
        if (firstColor)
            secondColor = firstColor;
    }
    finalColor = [firstColor, secondColor];
    return finalColor

}

export function setTypeColor(type: string) {
    let typeColor: string = '';
    switch (type) {
        case 'bug':
            typeColor = 'rgba(63,229,106,1)'
            break;
        case 'dark':
            typeColor = 'rgba(62, 62, 62,1)'
            break;
        case 'dragon':
            typeColor = 'rgba(19,59,187,1)'
            break;
        case 'electric':
            typeColor = '#DBDF58'
            break;
        case 'fairy':
            typeColor = 'rgba(255,73,219,1)'
            break;
        case 'fighting':
            typeColor = 'rgba(193,67,67,1)'
            break;
        case 'fire':
            typeColor = 'rgba(255,138,0,1)'
            break;
        case 'flying':
            typeColor = 'rgba(130, 195, 238, 1)'
            break;
        case 'ghost':
            typeColor = 'rgba(118,44,166,1)'
            break;
        case 'grass':
            typeColor = 'rgba(6,165,48,1)'
            break;
        case 'ground':
            typeColor = 'rgba(166,172,0,1)'
            break;
        case 'ice':
            typeColor = 'rgba(17,214,232,1)'
            break;
        case 'steel':
            typeColor = 'rgba(127,158,161,1)'
            break;
        case 'normal':
            typeColor = 'rgba(225,197,152,1)'
            break;
        case 'poison':
            typeColor = 'rgba(160,7,166,1)'
            break;
        case 'psychic':
            typeColor = 'rgba(255,131,187,1)'
            break;
        case 'rock':
            typeColor = 'rgba(178,163,163,1)'
            break;
        case 'water':
            typeColor = 'rgba(43,141,241,1)'
            break;
    }
    return typeColor;
}

export function setTextColor(type: string) {
    let textColor: string = '';
    if (type == 'electric' || type == 'flying' || type == 'normal' || type == 'bug' || type == 'psychic' || type == 'ground' || type == 'ice') {
        textColor = 'black';
    } else textColor = 'white';
    return textColor;
}

export function setStatColor(stat: string) {
    let statColor: string = '';
    switch (stat) {
        case 'hp':
            statColor = 'rgba(255, 0, 0, 0.6)';
            break;
        case 'attack':
            statColor = 'rgba(240, 128, 48, 0.6)';
            break;
        case 'defense':
            statColor = 'rgba(248, 208, 48, 0.6)';
            break;
        case 'special-attack':
            statColor = 'rgba(104, 144, 240, 0.6)';
            break;
        case 'special-defense':
            statColor = 'rgba(120, 200, 80, 0.6)';
            break;
        case 'speed':
            statColor = 'rgba(248, 88, 136, 0.6)';
            break;
    }
    return statColor;
}
