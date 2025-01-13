/*
 * Copyright (c) 2025 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License (the "License")
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


import {MODELS, type IToolbarGroupOptions, type IToolbarItemOptions} from '@antv/xflow-core';
import {createToolbarConfig} from '@antv/xflow-extension/es/canvas-toolbar';
import {CANVAS_SCALE_TOOLBAR_CONFIG} from '@antv/xflow-extension/es/canvas-scale-toolbar';
import omit from 'rc-util/es/omit';
import {type IntlLocaleProps} from './index';


const processToolbarLocale = (options: IToolbarGroupOptions[], localeProps?: IntlLocaleProps, fullscreen?: boolean) => {
    if (!localeProps) {
        return options;
    }
    const idTooltips: ReadonlyMap<string, string | undefined> = new Map<string, string | undefined>([
        [CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_IN, localeProps.zoomIn],
        [CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_OUT, localeProps.zoomOut],
        [CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_ONE, localeProps.scaleToOne],
        [CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_FIT, localeProps.scaleToFit],
        [CANVAS_SCALE_TOOLBAR_CONFIG.FULLSCREEN, fullscreen ? localeProps.exitFullscreen : localeProps.requestFullscreen],
    ]);
    return options.map((group: IToolbarGroupOptions) => {
        const omitGroupProps = omit(group, ['items']);
        return {
            items: group.items.map((item: IToolbarItemOptions) => {
                const omitItemProps = omit(item, ['tooltip']);
                return {
                    tooltip: idTooltips.get(item.id) ?? item.tooltip,
                    ...omitItemProps,
                };
            }),
            ...omitGroupProps,
        };
    });
};


export const useScaleToolbarConfig = (localeProps?: IntlLocaleProps) => {
    const invoker = createToolbarConfig(config => {
        config.setToolbarModelService(async (toolbarModel, modelService) => {
            const scaleValue = await MODELS.GRAPH_SCALE.useValue(modelService);
            toolbarModel.setValue((modal) => {
                modal.mainGroups = processToolbarLocale(CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
                    zoomFactor: scaleValue.zoomFactor,
                }), localeProps);
            });
            const scaleModel = await MODELS.GRAPH_SCALE.getModel(modelService);
            scaleModel.watch(async (scale) => {
                const fullscreen = await MODELS.GRAPH_FULLSCREEN.useValue(modelService);
                toolbarModel.setValue(modal => {
                    modal.mainGroups = processToolbarLocale(CANVAS_SCALE_TOOLBAR_CONFIG.getToolbarConfig({
                        zoomFactor: scale.zoomFactor,
                        fullscreen,
                    }), localeProps, fullscreen);
                });
            });
        });
    });
    return invoker();
};
