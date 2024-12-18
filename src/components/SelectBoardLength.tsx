import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { SelectProps } from '@radix-ui/react-select'

const SelectBoardLength = (props: SelectProps) => {
    return (
        <Select {...props}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="3">3x3</SelectItem>
                <SelectItem value="4">4x4</SelectItem>
                <SelectItem value="5">5x5</SelectItem>
                <SelectItem value="6">6x6</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default SelectBoardLength