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
import {PREFIX} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/constants';
import {DefaultNodeConfig} from '@antv/xflow-extension/es/flowchart-node-panel';
import {FlowchartFormWrapper} from '@antv/xflow-extension/es/flowchart-editor-panel/form-wrapper';
import {type IConfig} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/node';
import {ColorPicker, InputFiled, InputNumberFiled, Position, Size} from './fields';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {intlLocales} from './intl-locales';


const NodeComponent = (props: any) => {
    const locale = useIntl().locale;

    const {
        config,
        plugin = {}
    } = props;

    const {updateNode} = plugin;
    const [nodeConfig, setNodeConfig] = React.useState<IConfig>({
        ...DefaultNodeConfig,
        ...config,
    });

    const onNodeConfigChange = (key: string, value: number | string) => {
        setNodeConfig({
            ...nodeConfig,
            [key]: value,
        });
        updateNode({
            [key]: value,
        });
    };

    React.useEffect(() => {
        setNodeConfig({
            ...DefaultNodeConfig,
            ...config,
        });
    }, [config]);

    return (
        <div className={`${PREFIX}-panel-body`}>
            <div className={`${PREFIX}-panel-group`}>
                <h5>
                    {ObjectUtils.firstNotNil(intlLocales.get([locale, 'content']), intlLocales.get(['en_US', 'content']))}
                </h5>
                <InputFiled
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'title']), intlLocales.get(['en_US', 'title']))}
                    value={nodeConfig.label}
                    onChange={value => {
                        onNodeConfigChange('label', value);
                    }}
                />
            </div>
            <div className={`${PREFIX}-panel-group`}>
                <h5>
                    {ObjectUtils.firstNotNil(intlLocales.get([locale, 'style']), intlLocales.get(['en_US', 'style']))}
                </h5>
                <Position
                    x={nodeConfig.x}
                    y={nodeConfig.y}
                    onChange={(key, value) => {
                        onNodeConfigChange(key, value);
                    }}
                />
                <Size
                    width={nodeConfig.width}
                    height={nodeConfig.height}
                    onChange={(key, value) => {
                        onNodeConfigChange(key, value);
                    }}
                />
                <ColorPicker
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'fill']), intlLocales.get(['en_US', 'fill']))}
                    value={nodeConfig.fill}
                    onChange={(value: string) => {
                        onNodeConfigChange('fill', value);
                    }}
                />
                <ColorPicker
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'border']), intlLocales.get(['en_US', 'border']))}
                    value={nodeConfig.stroke}
                    onChange={(value: string) => {
                        onNodeConfigChange('stroke', value);
                    }}
                />
                <div className={`${PREFIX}-node-text-style`}>
                    <InputNumberFiled
                        label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'font']), intlLocales.get(['en_US', 'font']))}
                        value={nodeConfig.fontSize}
                        width={68}
                        onChange={value => {
                            onNodeConfigChange('fontSize', value);
                        }}
                    />
                    <ColorPicker
                        value={nodeConfig.fontFill}
                        onChange={(value: string) => {
                            onNodeConfigChange('fontFill', value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};


export const NodeService: React.FC<any> = (props: any) => {
    return (
        <FlowchartFormWrapper {...props}>
            {(config, plugin) => <NodeComponent {...props} plugin={plugin} config={config}/>}
        </FlowchartFormWrapper>
    );
};
