type UnixTimestamp = number;

type APIResponse<T> = {
  data: T;
  msg: string | null;
  code: import("./src/constants").APIResponseCode;
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
  status: import("./src/constants").MemberStatus;
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
  unitType: import("./src/constants").GrainUnit;
  enableBiometric: boolean;
  enableDeviceShareNotice: boolean;
};

type MemberAppConfigResponse = {
  appMqttHosts: { host: string; port: number }[];
  deviceMqttHosts: { host: string; port: number }[];
};

type MemberPetListResponse = {
  petLimit: number;
  petList: [];
};

type MemberThirdTutkInfoResponse = {
  userToken: string;
  appTutkUrl: string;
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
  unitType: import("./src/constants").GrainUnit;
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
  unitType: import("./src/constants").GrainUnit;
  batteryDisplayType: null;
  enableReGrainNotice: boolean;
};

type DeviceSettingGetAttributeSettingResponse = {
  deviceSn: string;
  lightSwitch: boolean;
  lightAgingType: number;
  lightingStartTime: null;
  lightingEndTime: null;
  soundSwitch: boolean;
  soundAgingType: number;
  soundStartTime: null;
  soundEndTime: null;
  volume: number;
  powerMode: number;
  autoChangeType: null;
  autoThreshold: number;
  enableAutoUpgrade: boolean;
  enableBatteryPercent: boolean;
  cameraSwitch: null;
  cameraAgingType: null;
  cameraStartTime: null;
  cameraEndTime: null;
  resolution: null;
  nightVision: null;
  videoRecordSwitch: null;
  videoRecordMode: null;
  videoRecordAgingType: null;
  videoRecordStartTime: null;
  videoRecordEndTime: null;
  feedingVideoSwitch: null;
  enableVideoStartFeedingPlan: null;
  enableVideoAfterManualFeeding: null;
  beforeFeedingPlanTime: null;
  automaticRecording: null;
  afterManualFeedingTime: null;
  videoWatermarkSwitch: null;
  motionDetectionSwitch: null;
  motionDetectionAgingType: null;
  motionDetectionStartTime: null;
  motionDetectionEndTime: null;
  motionDetectionSensitivity: null;
  motionDetectionRange: null;
  soundDetectionSwitch: null;
  soundDetectionAgingType: null;
  soundDetectionStartTime: null;
  soundDetectionEndTime: null;
  soundDetectionSensitivity: null;
  enableSleepMode: null;
  enableSleepSound: null;
  enableSleepLight: null;
  enableSleepAutoVacuum: null;
  sleepStartTime: null;
  sleepEndTime: null;
  enableDeviceShare: boolean;
  coverOpenMode: null;
  coverClosePosition: null;
  coverCloseSpeed: null;
  enableScreenDisplay: null;
  screenDisplaySwitch: null;
  screenDisplayAgingType: null;
  screenDisplayStartTime: null;
  screenDisplayEndTime: null;
  screenDisplayInterval: null;
  childLockSwitch: null;
  childLockLockDuration: null;
  childLockUnlockDuration: null;
  closeDoorTime: null;
  closeDoorTimeSec: null;
  errorState: null;
  doorErrorState: null;
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
  recordTime: UnixTimestamp;
  formatRecordTime: string;
  createTime: number;
  alarmTag: boolean;
  content: string;
  totalMl: null;
  drinkTime: null;
};

type FeedingPlanToday = {
  planId: number;
  index: number;
  time: string;
  grainNum: number;
  state: import("./src/constants").PlanState;
  repeat: boolean;
};

type FeedingPlan = {
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
  type: import("./src/constants").ShareType;
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
  plans: FeedingPlanToday[];
  allExpired: boolean;
  allSkipped: boolean;
};

type DeviceFeedingPlanListResponse = FeedingPlan[];

type DeviceMsgUnreadQuantityResponse = {
  device: number;
  notify: number;
};

type DeviceDeviceAudioAllResponse = {
  systemAudio: {
    id: number;
    url: string;
    name: string;
    md5: string;
    duration: number;
    used: boolean;
  }[];
  customerAudio: {
    id: number;
    url: string;
    name: string;
    md5: string;
    duration: number;
    used: boolean;
  }[];
};

type MallDeviceCloudStorageStateResponse = {
  cloudStorageId: null;
  contactId: string;
  deviceSn: string;
  name: string;
  productIdentifier: string;
  cloudStorageState: string;
  remainingDay: null;
  startTime: null;
  endTime: null;
  orderId: null;
  skuId: null;
  payType: null;
  appleProductId: null;
  googleProductId: null;
  rollingStorageDay: null;
};

type DataDataRealInfoResponse = {
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