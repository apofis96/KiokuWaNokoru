import { useHeaderStore } from "@/stores/header.store";
import { useEffect } from "react";

const useHeader = (title: string, actions?: string[]) => {
  const setNavigation = useHeaderStore(state => state.setNavigation);
  useEffect(() => {
    setNavigation(title, actions);
  }, [actions, setNavigation, title]);
}

export { useHeader };
