export enum APIResponseCode {
  Success = 0,
  SystemException = 1001,
  InvalidRequest = 1002,
  TokenExpired = 1009,
  WrongPassword = 1102,
}

export enum MemberStatus {
  Unconfirmed = 0,
  Active = 1,
}

export enum PlanState {
  EnabledUpcoming = 1,
  DisabledUpcoming = 2,
  EnabledCompleted = 3,
  DisabledCompleted = 4,
}

export enum ShareType {
  SharedFromMe = 1,
  SharedToMe = 2,
}

export enum DayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export enum GrainUnit {
  TwelthsOfCup = 1,
  NoughtPointThreeFiveOunces = 2,
  TenGrams = 3,
  TwentyMl = 4,
}
