type Itinerary = {
    day:number,id:number,place:string,order_id:number,circuit_id:number,description:string
}
type Equipement = {
    id:number,equipement:string,circuit_id:number
}
type Adrenaline = {
    id:number,content:string,circuit_id:number
}
export type Testimonial = {
  id: string;
  author_name: string;
  tour_id: string;
  rating: number;
  comment: string;
  created_at: string;
};
export type Circui_Model = {
        id:number,
        title:string,
        subtitle:string,
        description:string,
        duration:string,
        difficulty:number,
        image:string,
        price:number,
        itinerary:Itinerary[],
        equipment:Equipement[],
        adrenaline: Adrenaline[],
        include_in_price: Adrenaline[]
}

type Tour = {
        id:number,
        title:string,
        subtitle:string,
        description:string,
        duration:string,
        difficulty:number,
        image:string,
        price:number
}
export type Circuit_Model = {
        circuit: Tour[],
        itinerary:Itinerary[],
        equipment:Equipement[],
        adrenaline: Adrenaline[],
        include_in_price: Adrenaline[]
}
export type Fetch_Response = {
    code : Int16Array,
    data:Circuit_Model,
    error: string
    
}

export class Contact_Model  {
    name:string
    subject:string | undefined
    body:string
    number:string | undefined
    begining: string | undefined
    number_of_person: number | undefined
    mail:string
    circuit_id : number | undefined

    constructor(mail:string  , circuit_id : number | undefined , name:string,    subject:string | undefined,    body:string,    number:string | undefined,    begining: string | undefined,    number_of_person: number | undefined) {
        this.name = name
        this.subject = subject
        this.circuit_id = circuit_id
        this.body = body
        this.number = number
        this.begining = begining
        this.number_of_person = number_of_person
        this.mail = mail


    }  
}

export function Order(data:Itinerary[]) {
    const data2:Itinerary[] = []
    data.forEach((element) => {
        data2.splice(element.order_id - 1,0,element)
    })
    console.log(data2)
    return data2
}