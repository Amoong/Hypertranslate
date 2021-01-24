import React, { useState, useContext, createContext } from "react";

const _setLang = (input: string) => {};
const _t = (input: string) => "";
const sample = {
  setLang: _setLang,
  t: _t,
};

const LangContext = createContext(sample);

interface ITranslationsProps {
  es: {
    "Hello!": string;
    Translate: string;
  };
}

interface ILangProps {
  defaultLang: string;
  children: React.ReactNode;
  translations: ITranslationsProps;
}

const Lang: React.FunctionComponent<ILangProps> = ({
  defaultLang,
  children,
  translations,
}) => {
  const [lang, setLang] = useState<string>(defaultLang);
  const hyperTranslate = (text: string) => {
    if (lang === defaultLang) {
      return text;
    } else {
      return (translations as any)[lang][text];
    }
  };

  return (
    <LangContext.Provider value={{ setLang, t: hyperTranslate }}>
      {children}
    </LangContext.Provider>
  );
};

export const useSetLang = () => {
  const { setLang } = useContext(LangContext);
  return setLang;
};

export const useT = () => {
  const { t } = useContext(LangContext);
  return t;
};

export default Lang;
