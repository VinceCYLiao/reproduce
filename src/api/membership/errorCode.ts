import { ApiErrorCode } from "@/hooks/useFetcher";

export enum Category {
  ALL_IN_ONE = "AllInOne",
  LOGIN = "Login",
}

export enum AllInOneErrorCode {
  CUSTOMER_INFO_NOT_FOUND = "CUSTOMER_INFO_NOT_FOUND",
}

export enum LoginErrorCode {
  CONTINUOUSLY_LOGIN_ERROR_1_TIMES = "CONTINUOUSLY_LOGIN_ERROR_1_TIMES",
  CONTINUOUSLY_LOGIN_ERROR_2_TIMES = "CONTINUOUSLY_LOGIN_ERROR_2_TIMES",
  CONTINUOUSLY_LOGIN_ERROR_3_TIMES = "CONTINUOUSLY_LOGIN_ERROR_3_TIMES",
  CONTINUOUSLY_LOGIN_ERROR_4_TIMES = "CONTINUOUSLY_LOGIN_ERROR_4_TIMES",
  CONTINUOUSLY_LOGIN_ERROR_5_TIMES = "CONTINUOUSLY_LOGIN_ERROR_5_TIMES",
  ABNORMAL_LOGOUT = "ABNORMAL_LOGOUT",
  MEMBER_LOCKED = "MEMBER_LOCKED",
  ACCOUNT_OPENING_IS_REVIEWING = "ACCOUNT_OPENING_IS_REVIEWING",
  ACCOUNT_OPENING_IS_DECLINED = "ACCOUNT_OPENING_IS_DECLINED",
  LOGIN_ERROR = "LOGIN_ERROR",
  ACCOUNT_CLOSED = "ACCOUNT_CLOSED",
  ACCOUNT_EMERGENTLY_CLOSED = "ACCOUNT_EMERGENTLY_CLOSED",
}

type MembershipErrorCode = ApiErrorCode<Category>;

const membershipErrorCodes: MembershipErrorCode = {
  [Category.ALL_IN_ONE]: {
    [AllInOneErrorCode.CUSTOMER_INFO_NOT_FOUND]: {
      content: "查無使用者資料，請聯繫客服",
    },
  },
  [Category.LOGIN]: {
    [LoginErrorCode.CONTINUOUSLY_LOGIN_ERROR_1_TIMES]: {
      title: "密碼錯誤累積 1 次",
      content:
        "為保障網路交易安全，若輸入錯誤超過5\n次，本行將暫停帳號使用權限",
    },
    [LoginErrorCode.CONTINUOUSLY_LOGIN_ERROR_2_TIMES]: {
      title: "密碼錯誤累積 2 次",
      content:
        "為保障網路交易安全，若輸入錯誤超過5\n次，本行將暫停帳號使用權限",
    },
    [LoginErrorCode.CONTINUOUSLY_LOGIN_ERROR_3_TIMES]: {
      title: "密碼錯誤累積 3 次",
      content:
        "為保障網路交易安全，若輸入錯誤超過5\n次，本行將暫停帳號使用權限",
    },
    [LoginErrorCode.CONTINUOUSLY_LOGIN_ERROR_4_TIMES]: {
      title: "密碼錯誤累積 4 次",
      content:
        "為保障網路交易安全，若輸入錯誤超過5\n次，本行將暫停帳號使用權限",
    },
    [LoginErrorCode.CONTINUOUSLY_LOGIN_ERROR_5_TIMES]: {
      content: "帳號已鎖定",
    },
    [LoginErrorCode.ABNORMAL_LOGOUT]: {
      content: "你未正常登出，是否現在登入",
    },
    [LoginErrorCode.MEMBER_LOCKED]: {
      title: "帳號已被鎖定",
      content:
        "由於已連續5次輸入無效的使用者代號或\n密碼，帳號已暫時被鎖定，若要解鎖，請\n至「忘記代號/密碼」重新設定",
    },
    [LoginErrorCode.ACCOUNT_OPENING_IS_REVIEWING]: {
      title: "再等一下！",
      content:
        "我們正在確認你的開戶資料。\n\n你準備的開戶申請資料都在細心確認中，\n\n我們也很期待很快有你在將來！",
    },
    [LoginErrorCode.ACCOUNT_OPENING_IS_DECLINED]: {
      title: "太可惜了...",
      content: "因為種種原因，我們還不能一起當將來的夥伴",
    },
    [LoginErrorCode.LOGIN_ERROR]: {
      content:
        "使用者代號密碼錯誤或此帳號不存在，\n提醒若密碼輸入錯誤5次，帳號將鎖定無法使用",
      title: "請確認使用者代號與密碼",
    },
    [LoginErrorCode.ACCOUNT_CLOSED]: {
      content:
        "使用者代號密碼錯誤或此帳號不存在，\n提醒若密碼輸入錯誤5次，帳號將鎖定無法使用",
      title: "請確認使用者代號與密碼",
    },
    [LoginErrorCode.ACCOUNT_EMERGENTLY_CLOSED]: {
      content:
        "使用者代號密碼錯誤或此帳號不存在，\n提醒若密碼輸入錯誤5次，帳號將鎖定無法使用",
      title: "請確認使用者代號與密碼",
    },
  },
};

export default membershipErrorCodes;
