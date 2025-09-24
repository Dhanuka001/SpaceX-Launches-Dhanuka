import { http , HttpResponse } from  'msw'

const launches = [
    {
        id:'1',
        name:'FalconSat',
        date_utc: '2006-03-24T22:30:00.000Z',
        success: false,
        rocket: 'r1',
        launchPad: 'lp1',
        payloads: ['p1']
    },
    { 
        id:'2', 
        name:'CRS-20',   
        date_utc:'2020-03-07T04:50:31.000Z', 
        success:true,  
        rocket:'r2', 
        launchpad:'lp2', 
        payloads:['p2'] },
]

export const handlers = [
    http.get('https://api.spacexdata.com/v4/launches' , () => HttpResponse.json(launches)),
    http.get('https://api.spacexdata.com/v4/launches/:id', ({params}) => {
        const item = launches.find(l => l.id === params.id)
        return item ? HttpResponse.json(item) : new HttpResponse(null, { status:404 })
    } ),
    http.get('https://api.spacexdata.com/v4/rockets/:id' , () => HttpResponse.json({ id:'r2' , name:'Falcon 9'})),
    http.get('https://api.spacexdata.com/v4/launchpads/:id' , () => HttpResponse.json({id:'lp2' , name:'CCAFS SLC 40', locality:'Cape Canaveral', region:'FL'})),
    http.get('https://api.spacexdata.com/v4/payloads/:id', ({params}) => {
        return HttpResponse.json({id: params.id as string , name:'Payload', type:'Comm' , orbit:'LEO'})
    }),
]