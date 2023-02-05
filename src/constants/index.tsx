import React from 'react'
import {
  HomeOutlined,
  AppstoreOutlined,
  CodeSandboxOutlined,
  BarcodeOutlined,
  FileSearchOutlined,
  MedicineBoxOutlined,
  TransactionOutlined,
  WalletOutlined,
  PayCircleOutlined,
  BankOutlined,
  NodeIndexOutlined,
  SolutionOutlined,
  ExperimentOutlined,
  CloudOutlined,
  ShoppingOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  FieldTimeOutlined,
  SafetyCertificateOutlined,
  FundProjectionScreenOutlined,
  OneToOneOutlined,
  ControlOutlined,
  TagsOutlined
} from '@ant-design/icons';

export const MENU_TARGET_BRAND = {
  '/': '控制台',
  '/home': '控制台主页',
  '/insurance': '疾病预防 - 药品和医保',
  '/crawl_task': '疾病预防 - 数据爬取',
  '/settings': '个人设置',
  '/account_safe': '账号与安全',
  '/plugin_market': '插件市场'
} as any

export const MENU_ROUTER = [
  { label: '家庭概览', icon: <HomeOutlined />, key: 'HOME', },
  {
    label: '资金中心',
    icon: <WalletOutlined />,
    key: 'FINANCE',
    children: [
      { label: '理财', icon: <PayCircleOutlined />, key: 'FUND', },
      { label: '借还', icon: <TransactionOutlined />, key: 'CIRCULATE', },
    ]
  },
  {
    label: '房屋与车辆',
    icon: <CodeSandboxOutlined />,
    key: 'HOUSE',
    children: [
      { label: '公积金与房屋', icon: <BankOutlined />, key: 'ACCUMULATION_FUND', },
      { label: '车与车贷', icon: <NodeIndexOutlined />, key: 'VEHICLE', },
      { label: '生活费用', icon: <MoneyCollectOutlined />, key: 'LIVING_EXPENSES', },
    ]
  },
  {
    label: '疾病预防',
    icon: <MedicineBoxOutlined />,
    key: 'MEDICINE',
    children: [
      { label: '药品和医保', icon: <BarcodeOutlined />, key: 'INSURANCE', },
      { label: '生病记录', icon: <FileSearchOutlined />, key: 'FALL_ILL', },
      { label: '新冠监测', icon: <ExperimentOutlined />, key: 'COVID-19', },
      // 管理员权限 涉及数据爬取
      { label: '数据爬取', icon: <FieldTimeOutlined />, key: 'CRAWL_TASK', },
    ]
  },
  { label: '健身训练', icon: <FundProjectionScreenOutlined />, key: 'FITNESS_TRAINING', },
  { label: '身体数据', icon: <SolutionOutlined />, key: 'PHYSICAL_DATA', },
  {
    label: '球鞋管理',
    icon: <AppstoreOutlined />,
    key: 'GYM_SHOES',
    children: [
      { label: '球鞋服务', icon: <ShoppingOutlined />, key: 'SHOE_SERVICE', },
      // 管理员权限 涉及数据爬取
      { label: '追鞋订阅', icon: <CloudOutlined />, key: 'TRACKING_SUBSCRIPTION', },
    ]
  },
  {
    label: '设置',
    icon: <SettingOutlined />,
    key: 'SETTINGS',
    children: [
      { label: '账号与安全', icon: <SafetyCertificateOutlined />, key: 'ACCOUNT_SAFE', },
      { label: '插件市场', icon: <TagsOutlined />, key: 'PLUGIN_MARKET', },
      { label: '家庭环境设置中心', icon: <OneToOneOutlined />, key: 'FALL_ILL', },
      // 家庭圈管理员权限 涉及数据爬取
      { label: '家庭圈设置', icon: <ControlOutlined />, key: 'COVID-19', },
    ]
  },
];

/**
 * 药品类型
 */
export const DRUG_TYPE = [
  { value: 'OTC', label: '非处方药' },
  { value: 'prescription', label: '处方药' },
  { value: 'health_products', label: '保健品' },
  { value: 'Chinese_medicine', label: '中药' },
]


/** 支付方式 */
export const PAY_TYPE = [
  { value: 'cash', label: '现金支付' },
  { value: 'online_banking', label: '网上支付' },
  { value: 'medical_insurance', label: '医保支付' },
  { value: 'payment_behalf', label: '代付' },
]


/** 关联家庭圈 */
export const FAMILY_CIRCLE = [
  { value: '1', label: '关联' },
  { value: '0', label: '不关联' },
]

/** 药品状态 */
export const DRUG_VALUEENUM = {
  all: {
    text: '全部',
    status: 'all',
  },
  overdue: {
    text: '过期',
    status: 'overdue',
  },
  available: {
    text: '可用',
    status: 'available',
  },
  procurement: {
    text: '采购中',
    status: 'procurement',
  },
  warning: {
    text: '警告',
    status: 'warning',
  },
} as any;
