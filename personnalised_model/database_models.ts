//Classe pour les jointures de cirtcuit
class Itinerary {
    id:number
    place: string
    order_id:number

    constructor(
            id:number,
    place: string,
    order_id:number,
    ) {
        this.id = id
        this.place = place
        this.order_id = order_id
    }
}
class Adrenaline {
    id:number
    content: string
    circuit_id:number

    constructor(
        id:number,
    content: string,
    circuit_id:number,
    ) {
        this.id = id
        this.content = content
        this.circuit_id = circuit_id
    }
}

class Included {
    id:number
    content: string
    circuit_id:number

    constructor(
        id:number,
    content: string,
    circuit_id:number,
    ) {
        this.id = id
        this.content = content
        this.circuit_id = circuit_id
    }
}

class Equipment {
    id:number
    content: string
    circuit_id:number

    constructor(
        id:number,
    content: string,
    circuit_id:number,
    ) {
        this.id = id
        this.content = content
        this.circuit_id = circuit_id
    }
}
// Classe principale
export class Personnalised_Fetch_For_Circuits {
    id:number
    title:string
    subtitle:string
    duration:string
    difficulty:number
    price:number
    image:string
    itinerary: Itinerary[]
    adrenaline: Adrenaline[]
    included: Included[]
    equipment: Equipment[]


    constructor(
        id:number,
        title:string,
        subtitle:string,
        duration:string,
        difficulty:number,
        price:number,
        image:string,
        itinerary: Itinerary[],
        adrenaline: Adrenaline[],
        included: Included[],
        equipment: Equipment[]
    ) {
    this.id = id
    this.title = title
    this.subtitle = subtitle
    this.duration = duration
    this.difficulty = difficulty
    this.price = price
    this.image = image
    this.itinerary = itinerary
    this.adrenaline = adrenaline
    this.included = included
    this.equipment = equipment
    
    }
}

export class Contact_Class {
    id:number
    name:string
    subject:string
    body:string
    number:string | undefined
    begining: string | undefined
    number_of_person: number | undefined
    circuit_id: number | undefined

    constructor(
        id:number,
        name:string,
        subject:string,
        body:string,
        number:string | undefined,
        begining: string | undefined,
        number_of_person: number | undefined,
        circuit_id: number | undefined

    ) {
        this.id = id
        this.name = name
        this.subject = subject
        this.body = body,
        this.number = number,
        this.begining = begining,
        this.number_of_person = number_of_person,
        circuit_id = circuit_id
    }
} 