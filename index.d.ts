enum APIResponseCode {
  SystemException = 1001,
  InvalidRequest = 1002,
  TokenExpired = 1009,
  WrongPassword = 1102,
}

type APIResponse<T> = {
  data: T;
  msg: string | null;
  code: APIResponseCode;
};

type Paginated<T> = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalRows: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  result: T[];
};

enum MemberStatus {
  Unconfirmed = 0,
  Active = 1,
}

type Member = {
  token: string;
  clientId: string;
  pushId: string;
  memberId: number;
  account: string;
  accountType: number;
  email: string;
  avatar: string;
  nickname: string;
  country: string;
  gender: number;
  status: MemberStatus;
  enableBiometric: boolean;
};

type MemberAuthLoginResponse = Member;

type MemberMemberGetSettingResponse = {
  enableBlue: boolean;
  enableWifi: boolean;
  enable24Hour: boolean;
  enableThirdMessage: boolean;
  enableShake: boolean;
  enableDeviceMessage: boolean;
  unitType: number;
  enableBiometric: boolean;
  enableDeviceShareNotice: boolean;
};

type MemberAppConfigResponse = {
  appMqttHosts: { host: string; port: number }[];
  deviceMqttHosts: { host: string; port: number }[];
};

type Device = {
  deviceSn: string;
  name: string;
  icon: string;
  productIdentifier: string;
  productName: string;
  roomId: number;
  roomName: string;
  mac: string;
  thirdSn: null;
  cameraId: null;
  softwareVersion: string;
  timezone: string;
  online: boolean;
  surplusGrain: boolean;
  powerType: number;
  powerMode: number;
  electricQuantity: number;
  batteryState: string;
  vacuumState: boolean;
  pumpAirState: boolean;
  vacuumMode: string;
  lowBatteryState: null;
  enableSound: boolean;
  enableLight: boolean;
  enableFeedingPlan: boolean;
  enableAutoUpgrade: boolean;
  nextFeedingDay: null;
  nextFeedingTime: string;
  nextFeedingQuantity: number;
  autoChangeType: null;
  autoThreshold: null;
  wifiRssiLevel: number;
  wifiRssi: number;
  productKey: null;
  useWaterType: null;
  remainingReplacementDays: null;
  remainingCleaningDays: null;
  useWaterInterval: null;
  useWaterDuration: null;
  exceptionMessage: null;
  todayTotalMl: number;
  weightPercent: number;
  weight: number;
  grainOutletState: boolean;
  snowflake: boolean;
  temperature: null;
  platePosition: null;
  deviceShareState: number;
  deviceCloudStorageState: null;
  shareId: null;
  unitType: number;
  enableBatteryPercent: boolean;
  barnDoorState: null;
  barnDoorError: boolean;
  coverOpenMode: null;
  errorState: null;
  doorErrorState: null;
};

type DeviceRealInfo = {
  deviceSn: string;
  mac: string;
  timezone: string;
  hardwareVersion: string;
  softwareVersion: string;
  online: boolean;
  lastOnlineTime: number;
  onlineList: {
    online: boolean;
    ts: number;
  }[];
  wifiSsid: string;
  wifiRssi: number;
  wifiRssiLevel: number;
  powerMode: number;
  autoThreshold: number;
  powerType: number;
  electricQuantity: number;
  batteryState: string;
  surplusGrain: boolean;
  vacuumState: boolean;
  pumpAirState: boolean;
  motorState: number;
  grainOutletState: boolean;
  volume: number;
  enableLight: boolean;
  lightSwitch: boolean;
  lightAgingType: number;
  enableSound: boolean;
  soundSwitch: boolean;
  soundAgingType: number;
  remainingDesiccantDays: number;
  changeDesiccantFrequency: number;
  desiccantNextChangeTime: number;
  weightPercent: number;
  weight: number;
  waterBoxStatus: number;
  calibration: boolean;
  vacuumMode: string;
  snowflake: boolean;
  barnDoorError: boolean;
  runningState: string;
};

type DeviceBaseInfo = {
  deviceSn: string;
  thirdSn: null;
  mac: string;
  batchId: number;
  productId: number;
  productName: string;
  productIdentifier: string;
  icon: string;
  name: string;
  firstCategoryId: number;
  secondCategoryId: number;
  memberId: number;
  timezone: string;
  enableFeedingPlan: boolean;
  enableAutoUpgrade: boolean;
  enableNotice: boolean;
  noticeType: number;
  noticeStartTime: string;
  noticeEndTime: string;
  enableFeedingPlanNotice: boolean;
  enableFeedingPlanAdvanceNotice: boolean;
  feedingPlanAdvanceNoticeTime: number;
  enableSurplusGrainNotice: boolean;
  enableLowBatteryNotice: boolean;
  enablePowerChangeNotice: boolean;
  enableVacuumSuccessNotice: boolean;
  enableVacuumFailedNotice: boolean;
  enableOfflineNotice: boolean;
  offlineNoticeType: number;
  enableGrainOutletBlockedNotice: boolean;
  enableNoGrainOutNotice: boolean;
  enableDrinkingWaterNotice: boolean;
  enableLowWaterNotice: boolean;
  enableFilterReplacementReminder: boolean;
  remainingReplacementDays: number;
  enableMachineCleaningReminder: boolean;
  remainingCleaningDays: number;
  enableTankOverturnedNotice: boolean;
  unitType: number;
  batteryDisplayType: null;
  enableReGrainNotice: boolean;
};

type WorkRecord = {
  id: string;
  productIdentifier: string;
  deviceSn: string;
  type: string;
  eventType: string;
  expectGrainNum: number;
  actualGrainNum: number;
  electricQuantity: null;
  recordTime: number;
  formatRecordTime: string;
  createTime: number;
  alarmTag: boolean;
  content: string;
  totalMl: null;
  drinkTime: null;
};

enum PlanState {
  Upcoming = 1,
  UpcomingDisabled = 2,
  Completed = 3,
  Disabled = 4,
}

type FeedingPlan = {
  planId: number;
  index: number;
  time: string;
  grainNum: number;
  state: PlanState;
  repeat: boolean;
};

type FeedingPlanSchedule = {
  id: number;
  memberId: number;
  productIdentifier: string;
  deviceSn: string;
  executionTime: string;
  repeatDay: string;
  label: string;
  enable: boolean;
  enableAudio: boolean;
  audioTimes: number;
  grainNum: number;
  timezone: string;
  syncState: number;
  createTime: number;
  updateTime: number;
};

type Notifcation = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  eventKey: string;
  description: string;
  content: string;
  read: boolean;
  timezone: string;
  timestamp: number;
  formatTime: string;
  buttons: string;
  param: string;
  productId: number;
  productIdentifier: string;
};

enum ShareType {
  SharedFromMe = 1,
  SharedToMe = 2,
}

type SharedDevice = {
  id: number;
  deviceSn: string;
  productIdentifier: string;
  deviceName: string;
  fromMemberId: number;
  fromAccount: string;
  fromNickname: string;
  fromAvatar: string;
  fromAccountType: number;
  toMemberId: number;
  toAvatar: string;
  toAccount: string;
  toNickname: string;
  toAccountType: number;
  type: ShareType;
  shareWay: number;
  state: number;
  recordState: number;
};

type DeviceRoomSystemRoomsResponse = {
  id: number;
  name: string;
  sortOrder: number;
  importType: string;
}[];

type DeviceDeviceListResponse = Device[];

type DeviceDeviceRealInfoResponse = DeviceRealInfo;

type DeviceDataGrainStatusResponse = {
  todayFeedingQuantitues: number[];
  todayFeedingTimes: number;
  todayFeedingQuantity: number;
};

type DeviceWorkRecordListResponse = {
  recordTime: string;
  dayOfWeek: number;
  workRecords: WorkRecord[];
}[];

type DeviceFeedingPlanTodayNewResponse = {
  plans: FeedingPlan[];
  allExpired: boolean;
  allSkipped: boolean;
};

type DeviceFeedingPlanListResponse = FeedingPlanSchedule[];

type DeviceMsgUnreadQuantityResponse = {
  device: number;
  notify: number;
};
