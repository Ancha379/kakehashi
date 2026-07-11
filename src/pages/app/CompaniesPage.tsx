import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCompanies } from '../../lib/CompaniesProvider';
import type { Company, CompanySize, Country, Industry, Purpose } from '../../data/types';
import CompanyCard from '../../components/CompanyCard';
import Button from '../../components/ui/Button';
import { cn } from '../../lib/cn';

const countryOptions: Country[] = ['JP', 'ID'];
const industryOptions: Industry[] = [
  'manufacturing',
  'it',
  'fnb',
  'textile',
  'logistics',
  'automotive',
  'fishery',
  'education',
  'travel',
  'hospital',
  'handicraft',
  'hotelresort',
  'sport',
  'others'
];
const purposeOptions: Purpose[] = ['sales', 'export', 'sourcing', 'partnership', 'investment', 'talent'];
const sizeOptions: CompanySize[] = ['small', 'medium', 'large'];

const countryFlag: Record<Country, string> = { JP: '🇯🇵', ID: '🇮🇩' };

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface FilterGroupProps<T extends string> {
  title: string;
  options: T[];
  selected: T[];
  onToggle: (value: T) => void;
  renderLabel: (value: T) => string;
}

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
  renderLabel
}: FilterGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </legend>
      <div className="space-y-1.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-0.5 text-sm text-slate-700 hover:text-primary-700"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
            />
            {renderLabel(option)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function CompaniesPage() {
  const { t } = useTranslation();
  const { companies, loading, error } = useCompanies();
  const [query, setQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<Purpose[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<CompanySize[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasFilters =
    selectedCountries.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedPurposes.length > 0 ||
    selectedSizes.length > 0;

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedIndustries([]);
    setSelectedPurposes([]);
    setSelectedSizes([]);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matchesQuery = (c: Company) =>
      !q ||
      [c.name_ja, c.name_id, c.summary_ja, c.summary_id, c.location_ja, c.location_id]
        .join(' ')
        .toLowerCase()
        .includes(q);

    return companies
      .filter(
        (c) =>
          matchesQuery(c) &&
          (selectedCountries.length === 0 || selectedCountries.includes(c.country)) &&
          (selectedIndustries.length === 0 || selectedIndustries.includes(c.industry)) &&
          (selectedPurposes.length === 0 || c.purpose.some((p) => selectedPurposes.includes(p))) &&
          (selectedSizes.length === 0 || selectedSizes.includes(c.size))
      )
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [companies, query, selectedCountries, selectedIndustries, selectedPurposes, selectedSizes]);

  const filterPanel = (
    <div className="space-y-6">
      <FilterGroup
        title={t('companies.country')}
        options={countryOptions}
        selected={selectedCountries}
        onToggle={(v) => setSelectedCountries((prev) => toggle(prev, v))}
        renderLabel={(v) => `${countryFlag[v]} ${t(`meta.countries.${v}`)}`}
      />
      <FilterGroup
        title={t('companies.industry')}
        options={industryOptions}
        selected={selectedIndustries}
        onToggle={(v) => setSelectedIndustries((prev) => toggle(prev, v))}
        renderLabel={(v) => t(`meta.industries.${v}`)}
      />
      <FilterGroup
        title={t('companies.purpose')}
        options={purposeOptions}
        selected={selectedPurposes}
        onToggle={(v) => setSelectedPurposes((prev) => toggle(prev, v))}
        renderLabel={(v) => t(`meta.purposes.${v}`)}
      />
      <FilterGroup
        title={t('companies.size')}
        options={sizeOptions}
        selected={selectedSizes}
        onToggle={(v) => setSelectedSizes((prev) => toggle(prev, v))}
        renderLabel={(v) => t(`meta.sizes.${v}`)}
      />
      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold text-primary-700 hover:underline"
        >
          {t('companies.clearFilters')}
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{t('companies.title')}</h2>
        <p className="mt-1 text-sm text-slate-500">{t('companies.subtitle')}</p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('companies.searchPlaceholder')}
            aria-label={t('companies.searchPlaceholder')}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('companies.filters')}
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Filter sidebar desktop */}
        <aside className="hidden w-56 shrink-0 lg:block" aria-label={t('companies.filters')}>
          {filterPanel}
        </aside>

        <div className="min-w-0 flex-1">
          {/* Filter panel mobile */}
          <div
            className={cn(
              'mb-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-card lg:hidden',
              !filtersOpen && 'hidden'
            )}
          >
            {filterPanel}
          </div>

          <p className="mb-4 text-xs font-semibold text-slate-500">
            {t('companies.results', { count: results.length })}
          </p>

          {error ? (
            <p className="rounded-2xl border border-dashed border-red-200 bg-red-50 p-10 text-center text-sm text-red-600">
              {t('common.loadError')}
            </p>
          ) : loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl border border-slate-100 bg-slate-100" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              {t('companies.noResults')}
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
