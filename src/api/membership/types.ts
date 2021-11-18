export type LoginDataProps = {
  acstkn: string;
  addnDocNeeded?: boolean;
  deviceStatus?: string;
  expiresAt?: number;
  idgateId?: string;
  isEmailVerified?: boolean;
  isSetPinCode?: boolean;
};

export type LoginReqProps = {
  identity: string;
  idgateId?: string;
  isAbnormalLogout?: boolean;
  passwd: string;
  userId: string;
};

export type AllInOneDataProps = {
  idNo: string;
  cifNo: string;
  mainAccount: {
    arrangementId: string;
    accountId: string;
    accountName: string;
    accountAdditionalName: string;
    accountCurrency: string;
    productName: string;
    displayName: string;
    lockAmount: number;
    workingBalance: number;
    onlineActualBalance: number;
    availableBalance: number;
    digitalLevel: string;
  };
  customerInfo: {
    englishName: string;
    chineseName: string;
    gender: string;
    birthDay: string;
    nationality: string;
    contactInfo: {
      mobile: string;
      email: string;
    };
    mailingAddress: {
      addressZip: string;
      street: string;
      address: string;
      townCounty: string;
      country: string;
    };
    residentAddress: {
      addressZip: string;
      street: string;
      address: string;
      townCounty: string;
      country: string;
    };
    digitalAccountVerify: string;
    cardSkin: string;
  };
  accountStatuses: Array<number>;
  accountPrivileges: [
    {
      code: "LOGIN";
      enabled: boolean;
    },
    {
      code: "QUERY";
      enabled: boolean;
    },
    {
      code: "TRANSFER_IN";
      enabled: boolean;
    },
    {
      code: "TRANSFER_OUT";
      enabled: boolean;
    },
    {
      code: "CREATE_POCKET";
      enabled: boolean;
    },
    {
      code: "DEMAND_DEPOSIT_POCKET";
      enabled: boolean;
    },
    {
      code: "TIME_DEPOSIT_POCKET";
      enabled: boolean;
    },
    {
      code: "LOAN";
      enabled: boolean;
    },
    {
      code: "CREATE_FOREIGN_ACCOUNT";
      enabled: boolean;
    },
    {
      code: "CARD";
      enabled: boolean;
    },
    {
      code: "ACCOUNT_UPGRADE";
      enabled: boolean;
    },
    {
      code: "DEDUCT_POINT";
      enabled: boolean;
    },
    {
      code: "GIVE_POINT";
      enabled: boolean;
    },
  ];
};
