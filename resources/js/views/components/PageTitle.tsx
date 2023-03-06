import React from 'react'
import { Divider } from 'antd'

export default function PageTitle({name}: {name: string}) {
    return (
        <Divider
            orientation="left"
            className="font-bold before:bg-yellow-500 after:bg-yellow-500">
            {name}
        </Divider>

    )
}
