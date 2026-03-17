"use client"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function GenderChart({male,female}:{male:number,female:number}){

const data=[
{name:"Male",value:male},
{name:"Female",value:female}
]

return(

<div className="surface-glass p-8">

<h2 className="text-lg font-semibold mb-4">
Gender Distribution
</h2>

<ResponsiveContainer width="100%" height={250}>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="value" fill="#6366f1"/>

</BarChart>

</ResponsiveContainer>

</div>

)

}