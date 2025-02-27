import { forwardRef, useMemo, FC, useEffect } from "react"
import { Progress } from "@illa-design/progress"
import { WrappedBarProgressProps, BarProgressWidgetProps } from "./interface"
import { Label } from "@/widgetLibrary/PublicSector/Label"
import { applyCenterLabelAndComponentWrapperStyle } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedBarProgress = forwardRef<any, WrappedBarProgressProps>(
  (props, ref) => {
    const { value, showText, strokeWidth, color, trailColor } = props

    const _strokeWidth = useMemo(() => {
      return !isNaN(Number(strokeWidth)) ? strokeWidth + "px" : strokeWidth
    }, [strokeWidth])

    return (
      <Progress
        type="line"
        percent={value}
        showText={showText}
        color={color}
        w="100%"
        trailColor={trailColor}
        strokeWidth={_strokeWidth}
      />
    )
  },
)

WrappedBarProgress.displayName = "WrappedBarProgress"

export const BarProgressWidget: FC<BarProgressWidgetProps> = (props) => {
  const {
    value,
    showText,
    strokeWidth,
    color,
    trailColor,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    labelPosition,
    labelFull,
    label,
    labelAlign,
    labelWidth = 33,
    labelCaption,
    labelWidthUnit,
    required,
    labelHidden,
    tooltipText,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      showText,
      strokeWidth,
      color,
      trailColor,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [value, showText, strokeWidth, color, trailColor, displayName])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={applyCenterLabelAndComponentWrapperStyle(labelPosition)}>
        <Label
          labelFull={labelFull}
          label={label}
          labelAlign={labelAlign}
          labelWidth={labelWidth}
          labelCaption={labelCaption}
          labelWidthUnit={labelWidthUnit}
          labelPosition={labelPosition}
          required={required}
          labelHidden={labelHidden}
          hasTooltip={!!tooltipText}
        />
        <WrappedBarProgress {...props} />
      </div>
    </TooltipWrapper>
  )
}

BarProgressWidget.displayName = "BarProgressWidget"
