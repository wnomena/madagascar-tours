type Itinerary = {
    day:number,id:number,place:string,order_id:number,circuit_id:number,description:string
}
type Equipement = {
    id:number,equipment:string,circuit_id:number
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
        included: Adrenaline[]
}

export type Fetch_Response = {
    code : Int16Array,
    data:Circui_Model[],
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
    total_price : number | undefined

    constructor(mail:string  ,  total_price:number | undefined,  name:string,    subject:string | undefined,    body:string,    number:string | undefined,    begining: string | undefined,    number_of_person: number | undefined) {
        this.name = name
        this.subject = subject
        this.body = body
        this.number = number
        this.begining = begining
        this.number_of_person = number_of_person
        this.mail = mail
        this.total_price = total_price


    }


    
}