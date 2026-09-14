/**
 * Blog internal linking (перелинковка) configuration.
 * Maps blog slug bases to related articles and their corresponding tool page.
 */

export interface BlogRelation {
  /** Slug bases of related blog articles (without locale suffix) */
  relatedSlugs: string[];
  /** Tool page slug for the "Try the Tool" CTA */
  toolPage?: string;
  /** i18n key for the tool page name (from hub.service.*) */
  toolNameKey?: string;
}

/**
 * Blog slug base → relation config.
 * The slug base is the part before the locale suffix (e.g., "whatsapp-without-saving-number").
 */
export const blogRelations: Record<string, BlogRelation> = {
  'whatsapp-without-saving-number': {
    relatedSlugs: ['whatsapp-link-generator', 'whatsapp-widget-website', 'whatsapp-text-formatting'],
    toolPage: 'whatsapp',
    toolNameKey: 'hub.service.whatsapp.title',
  },
  'whatsapp-link-generator': {
    relatedSlugs: ['whatsapp-without-saving-number', 'whatsapp-widget-website'],
    toolPage: 'wa-link',
    toolNameKey: 'hub.service.walink.title',
  },
  'whatsapp-text-formatting': {
    relatedSlugs: ['whatsapp-without-saving-number'],
    toolPage: 'whatsapp-text-formatter',
    toolNameKey: 'hub.service.formatter.title',
  },
  'whatsapp-widget-website': {
    relatedSlugs: ['whatsapp-without-saving-number', 'whatsapp-link-generator'],
    toolPage: 'wa-widget',
    toolNameKey: 'hub.service.wawidget.title',
  },
  'telegram-without-saving-number': {
    relatedSlugs: [],
    toolPage: 'telegram',
    toolNameKey: 'hub.service.telegram.title',
  },
  'pomodoro-timer-guide': {
    relatedSlugs: [],
    toolPage: 'pomodoro',
    toolNameKey: 'hub.service.pomodoro.title',
  },
};

/**
 * Given a blog slug (e.g., "whatsapp-without-saving-number-ru"),
 * extract the slug base and find its relations.
 */
export function getBlogRelations(slug: string): BlogRelation | null {
  // Try to match the slug base by removing locale suffix
  const localeSuffixes = ['-ru', '-es', '-pt', '-id', '-de', '-ar'];
  let base = slug;
  for (const suffix of localeSuffixes) {
    if (slug.endsWith(suffix)) {
      base = slug.slice(0, -suffix.length);
      break;
    }
  }
  return blogRelations[base] || null;
}

/**
 * Given a slug base and a lang, construct the full slug for that locale.
 */
export function getLocalizedSlug(base: string, lang: string): string {
  if (lang === 'en') return base;
  return `${base}-${lang}`;
}
