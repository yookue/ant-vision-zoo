/*
 * Copyright (c) 2025 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */


import React from 'react';
import {useIntl} from '@ant-design/pro-provider';
import {type ICanvasScaleToolbarProps} from '@antv/xflow-extension/es/canvas-scale-toolbar';
import {CanvasToolbar} from '@antv/xflow-extension/es/canvas-toolbar';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import omit from 'rc-util/es/omit';
import {useScaleToolbarConfig} from './use-config';
import {intlLocales} from './intl-locales';


export type IntlLocaleProps = {
    /**
     * @description Zoom In
     * @description.zh-CN 放大
     * @description.zh-TW 放大
     */
    zoomIn?: string;

    /**
     * @description Zoom Out
     * @description.zh-CN 缩小
     * @description.zh-TW 縮小
     */
    zoomOut?: string;

    /**
     * @description Scale to Actual Size
     * @description.zh-CN 缩放到实际大小
     * @description.zh-TW 縮放到實際大小
     */
    scaleToOne?: string;

    /**
     * @description Scale to Fit Screen
     * @description.zh-CN 缩放到适应屏幕
     * @description.zh-TW 縮放到適應屏幕
     */
    scaleToFit?: string;

    /**
     * @description Fullscreen
     * @description.zh-CN 全屏
     * @description.zh-TW 全屏
     */
    requestFullscreen?: string;

    /**
     * @description Exit Fullscreen
     * @description.zh-CN 退出全屏
     * @description.zh-TW 退出全屏
     */
    exitFullscreen?: string;
};


export type CanvasScaleToolbarProps = ICanvasScaleToolbarProps & {
    /**
     * @description The locale of the component, e.g. 'en_US'
     * @description.zh-CN 组件的语言, e.g. 'zh_CN'
     * @description.zh-TW 組件的語言, e.g. 'zh_TW'
     */
    locale?: string;

    /**
     * @description The props of locale
     * @description.zh-CN 多语言属性
     * @description.zh-TW 多語言屬性
     */
    localeProps?: IntlLocaleProps;
};


/**
 * Component for displaying a canvas scale toolbar
 *
 * @author David Hsing
 */
export const CanvasScaleToolbar: React.FC<CanvasScaleToolbarProps> = (props?: CanvasScaleToolbarProps) => {
    const intlType = useIntl();

    // Initialize the default props
    const {
        layout = 'vertical',
        position = {
            top: 12,
            right: 12,
        },
        locale = intlType.locale,
    } = props ?? {};

    const toolbarConfig = useScaleToolbarConfig({
        zoomIn: ObjectUtils.firstNotNil(props?.localeProps?.zoomIn, intlLocales.get([locale, 'zoomIn']), intlLocales.get(['en_US', 'zoomIn'])),
        zoomOut: ObjectUtils.firstNotNil(props?.localeProps?.zoomOut, intlLocales.get([locale, 'zoomOut']), intlLocales.get(['en_US', 'zoomOut'])),
        scaleToOne: ObjectUtils.firstNotNil(props?.localeProps?.scaleToOne, intlLocales.get([locale, 'scaleToOne']), intlLocales.get(['en_US', 'scaleToOne'])),
        scaleToFit: ObjectUtils.firstNotNil(props?.localeProps?.scaleToFit, intlLocales.get([locale, 'scaleToFit']), intlLocales.get(['en_US', 'scaleToFit'])),
        requestFullscreen: ObjectUtils.firstNotNil(props?.localeProps?.requestFullscreen, intlLocales.get([locale, 'requestFullscreen']), intlLocales.get(['en_US', 'requestFullscreen'])),
        exitFullscreen: ObjectUtils.firstNotNil(props?.localeProps?.exitFullscreen, intlLocales.get([locale, 'exitFullscreen']), intlLocales.get(['en_US', 'exitFullscreen'])),
    });

    const restProps = !props ? {} : omit(props, ['layout', 'position', 'locale', 'localeProps']);

    return (
        <CanvasToolbar
            config={toolbarConfig}
            layout={layout}
            position={position}
            {...restProps}
        />
    );
};
