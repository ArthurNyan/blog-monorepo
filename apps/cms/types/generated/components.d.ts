import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    description: Schema.Attribute.Text;
    primaryButtonLabel: Schema.Attribute.String;
    primaryButtonUrl: Schema.Attribute.String;
    secondaryButtonLabel: Schema.Attribute.String;
    secondaryButtonUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.faq-item', true>;
  };
}

export interface BlocksFeatureCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_cards';
  info: {
    displayName: 'Feature cards';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.feature-card-item', true>;
  };
}

export interface BlocksFeatureHighlight extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_highlights';
  info: {
    displayName: 'Feature highlight';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.feature-card-item', true>;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos' | 'files'>;
    primaryButtonLabel: Schema.Attribute.String;
    primaryButtonUrl: Schema.Attribute.String;
    secondaryButtonLabel: Schema.Attribute.String;
    secondaryButtonUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksLogoCloud extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_clouds';
  info: {
    displayName: 'Logo cloud';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.logo-item', true>;
  };
}

export interface BlocksPreviewList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_preview_lists';
  info: {
    displayName: 'Preview list';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    limit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    source: Schema.Attribute.Enumeration<
      ['articles', 'projects', 'vacancies']
    > &
      Schema.Attribute.Required;
  };
}

export interface BlocksProcessTimeline extends Struct.ComponentSchema {
  collectionName: 'components_blocks_process_timelines';
  info: {
    displayName: 'Process timeline';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.process-step', true>;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    displayName: 'Rich text';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    heading: Schema.Attribute.String;
  };
}

export interface BlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats';
  info: {
    displayName: 'Stats';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.stat-item', true>;
  };
}

export interface BlocksTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.testimonial-item', true>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FAQ item';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureCardItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_card_items';
  info: {
    displayName: 'Feature card item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_logo_items';
  info: {
    displayName: 'Logo item';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_steps';
  info: {
    displayName: 'Process step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    stepLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Basic SEO and Open Graph fields for marketing pages';
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'Stat item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_items';
  info: {
    displayName: 'Testimonial item';
  };
  attributes: {
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    authorRole: Schema.Attribute.String;
    avatar: Schema.Attribute.Media<'images'>;
    company: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.cta': BlocksCta;
      'blocks.faq': BlocksFaq;
      'blocks.feature-cards': BlocksFeatureCards;
      'blocks.feature-highlight': BlocksFeatureHighlight;
      'blocks.hero': BlocksHero;
      'blocks.logo-cloud': BlocksLogoCloud;
      'blocks.preview-list': BlocksPreviewList;
      'blocks.process-timeline': BlocksProcessTimeline;
      'blocks.rich-text': BlocksRichText;
      'blocks.stats': BlocksStats;
      'blocks.testimonials': BlocksTestimonials;
      'shared.faq-item': SharedFaqItem;
      'shared.feature-card-item': SharedFeatureCardItem;
      'shared.logo-item': SharedLogoItem;
      'shared.process-step': SharedProcessStep;
      'shared.seo': SharedSeo;
      'shared.stat-item': SharedStatItem;
      'shared.testimonial-item': SharedTestimonialItem;
    }
  }
}
