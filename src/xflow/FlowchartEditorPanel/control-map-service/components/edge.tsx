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
import {ArrowMaps, ArrowStrokeMaps, DefaultEdgeConfig, PREFIX} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/constants';
import {type IConfig} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/edge';
import {FlowchartFormWrapper} from '@antv/xflow-extension/es/flowchart-editor-panel/form-wrapper';
import {ColorPicker, InputFiled, InputNumberFiled, SelectField} from './fields';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {intlLocales} from './intl-locales';


const EdgeComponent = (props: any) => {
    const locale = useIntl().locale;

    const {
        config,
        plugin = {}
    } = props;

    const {updateEdge} = plugin;
    const [edgeConfig, setEdgeConfig] = React.useState<IConfig>({
        ...DefaultEdgeConfig,
        ...config,
    });

    React.useEffect(() => {
        setEdgeConfig({
            ...DefaultEdgeConfig,
            ...config,
        });
    }, [config]);

    const getAttrs = (key: string, type = 'line') => {
        const {attrs = {}} = edgeConfig;
        // @ts-ignore
        return attrs[type]?.[key];
    };

    const getArrowValue = () => {
        const {attrs = {}} = edgeConfig;
        const {line = {}} = attrs;
        if (line.sourceMarker?.name && line.targetMarker?.name) {
            return 'all';
        }
        if (!line.sourceMarker?.name && !line.targetMarker?.name) {
            return 'none';
        }
        if (line.sourceMarker?.name) {
            return 'source';
        }
        return 'target';
    };

    const getSrokeDashValue = () => {
        const {attrs = {}} = edgeConfig;
        const {line = {}} = attrs;
        return line.strokeDasharray ? 'dash' : 'solid';
    };

    const onEdgeConfigChange = (key: string, value: number | string | object, type: string = 'line',) => {
        /** 全量更新，简化逻辑 */
        if (key === 'arrow') {
            setEdgeConfig({
                ...edgeConfig,
                attrs: {
                    ...edgeConfig.attrs,
                    [type]: {
                        // @ts-ignore
                        ...edgeConfig.attrs?.[type],
                        ...(value as object),
                    },
                },
            });
        } else {
            setEdgeConfig({
                ...edgeConfig,
                [key]: value,
                attrs: {
                    ...edgeConfig.attrs,
                    [type]: {
                        // @ts-ignore
                        ...edgeConfig.attrs?.[type],
                        [key]: value,
                    },
                },
            });
        }

        updateEdge({
            [key]: value,
        }, type, key === 'arrow' ? 'arrow' : '');
    };

    return (
        <div className={`${PREFIX}-panel-body`}>
            <div className={`${PREFIX}-panel-group`}>
                <h5>
                    {ObjectUtils.firstNotNil(intlLocales.get([locale, 'content']), intlLocales.get(['en_US', 'content']))}
                </h5>
                <InputFiled
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'label']), intlLocales.get(['en_US', 'label']))}
                    value={edgeConfig.label}
                    onChange={value => {
                        onEdgeConfigChange('label', value);
                    }}
                />
            </div>
            <h5 style={{marginBottom: 12}}>
                {ObjectUtils.firstNotNil(intlLocales.get([locale, 'style']), intlLocales.get(['en_US', 'style']))}
            </h5>
            <div className={`${PREFIX}-panel-group`} style={{marginBottom: 0}}>
                <h5>
                    {ObjectUtils.firstNotNil(intlLocales.get([locale, 'line']), intlLocales.get(['en_US', 'line']))}
                </h5>
                <SelectField
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'arrow']), intlLocales.get(['en_US', 'arrow']))}
                    value={getArrowValue()}
                    width='100%'
                    options={[
                        {
                            label: ObjectUtils.firstNotNil(intlLocales.get([locale, 'arrow.target']), intlLocales.get(['en_US', 'arrow.target'])),
                            value: 'target',
                        },
                        {
                            label: ObjectUtils.firstNotNil(intlLocales.get([locale, 'arrow.source']), intlLocales.get(['en_US', 'arrow.source'])),
                            value: 'source',
                        },
                        {
                            label: ObjectUtils.firstNotNil(intlLocales.get([locale, 'arrow.all']), intlLocales.get(['en_US', 'arrow.all'])),
                            value: 'all',
                        },
                        {
                            label: ObjectUtils.firstNotNil(intlLocales.get([locale, 'arrow.none']), intlLocales.get(['en_US', 'arrow.none'])),
                            value: 'none',
                        }
                    ]}
                    onChange={value => {
                        // @ts-ignore
                        onEdgeConfigChange('arrow', ArrowMaps[value], 'line');
                    }}
                />
                <div className={`${PREFIX}-edge-stroke-style`}>
                    <SelectField
                        label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'linear']), intlLocales.get(['en_US', 'linear']))}
                        width={68}
                        value={getSrokeDashValue()}
                        options={[{
                            label: ObjectUtils.firstNotNil(intlLocales.get([locale, 'linear.solid']), intlLocales.get(['en_US', 'linear.solid'])),
                            value: 'solid',
                        }, {
                            label: ObjectUtils.firstNotNil(intlLocales.get([locale, 'linear.dash']), intlLocales.get(['en_US', 'linear.dash'])),
                            value: 'dash',
                        },]}
                        onChange={value => {
                            // @ts-ignore
                            onEdgeConfigChange('strokeDasharray', ArrowStrokeMaps[value], 'line');
                        }}
                    />
                    <InputNumberFiled
                        value={getAttrs('strokeWidth')}
                        min={1}
                        onChange={value => {
                            onEdgeConfigChange('strokeWidth', value, 'line');
                        }}
                    />
                </div>
                <ColorPicker
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'border']), intlLocales.get(['en_US', 'border']))}
                    value={getAttrs('stroke')}
                    onChange={(value: string) => {
                        onEdgeConfigChange('stroke', value, 'line');
                    }}
                />
            </div>
            <div className={`${PREFIX}-panel-group`}>
                <h5>
                    {ObjectUtils.firstNotNil(intlLocales.get([locale, 'label']), intlLocales.get(['en_US', 'label']))}
                </h5>
                <div className={`${PREFIX}-edge-text-style`}>
                    <InputNumberFiled
                        label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'font']), intlLocales.get(['en_US', 'font']))}
                        min={10}
                        width={68}
                        value={getAttrs('fontSize', 'text') || 12}
                        onChange={value => {
                            onEdgeConfigChange('fontSize', value, 'text');
                        }}
                    />
                    <ColorPicker
                        value={getAttrs('fill', 'text') || '#000'}
                        onChange={(value: string) => {
                            onEdgeConfigChange('fill', value, 'text');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};


export const EdgeService: React.FC<any> = (props: any) => {
    return (
        <FlowchartFormWrapper {...props} type='edge'>
            {(config, plugin) => <EdgeComponent {...props} plugin={plugin} config={config}/>}
        </FlowchartFormWrapper>
    );
};
