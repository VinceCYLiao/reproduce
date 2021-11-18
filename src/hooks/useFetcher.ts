import { useAlertAction } from "@/store/dialog";
import { loginState } from "@/store/membership";
import { HttpRequest, NCBError, NCBResponse } from "@/utils/client";
import { AxiosPromise } from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";

enum AcstknErrorCode {
  ACCESS_TOKEN_INVALID = "ACCESS_TOKEN_INVALID",
  ERROR_ACSTKN_ERROR = "ERROR_ACSTKN_ERROR",
}

type ThenValueArg<T> = T extends AxiosPromise<NCBResponse<infer U>> ? U : T;

type ThenErrorArg<T> = T extends AxiosPromise<NCBResponse<any, infer U>>
  ? U
  : T;

type FetcherRes<T extends HttpRequest> = {
  data: ReturnType<T> | unknown;
  error: NCBError<ThenErrorArg<ReturnType<T>>> | unknown;
  success: boolean;
  fail: boolean;
  loading: boolean;
  autoFetcher: (params?: Parameters<T>[0]["params"]) => void;
  fetcher: (
    params?: Parameters<T>[0]["params"],
  ) => Promise<void | NCBResponse<
    ThenValueArg<ReturnType<T>>,
    ThenErrorArg<ReturnType<T>>
  >>;
};

type UseFetcher = <T extends HttpRequest>(
  asyncFunction: T,
  auto?: boolean,
) => FetcherRes<T>;

export enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

const isAcstknError = (errorCode: string) =>
  errorCode === AcstknErrorCode.ACCESS_TOKEN_INVALID ||
  errorCode === AcstknErrorCode.ERROR_ACSTKN_ERROR;

const useFetcher: UseFetcher = asyncFunction => {
  const openAlert = useAlertAction();
  const router = useRouter();
  const isWebview = router.pathname.includes("/webview/");
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
  const [status, setStatus] = useState(Status.IDLE);
  const recoilLoginState = useRecoilValue(loginState);
  const acstkn = recoilLoginState?.acstkn;

  // TODO: 待確認詳細規格，目前照搬無障礙
  const handleServerError = useCallback(() => {
    if (!isWebview) {
      openAlert({
        title: "伺服器沒有回應，請稍後再試",
      });
    }
  }, [isWebview, openAlert]);

  // TODO: 待確認詳細規格，目前照搬無障礙
  // TODO: 登出要打logout api
  const handleAcstknError = useCallback(
    (errorCode: string) => {
      switch (errorCode) {
        case AcstknErrorCode.ACCESS_TOKEN_INVALID:
          openAlert({
            title: "你已被登出",
            content: "目前登入資訊失效，請重新登入",
            onConfirm: () => {
              window.location.href = "/login";
            },
          });
          break;
        case AcstknErrorCode.ERROR_ACSTKN_ERROR:
          openAlert({
            content: "閒置過久或已從其他裝置登入。",
            onConfirm: () => {
              window.location.href = "/login";
            },
          });
          break;
        default:
      }
    },
    [openAlert],
  );

  // use this function if handle response data/status in page is desired
  const fetcher = useCallback(
    async (params: unknown) =>
      asyncFunction({ params, acstkn })
        .then(res => {
          if (res.data.success === false) {
            const {
              data: {
                error: { errorCode },
              },
            } = res;

            if (isAcstknError(errorCode) && !isWebview) {
              handleAcstknError(errorCode);
            }
          }
          return res.data;
        })
        .catch(() => {
          // status code = 4xx or 5xx
          // server fail
          handleServerError();
        }),
    [acstkn, asyncFunction, handleAcstknError, handleServerError, isWebview],
  );

  // otherwise use this function and retrieve api response from returned {data/error/status}
  const autoFetcher = useCallback(
    async (params: unknown) => {
      setStatus(Status.LOADING);
      const res = await asyncFunction({ params, acstkn });

      if (res && res.statusText === "OK") {
        const {
          data: { success, error: resError, data: resData },
        } = res;
        if (success) {
          setStatus(Status.SUCCESS);
          setData(resData);
          return;
        }
        if (!success) {
          if (isAcstknError(resError.errorCode) && !isWebview) {
            handleAcstknError(resError.errorCode);
          }
          setStatus(Status.FAIL);
          setError(resError);
          return;
        }
      }
      // status code = 4xx or 5xx
      // server fail
      handleServerError();
    },
    [acstkn, asyncFunction, handleAcstknError, handleServerError, isWebview],
  );

  const success = status === Status.SUCCESS;
  const fail = status === Status.FAIL;
  const loading = status === Status.LOADING;

  return { data, error, success, fail, loading, fetcher, autoFetcher };
};

export default useFetcher;
