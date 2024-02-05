import { IonSelectCustomEvent, PredefinedColors, SelectChangeEventDetail } from "@ionic/core"
import { IonIcon, IonItem, IonSelect, IonSelectOption } from "@ionic/react"
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
  onChange?: (ev: IonSelectCustomEvent<SelectChangeEventDetail>) => void
  onBlur?: (ev: IonSelectCustomEvent<void>) => void
  icon?: string
}

export const Select: FC<Props> = ({
  name,
  options,
  multiple,
  label,
  placeholder,
  lines = "none",
  className,
  //color = "light",
  onChange,
  onBlur,
  icon,
}) => {
  const [field, { touched, error }] = useField({ name, multiple })

  return (
    <>
      <IonItem lines={lines} className={className}>
        {icon && <IonIcon icon={icon} className="customIcon" />}
        <IonSelect
          {...field}
          id={`${name}Input`}
          label={label}
          labelPlacement="floating"
          placeholder={placeholder}
          // onIonChange={field.onChange}
          onIonChange={(ev) => {
            field.onChange(ev)

            if (onChange) {
              onChange(ev)
            }
          }}
          onIonBlur={(ev) => {
            field.onBlur(ev)

            if (onBlur) {
              onBlur(ev)
            }
          }}
          interface="popover"
        >
          {options.map(({ value, label, key }) => (
            <IonSelectOption key={key ?? value} value={value} className="customSelectOption">
              {label ?? value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      {touched && error && <p className="error-message">{error}</p>}
    </>
  )
}
