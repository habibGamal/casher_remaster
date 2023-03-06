import { Button } from 'antd'
import React from 'react'
import IconSax from './IconSax'
interface ButtonSaxProps {
    icon: string;
    shape?: "circle" | "default" | "round" | undefined;
    type?: "default" | "link" | "text" | "ghost" | "primary" | "dashed" | undefined;
}
export default function ButtonSax({ icon, shape, type }: ButtonSaxProps) {
    return (
        <Button
            shape={shape}
            type={type}
            className='bg-white'
            icon={<IconSax icon={icon} />}
        />
    )
}
