import React, { useReducer, Reducer, Context } from 'react';
import { message } from 'antd';
import request from './request';
import download from 'downloadjs';
import { AxiosRequestConfig } from 'axios';

export function tryToParseJson(jsonString: string): any | undefined {
  let json;
  try {
    json = JSON.parse(jsonString);
  } catch (e) {
    // 不是正常的 JSON 字符串，不做任何事。
  }
  return json;
}

/**
 * @name 下载excel
 */
export async function downloadRequest(
  url,
  title?,
  requestOption?: AxiosRequestConfig
) {
  const { data, status, headers } = await request({
    url,
    responseType: 'blob',
    ...requestOption
  });
  const mTitle =
    decodeURIComponent(headers['content-file-original-name'] || '') ||
    (headers['content-disposition'] || '').replace(
      'attachment;filename=',
      ''
    ) ||
    title;
  if (status === 200) {
    download(data, mTitle);
    return true;
  }
  const reader = new FileReader();
  reader.onload = ({ target: { result } }: any) => {
    const res = tryToParseJson(result);
    message.error(res.message);
  };
  // reader.readAsText(data);
}

/**
 * @name 处理搜索条件非空
 * @param values 数据源
 */
export function filterSearchParams(values) {
  delete values.total;
  Object.keys(values).map(item => {
    if (values[item] !== 0 && !values[item]) {
      delete values[item];
    }
  });
  return values;
}