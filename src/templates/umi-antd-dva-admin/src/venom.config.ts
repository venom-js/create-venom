import { VenomBasicConfig } from './types/venom';

const venomBasicConfig: Partial<VenomBasicConfig> = {
  title: 'create venom',
  headerHeight: 64,
  siderWidth: 256,
  contentBg: '#eee',
  footerBg: '#fff',
  theme: 'dark',
  layout: 'sider',
  siderMultiple: true,
  fixHeader: true,
  fixSider: true,
  contentWidthMode: 'fixed'
};

export default venomBasicConfig;
