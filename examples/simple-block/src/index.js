
import { blocks, data, i18n } from 'wp';
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;

// Import each block
import * as hero from './my-simple-block';


// Category name and slug
const category = {
  slug: 'cloudblocks', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('Gutenberg-Cloud Blocks'),
};

// Register the new category and blocks
export function registerBlocks () {
  // Add the new category to the list
  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

  // Register each block
  registerBlockType(`${category.slug}/${hero.name}`, { category: category.slug, ...hero.settings });
}

registerBlocks();
