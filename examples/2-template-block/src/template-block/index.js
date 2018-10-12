/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';


const { Fragment } = element;
const { __ } = i18n;

// TODO: Chooose components for the sidebar settings
const { InspectorControls, PanelColorSettings, InnerBlocks } = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  backgroundColor: {
    type: 'string',
  },
};

// TODO: Define a template of the inner blocks
const TEMPLATE = [
  ['core/heading', {
    placeholder: 'Title',
    content: 'My Custom Block',
    level: 1,
  }],
];


export const name = 'template-block';

export const settings = {
  title: __('My Template Block'),

  description: __('A template block for Gutenberg Cloud'),

  icon: 'cover-image',

  attributes: BLOCK_ATTRIBUTES,

  edit ({ attributes, className, setAttributes }) {
    const { backgroundColor } = attributes;
    const containerStyle = {
      backgroundColor,
    };

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={ className } style={ containerStyle }>
          <InnerBlocks template={ TEMPLATE } templateLock={ false } />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelColorSettings
            title={ __('Color Settings') } initialOpen={ false }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Background Color'),
              },
            ] } />
        </InspectorControls>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const { backgroundColor } = attributes;
    const containerStyle = {
      backgroundColor,
    };

    return (
      <div className={ className } style={ containerStyle }>
        <InnerBlocks.Content />
      </div>
    );
  },
};
