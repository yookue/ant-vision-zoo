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
import {Item} from '@antv/xflow-extension/es/flowchart-editor-panel/control-map-service/components/fields/position';
import {ObjectUtils} from '@yookue/ts-lang-utils';
import {intlLocales} from '../intl-locales';


export interface IProps {
    width?: number;
    height?: number;
    label?: string;
    onChange?: (key: string, value: number) => void;
}


const Size: React.FC<IProps> = (props: IProps) => {
    const locale = useIntl().locale;

    const {
        width,
        height,
        label = ObjectUtils.firstNotNil(intlLocales.get([locale, 'size']), intlLocales.get(['en_US', 'size'])),
        onChange
    } = props;

    return (
        <div className='group'>
            <label>{label}</label>
            <div className='split'>
                <Item
                    addonBefore='W'
                    value={width}
                    onChangeItem={(value: number) => {
                        onChange?.('width', value);
                    }}
                />
                <Item
                    addonBefore='H'
                    value={height}
                    onChangeItem={(value: number) => {
                        onChange?.('height', value);
                    }}
                />
            </div>
        </div>
    );
};


export default Size;
