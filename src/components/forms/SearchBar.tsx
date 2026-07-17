import { getDictionary } from "@/i18n/dictionaries";

type Props = {
  locale: string;
  city: string;
  defaultLocation?: string;
  defaultType?: string;
  defaultBedrooms?: string;
};

export function SearchBar({ locale, city, defaultLocation, defaultType, defaultBedrooms }: Props) {
  const t = getDictionary(locale);

  return (
    <form
      action={`/${locale}/${city}/properties`}
      className="rounded-2xl bg-white shadow-xl shadow-primary/10 p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4"
    >
      <div className="md:col-span-2 flex flex-col gap-1">
        <label htmlFor="location" className="text-xs text-stone-500">
          {t.search.neighborhood}
        </label>
        <select
          id="location"
          name="location"
          defaultValue={defaultLocation ?? ""}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
        >
          <option value="">{t.search.allNeighborhoods}</option>
          <option value="californie">Californie</option>
          <option value="ain-diab">Ain Diab</option>
          <option value="maarif">Maarif</option>
          <option value="racine">Racine</option>
          <option value="bouskoura">Bouskoura</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-xs text-stone-500">
          {t.search.type}
        </label>
        <select
          id="type"
          name="type"
          defaultValue={defaultType ?? ""}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
        >
          <option value="">{t.search.allTypes}</option>
          <option value="APARTMENT">{t.propertyTypes.APARTMENT}</option>
          <option value="VILLA">{t.propertyTypes.VILLA}</option>
          <option value="RIVAD">{t.propertyTypes.RIVAD}</option>
          <option value="PENTHOUSE">{t.propertyTypes.PENTHOUSE}</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="bedrooms" className="text-xs text-stone-500">
          {t.search.bedrooms}
        </label>
        <select
          id="bedrooms"
          name="bedrooms"
          defaultValue={defaultBedrooms ?? ""}
          className="rounded-lg border border-stone-200 px-3 py-2 text-sm"
        >
          <option value="">{t.search.anyBedrooms}</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <button
        type="submit"
        className="self-end rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-accent hover:text-primary transition-colors"
      >
        {t.search.submit}
      </button>
    </form>
  );
}
