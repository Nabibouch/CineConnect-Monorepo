import Filmtheme from "./filmtheme/filmtheme";

export type FilmThemeDefinition = {
  title: string;
  image: string;
  bg_color: string;
};

type FilterBarProps = {
  themes: FilmThemeDefinition[];
  selectedTheme: string | null;
  onSelectTheme: (theme: string) => void;
};

const FilterBar = ({
  themes,
  selectedTheme,
  onSelectTheme,
}: FilterBarProps) => {
  return (
    <div className="flex gap-3 justify-center">
      {themes.map((theme) => {
        const active = selectedTheme === theme.title;

        return (
          <button
            key={theme.title}
            type="button"
            onClick={() => onSelectTheme(theme.title)}
            aria-pressed={active}
            className={`rounded-3xl transition-transform duration-200 ${
              active
                ? "ring-2 ring-white scale-[1.03]"
                : "hover:scale-[1.02]"
            }`}
          >
            <Filmtheme
              title={theme.title}
              image={theme.image}
              bg_color={theme.bg_color}
            />
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
