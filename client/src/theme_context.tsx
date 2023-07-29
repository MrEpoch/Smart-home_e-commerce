import React, { useContext, useMemo, useState } from "react";
import { ChildrenProp } from "./Types";
import { ThemeContext } from "./Contexts";
// @ts-ignore
import Cookies from "js-cookie";

export function useTheme() {
  const value = useContext(ThemeContext);
  if (value === null) return {};
  return value;
}

export default function Theme_Context({
  children,
}: ChildrenProp): React.JSX.Element {
  const [dark, setDark] = useState<boolean>(false);

    useMemo(() => {
      (async () => {
        const NewTheme = await Cookies.get(import.meta.env.VITE_THEME_NAME);
        if (NewTheme) setDark(JSON.parse(NewTheme));
      })();
  }, []);

  function toggle() {
    setDark(!dark);
    Cookies.set(
      import.meta.env.VITE_THEME_NAME,
      JSON.stringify(!dark),
    );
  }

  const value = {
    dark,
    toggle,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
