import { FC, useEffect, useState } from "react"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import hotkeys from "hotkeys-js"
import { Modal } from "@illa-design/modal"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { Message } from "@illa-design/message"
import { configActions } from "@/redux/config/configSlice"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useHotkeys } from "react-hotkeys-hook"
import store from "@/store"
import { getIllaMode } from "@/redux/config/configSelector"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const Shortcut: FC = ({ children }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const mode = useSelector(getIllaMode)

  useHotkeys(
    "command+s,ctrl+s",
    (event) => {
      event.preventDefault()
      Message.success(t("dont_need_save"))
    },
    {
      enabled: mode === "edit",
    },
    [],
  )

  // shortcut
  const [alreadyShowDeleteDialog, setAlreadyShowDeleteDialog] =
    useState<boolean>(false)

  const showDeleteDialog = (displayName: string[]) => {
    if (!alreadyShowDeleteDialog && displayName.length > 0) {
      const textList = displayName.join(", ").toString()
      setAlreadyShowDeleteDialog(true)
      Modal.confirm({
        title: t("editor.component.delete_title", {
          displayName: textList,
        }),
        content: t("editor.component.delete_content", {
          displayName: textList,
        }),
        cancelText: t("editor.component.cancel"),
        okText: t("editor.component.delete"),
        okButtonProps: {
          colorScheme: "red",
        },

        closable: false,
        onCancel: () => {
          setAlreadyShowDeleteDialog(false)
        },
        onOk: () => {
          setAlreadyShowDeleteDialog(false)
          dispatch(
            componentsActions.deleteComponentNodeReducer({
              displayNames: displayName,
            }),
          )
          dispatch(configActions.clearSelectedComponent())
        },
      })
    }
  }

  const copyComponent = (componentNode: ComponentNode) => {
    const newDisplayName = DisplayNameGenerator.generateDisplayName(
      componentNode.type,
      componentNode.showName,
    )
    dispatch(
      componentsActions.copyComponentNodeReducer({
        newDisplayName: newDisplayName,
        componentNode: componentNode,
      }),
    )
  }

  useHotkeys(
    "Backspace",
    (event) => {
      event.preventDefault()
      showDeleteDialog(
        store.getState().config.selectedComponents.map((item) => {
          return item.displayName
        }),
      )
    },
    {
      enabled: mode === "edit",
    },
    [showDeleteDialog],
  )

  useHotkeys(
    "*",
    (keyboardEvent) => {
      if (hotkeys.ctrl || hotkeys.command) {
        if (keyboardEvent.type === "keydown") {
          dispatch(configActions.updateShowDot(true))
        } else if (keyboardEvent.type === "keyup") {
          dispatch(configActions.updateShowDot(false))
        }
      }
    },
    { keydown: true, keyup: true, enabled: mode === "edit" },
    [],
  )

  // cancel show dot
  useEffect(() => {
    const listener = () => {
      dispatch(configActions.updateShowDot(false))
    }
    document.addEventListener("visibilitychange", listener)
    window.addEventListener("blur", listener)
    return () => {
      document.removeEventListener("visibilitychange", listener)
      window.removeEventListener("blur", listener)
    }
  }, [dispatch])

  return (
    <ShortCutContext.Provider value={{ showDeleteDialog, copyComponent }}>
      {children}
    </ShortCutContext.Provider>
  )
}
