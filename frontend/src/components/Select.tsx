import { PredefinedColors } from "@ionic/core"
import { IonIcon, IonItem, IonSelect, IonSelectOption } from "@ionic/react"
import { useField } from "formik"
import {
  alarm,
  caretDown,
  hammer,
  informationCircleOutline,
  locationSharp,
  warningSharp,
} from "ionicons/icons"
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
  icon: boolean
  iconName?: string
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
  icon,
  iconName,
}) => {
  const [field, { touched, error }] = useField({ name, multiple })

  // Map icon names to actual icons
  const iconMap = {
    warningSharp: warningSharp,
    hammer: hammer,
    alarm: alarm,
    informationCircleOutline: informationCircleOutline,
    locationSharp: locationSharp,
    caretDown: caretDown,
  }
  const selectedIcon = iconMap[iconName as keyof typeof iconMap]

  return (
    <>
      <IonItem lines={lines} className={className}>
        {icon && <IonIcon icon={selectedIcon} className="customIcon" />}
        <IonSelect
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
