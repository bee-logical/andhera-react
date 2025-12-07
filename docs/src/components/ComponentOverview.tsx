import { useMemo } from "react";
import type { ComponentCategory, ComponentCategoryId, ComponentDoc } from "../data/components";
import { getStatusLabel } from "../data/components";

export interface ComponentOverviewProps {
  docs: ComponentDoc[];
  categories: ComponentCategory[];
  search: string;
  selectedCategory: "all" | ComponentCategoryId;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: "all" | ComponentCategoryId) => void;
  onSelectComponent: (id: string) => void;
}

const statusClassName = (status: ComponentDoc["status"]) => `docs-status-chip docs-status-chip--${status ?? "stable"}`;

export const ComponentOverview = ({
  docs,
  categories,
  search,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onSelectComponent,
}: ComponentOverviewProps) => {
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      docs.filter((doc) => {
        const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
        if (!matchesCategory) return false;

        if (!normalizedSearch) return true;

        const haystack = [doc.title, doc.caption, doc.description, ...doc.keywords];
        return haystack.some((value) => value.toLowerCase().includes(normalizedSearch));
      }),
    [docs, normalizedSearch, selectedCategory],
  );

  const sections = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: filtered.filter((doc) => doc.category === category.id),
      })),
    [categories, filtered],
  );

  const totalMatches = filtered.length;
  const hasResults = sections.some((section) => section.items.length > 0);

  return (
    <div className="docs-overview">
      <section className="docs-card docs-overview__hero">
        <div className="docs-overview__summary">
          <span className="docs-overview__eyebrow">Component library</span>
          <h1>All components</h1>
          <p>
            Explore ready-to-use building blocks across feedback, data capture, and layout. Each component ships with TypeScript
            definitions, accessibility-friendly defaults, and theming hooks.
          </p>
          <div className="docs-overview__meta">
            <strong>{totalMatches}</strong>
            <span>{totalMatches === 1 ? "component" : "components"} available</span>
          </div>
        </div>

        <div className="docs-overview__actions">
          <label className="docs-search" aria-label="Search components">
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.5-1.5-5-5Zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14Z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search components"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>

          <div className="docs-filter-chips" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={`docs-filter-chip${selectedCategory === "all" ? " docs-filter-chip--active" : ""}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={`docs-filter-chip${selectedCategory === category.id ? " docs-filter-chip--active" : ""}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {hasResults ? (
        sections.map(({ category, items }) =>
          items.length > 0 ? (
            <section key={category.id} className="docs-overview__section">
              <div className="docs-overview__section-header">
                <div>
                  <h2>{category.label}</h2>
                  <p>{category.description}</p>
                </div>
              </div>
              <div className="docs-overview__grid">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="docs-component-card"
                    onClick={() => onSelectComponent(item.id)}
                  >
                    <div className="docs-component-card__meta">
                      <span className={statusClassName(item.status)}>{getStatusLabel(item.status ?? "stable")}</span>
                      <span className="docs-component-card__category">{category.label}</span>
                    </div>
                    <h3 className="docs-component-card__title">{item.title}</h3>
                    <p className="docs-component-card__caption">{item.caption}</p>
                    {item.tags && item.tags.length > 0 ? (
                      <div className="docs-component-card__tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="docs-component-card__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <span className="docs-component-card__cta">View documentation →</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null,
        )
      ) : (
        <div className="docs-card docs-overview__empty">
          <div>
            <h2>No components matched your filters</h2>
            <p>Try a different keyword or choose another category to continue exploring the library.</p>
          </div>
        </div>
      )}
    </div>
  );
};
