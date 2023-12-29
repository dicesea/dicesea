import { useEffect, useState } from "react";

const largeCutText = (text: string) =>
  `${text.substring(0, 8)}...${text.substring(text.length - 4)}`;

const smallCutText = (text: string) =>
  `${text.substring(0, 10)}...${text.substring(text.length - 2)}`;

function useShortDid(did: string = "") {
  const [shortForm, setShortForm] = useState<string | null>(null);

  useEffect(() => {
    if (!did) {
      setShortForm(null);
      return;
    }

    const resizeHandler = () => {
      setShortForm((prevShortForm) => {
        const newShortForm =
          window.innerWidth >= 768 ? largeCutText(did) : smallCutText(did);
        if (prevShortForm !== newShortForm) {
          return newShortForm;
        }
        return prevShortForm;
      });
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [did]);

  return shortForm || "";
}

export { useShortDid };
