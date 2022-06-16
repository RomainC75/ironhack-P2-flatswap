const houses = [
    {
        category: "mansion",
        images: [
            'https://a0.muscache.com/im/pictures/miso/Hosting-49227437/original/5b50ac57-8eca-4b8b-be51-43a7155ed37a.jpeg?im_w=720',
            'https://a0.muscache.com/im/pictures/miso/Hosting-49227437/original/df072e91-5a50-4c04-ac97-80aad69ec55d.jpeg?im_w=720'
        ],
        roomsQty: 3,
        bedroomsQty: 2,
        bathroom: {
            quantity: 1,
            bathtub: true,
            shower: true,
        },
        equipped_kitchen: 1,
        garden: false,
        pool: false,
        surface: 90,
        pet_friendly: true,

        presentation: 'beautiful dream island ! ',
        adress: {
            street_name: 'beach avenue',
            street_number: 1,
            city: "Nouméa",
            country: "Nouvelle Calédonie",
        },
        available_period: [[new Date("2022-11-20T12:05:45"), new Date("2022-11-23T12:05:45")]],
        fixed_period: true,
    },{
        category: "flat",
        images: [
            'https://a0.muscache.com/im/pictures/e25f5610-ec9d-437f-90fb-139a3fc56029.jpg?im_w=720',
            'https://a0.muscache.com/im/pictures/ede18a6b-ec38-4f6d-9b23-a40129223529.jpg?im_w=720'
        ],
        roomsQty: 2,
        bedroomsQty: 1,
        bathroom: {
            quantity: 1,
            bathtub: true,
            shower: true,
        },
        equipped_kitchen: 1,
        garden: true,
        pool: false,
        surface: 30,
        pet_friendly: true,

        presentation: 'nice vue ! ',
        adress: {
            street_name: 'Don Miguel',
            street_number: 1,
            city: "San Paolo",
            country: "Brasil",
        },
        available_period: [
            [new Date("2022-01-20T12:05:45"), new Date("2021-01-22T12:05:45")],
            [new Date("2022-06-01T12:05:45"), new Date("2021-06-03T12:05:45")]
        ],
        fixed_period: true,
    }
]

module.exports=houses