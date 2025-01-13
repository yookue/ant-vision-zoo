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
import {DefaultNodeConfig} from '@antv/xflow-extension/es/flowchart-node-panel';
import {PREFIX} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/constants';
import {type IConfig} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/node';
import {FlowchartFormWrapper} from '@antv/xflow-extension/es/flowchart-editor-panel/form-wrapper';
import {ColorPicker, InputFiled, InputNumberFiled, Position, Size} from './fields';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {intlLocales} from './intl-locales';


const GroupComponent = (props: any) => {
    const locale = useIntl().locale;

    const {
        config,
        plugin = {}
    } = props;

    const {updateGroup} = plugin;
    const [groupConfig, setGroupConfig] = React.useState<IConfig>({
        ...DefaultNodeConfig,
        ...config,
    });

    const onGroupConfigChange = (key: string, value: number | string) => {
        setGroupConfig({
            ...groupConfig,
            [key]: value,
        });
        updateGroup({
            [key]: value,
        });
    };

    React.useEffect(() => {
        setGroupConfig({
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
                    value={groupConfig.label}
                    onChange={value => {
                        onGroupConfigChange('label', value);
                    }}
                />
            </div>
            <div className={`${PREFIX}-panel-group`}>
                <h5>
                    {ObjectUtils.firstNotNil(intlLocales.get([locale, 'style']), intlLocales.get(['en_US', 'style']))}
                </h5>
                <Position
                    x={groupConfig.x}
                    y={groupConfig.y}
                    onChange={(key, value) => {
                        onGroupConfigChange(key, value);
                    }}
                />
                <Size
                    width={groupConfig.width}
                    height={groupConfig.height}
                    onChange={(key, value) => {
                        onGroupConfigChange(key, value);
                    }}
                />
                <ColorPicker
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'fill']), intlLocales.get(['en_US', 'fill']))}
                    value={groupConfig.fill}
                    onChange={(value: string) => {
                        onGroupConfigChange('fill', value);
                    }}
                />
                <ColorPicker
                    label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'border']), intlLocales.get(['en_US', 'border']))}
                    value={groupConfig.stroke}
                    onChange={(value: string) => {
                        onGroupConfigChange('stroke', value);
                    }}
                />
                <div className={`${PREFIX}-node-text-style`}>
                    <InputNumberFiled
                        label={ObjectUtils.firstNotNil(intlLocales.get([locale, 'font']), intlLocales.get(['en_US', 'font']))}
                        value={groupConfig.fontSize}
                        width={68}
                        onChange={value => {
                            onGroupConfigChange('fontSize', value);
                        }}
                    />
                    <ColorPicker
                        value={groupConfig.fontFill}
                        onChange={(value: string) => {
                            onGroupConfigChange('fontFill', value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};


export const GroupService: React.FC<any> = (props: any) => {
    return (
        <FlowchartFormWrapper {...props}>
            {(config, plugin) => <GroupComponent {...props} plugin={plugin} config={config}/>}
        </FlowchartFormWrapper>
    );
};
