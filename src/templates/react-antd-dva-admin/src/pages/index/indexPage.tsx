/**
 * @name 根路由
 */
import { Redirect } from 'react-router';
import React from 'react';
import PageLayout from 'src/components/page-layout';
import SearchTable from 'src/components/search-table';
import { ColumnProps } from 'antd/lib/table';
import { defaultColumnProps } from 'racc';
import { Button } from 'antd/lib/radio';
import SearchTableFilter from 'src/components/search-table/table-filters/SearchTableFilter';
import useSearchTableState, {
  SearchTableState
} from 'src/components/search-table/useSearchTableFilter';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0'
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1'
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2'
      }
    ]
  }
];

function getColumns(
  state: InitState,
  setState: (state: Partial<InitState>) => void
): ColumnProps<any>[] {
  return [
    {
      ...defaultColumnProps,
      title: '赠品',
      dataIndex: 'unShelves',
      render: (text, row, index) => index + 1,
      filterDropdown: () => (
        <SearchTableFilter
          title="赠品"
          dataIndex="unShelves"
          type="single"
          dataSource={[{ label: 'xx', value: 1 }]}
          setState={setState}
          state={state}
        />
      ),
      onFilterDropdownVisibleChange: open => setState({ open })
    },
    {
      ...defaultColumnProps,
      title: '上架日期',
      dataIndex: 'date',
      render: (text, row, index) => index + 1,
      filterDropdown: () => (
        <SearchTableFilter
          title="上架日期"
          dataIndex="date"
          type="date"
          setState={setState}
          state={state}
        />
      ),
      onFilterDropdownVisibleChange: open => setState({ open })
    },
    {
      ...defaultColumnProps,
      title: '部门',
      dataIndex: 'department',
      filterDropdown: () => (
        <SearchTableFilter
          title="部门"
          type="multiple"
          dataSource={treeData}
          dataIndex="department"
          setState={setState}
          state={state}
        />
      ),
      onFilterDropdownVisibleChange: open => setState({ open })
    }
  ];
}

const getInitState = () => ({
  checkedKeys: []
});
type InitState = ReturnType<typeof getInitState> & SearchTableState;

const IndexPage: React.FC = props => {
  const [state, setState] = useSearchTableState<InitState>(getInitState());
  const url = '';
  return url ? (
    <Redirect to={url} />
  ) : (
    <PageLayout title="Hello World">
      <SearchTable
        setFilterParams={filterParams => setState({ filterParams })}
        filterParams={state.filterParams}
        ajxaProps={{ url: '', method: 'GET' }}
        placeholder="请输入"
        title="I Am Title"
        description="i am description......."
        tableProps={{
          columns: getColumns(state, setState),
          dataSource: [{ date1: '1' }]
        }}
        checkable={true}
        tableAciton={<Button>1</Button>}
        searchAction={<Button>1</Button>}
        dateKeys={{ date: ['star', 'end'] }}
      />
    </PageLayout>
  );
};

export default IndexPage;
