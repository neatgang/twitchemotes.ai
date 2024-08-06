import { ChromePicker, CirclePicker } from "react-color"
import { colors } from "../types";
import { rgbaObjectToString } from "../utils";



interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
    return (
        <div className="w-full space-y-4">
            <ChromePicker
                color={value}
                onChange={(color) => {
                    const formattedValue = rgbaObjectToString(color.rgb)
                    onChange(formattedValue)
                }}
                className="border rounded-lg"
            />
            <CirclePicker 
                colors={colors}
                color={value}
                onChangeComplete={(color) => {
                    const formattedValue = rgbaObjectToString(color.rgb)
                    onChange(formattedValue)
                }}
                className="border rounded-lg"
            />

        </div>
    )
}