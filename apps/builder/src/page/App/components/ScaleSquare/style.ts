import { css, SerializedStyles } from "@emotion/react"
import { ScaleSquareType } from "@/page/App/components/ScaleSquare/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"

export function getStateColor(scaleSquareType: ScaleSquareType): string {
  let stateColor: string
  switch (scaleSquareType) {
    case "error":
      stateColor = globalColor(`--${illaPrefix}-red-03`)
      break
    case "normal":
      stateColor = globalColor(`--${illaPrefix}-techPurple-01`)
      break
    default:
      stateColor = globalColor(`--${illaPrefix}-techPurple-01`)
      break
  }
  return stateColor
}

export function getSelectedColor(selected: boolean): string {
  return selected ? globalColor(`--${illaPrefix}-techPurple-01`) : "transparent"
}

export function applySquarePointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  pointerPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        top: -2px;
        left: -2px;
        cursor: ${selected ? "nwse-resize" : "default"};
      `
      break
    case "tr":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        top: -2px;
        right: -2px;
      `
      break
    case "bl":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        bottom: -2px;
        left: -2px;
      `
      break
    case "br":
      positionStyle = css`
        cursor: ${selected ? "nwse-resize" : "default"};
        bottom: -2px;
        right: -2px;
      `
      break
    default:
      positionStyle = css``
      break
  }

  const baseColor = getSelectedColor(selected)

  return css`
    ${positionStyle};
    box-sizing: border-box;
    border: 1px solid ${baseColor};
    height: 5px;
    width: 5px;
    position: absolute;
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};

    &:active {
      background: ${baseColor};
    }

    &:hover {
      background: ${baseColor};
    }
  `
}

export const warningStyle = css`
  margin-left: 4px;
`

export function applyBarPointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }

  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "b":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    default:
      barPositionStyle = css``
  }

  const baseColor = getSelectedColor(selected)
  return css`
    ${barPositionStyle};
    box-sizing: border-box;
    position: absolute;
    border-radius: 2.5px;
    border: 1px solid ${baseColor};
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};
    :hover {
      background-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  `
}

export function applyBorderStyle(
  selected: boolean,
  scaleSquareState: ScaleSquareType,
): SerializedStyles {
  if (scaleSquareState === "production") {
    return css`
      width: calc(100%);
      height: calc(100%);
      position: absolute;
    `
  }

  return css`
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    cursor: move;
    border: 1px solid ${getSelectedColor(selected)};
    background-color: ${scaleSquareState === "error" && !selected
      ? globalColor(`--${illaPrefix}-red-07`)
      : "transparent"};

    &:hover {
      border-color: ${selected
        ? globalColor(`--${illaPrefix}-techPurple-01`)
        : getStateColor(scaleSquareState)};
      background-color: transparent;

      .handler {
        visibility: visible;
      }
    }

    &:active {
      border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  `
}

export function applyBarHandlerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: -2px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ${selected ? "row-resize" : "default"};
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: -2px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ${selected ? "row-resize" : "default"};
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        left: -2px;
        top: 0;
        width: 5px;
        cursor: ${selected ? "col-resize" : "default"};
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        right: -2px;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        width: 5px;
      `
      break
    default:
      barPositionStyle = css``
  }

  return css`
    ${barPositionStyle};
    position: absolute;
  `
}

export const applyMoveBarWrapperStyle = (
  maxWidth: number,
  isError: boolean,
  selected: boolean,
  isEditor: boolean,
) => {
  return css`
    height: 20px;
    padding: 2px 4px 2px 0;
    background-color: ${isError
      ? globalColor(`--${illaPrefix}-red-03`)
      : globalColor(`--${illaPrefix}-techPurple-01`)};
    border-radius: 4px 4px 0 0;
    display: flex;
    position: absolute;
    top: -20px;
    left: 0;
    align-items: center;
    font-size: 12px;
    color: #fff;
    max-width: ${maxWidth}px;
    min-width: 12px;
    overflow: hidden;
    visibility: ${isEditor && selected ? "visible" : "hidden"};
    z-index: 200;
  `
}

export const dragPointIconWrapperStyle = css`
  width: 12px;
  height: 12px;
  flex: none;
`

export const moveBarDisplayNameStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
`

export const applyRNDWrapperStyle = (
  isSelected: boolean,
  hasError: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
  isEditor: boolean,
) => css`
  :hover {
    .wrapperPending {
      border-color: ${isEditor
        ? hasError && !isSelected
          ? globalColor(`--${illaPrefix}-red-03`)
          : globalColor(`--${illaPrefix}-techPurple-01`)
        : "transparent"};
    }
    #moveBar {
      visibility: ${isEditor ? "visible" : "hidden"};
    }
  }
`

export const applyWrapperPendingStyle = (
  isSelected: boolean,
  hasError: boolean,
  isDragging: boolean,
  isEditor: boolean,
) => css`
  width: 100%;
  height: 100%;
  padding: 3px;
  border: 1px solid
    ${isEditor && isSelected
      ? globalColor(`--${illaPrefix}-techPurple-01`)
      : "transparent"};
  background-color: ${isEditor && hasError && !isSelected
    ? globalColor(`--${illaPrefix}-red-07`)
    : "transparent"};
  opacity: ${isDragging ? 0 : 100};
`

export const applyDashedLineStyle = (
  isSelected: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed ${globalColor(`--${illaPrefix}-techPurple-01`)}`
    : "none"};
`
