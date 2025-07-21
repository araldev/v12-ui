declare const validThemes: readonly ["dark", "light", "transparent"];
type ValidThemes = typeof validThemes[number];
export declare function useDataTheme(themeParam?: ValidThemes): {
    theme: ValidThemes;
};
export {};
