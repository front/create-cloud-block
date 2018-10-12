/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, components, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';


const { Fragment } = element;
const { __ } = i18n;

// TODO: Chooose components for the sidebar settings
const { PanelBody, FontSizePicker } = components;
const { InspectorControls, PanelColorSettings, RichText } = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  title: {
    type: 'array',
    source: 'children',
    selector: 'h2',
    default: 'My Custom Block',
  },
  fontSize: {
    type: 'number',
  },
  fontColor: {
    type: 'string',
  },
  backgroundColor: {
    type: 'string',
  },
};

const FONT_SIZES = [
  { name: 'small',    shortName: 'S',   size: 28 },
  { name: 'regular',  shortName: 'M',   size: 40 },
  { name: 'large',    shortName: 'L',   size: 56 },
  { name: 'larger',   shortName: 'XL',  size: 72 },
];


export const name = 'simple-block';

export const settings = {
  title: __('My Custom Block'),

  description: __('A custom block for Gutenberg Cloud'),

  icon: 'cover-image',

  attributes: BLOCK_ATTRIBUTES,

  edit ({ attributes, className, setAttributes }) {
    const { title, fontSize, fontColor, backgroundColor } = attributes;
    const containerStyle = {
      backgroundColor,
    };
    const titleStyle = {
      fontSize: fontSize && `${fontSize}px`,
      color: fontColor,
    };

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={ className } style={ containerStyle }>
          <RichText
            tagName="h1" value={ title } style={ titleStyle }
            placeholder="Title"
            onChange={ value => setAttributes({ title: value }) }
            inlineToolbar
          />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={ __('Settings') } initialOpen={ true }>
            <FontSizePicker
              fontSizes={ FONT_SIZES } fallbackFontSize={ 56 } value={ fontSize }
              onChange={ value => setAttributes({ fontSize: value }) }
            />
          </PanelBody>

          <PanelColorSettings
            title={ __('Color Settings') } initialOpen={ false }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: value => setAttributes({ fontColor: value }),
                label: __('Font Color'),
              }, {
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
    const { title, fontSize, fontColor, backgroundColor } = attributes;
    const containerStyle = {
      backgroundColor,
    };
    const titleStyle = {
      fontSize: fontSize && `${fontSize}px`,
      color: fontColor,
    };

    return (
      <div className={ className } style={ containerStyle }>
        <h1 style={ titleStyle }>{ title }</h1>
      </div>
    );
  },
};
