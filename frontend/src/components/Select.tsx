import { PredefinedColors } from "@ionic/core"
import { IonItem, IonSelect, IonSelectOption } from "@ionic/react"
import { useField } from "formik"
import { FC, Key, ReactNode } from "react"

interface SelectOption {
  value: string | number | null
  label?: ReactNode
  key?: Key
}

interface Props {
  name: string
  options: SelectOption[]
  label?: string
  placeholder?: string
  multiple?: boolean
  color?: PredefinedColors
  lines?: "inset" | "full" | "none"
  className?: string
}

export const Select: FC<Props> = ({
  name,
  options,
  multiple,
  label,
  placeholder,
  lines = "inset",
  className,
  color = "light",
}) => {
  const [field, { touched, error }] = useField({ name, multiple })

  return (
    <>
      <IonItem color={color} lines={lines}>
        <IonSelect
          className={className}
          {...field}
          id={`${name}Input`}
          label={label}
          labelPlacement="floating"
          placeholder={placeholder}
          onIonChange={field.onChange}
          onIonBlur={field.onBlur}
          interface="popover"
        >
          {options.map(({ value, label, key }) => (
            <IonSelectOption key={key ?? value} value={value}>
              {label ?? value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      {touched && error && <p className="error-message">{error}</p>}
    </>
  )
}
