const filters = [
    {
        type:"select",
        name:"Sortowanie",
        data:[
            "Odległość rosnącą",
            "Odległość malejąco",
            "Wynagrodzenie rosnąco",
            "Wynagrodzenie malejąco"
        ]
    },
    {
        type:"slider",
        name:"Wynagrodzenie za godzinę",
        data:{
            min:0,
            max:150,
            step:5,
            value:[0, 100]
        }
    },
    {
        type:"checkbox",
        name:"Kategoria",
        data:[
            "mechanika",
            "ogrodnictwo",
            "elektryka",
            "budownictwo",
            "inna"
        ]
    },
];
export default filters;