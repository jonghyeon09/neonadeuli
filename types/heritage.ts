interface HeritageItem {
  item: {
    sn: number[];
    no: number[];
    ccmaName: string[];
    ccbaMnm1: string[];
    ccbaMnm2: string[];
    ccbaCtcdNm: string[];
    ccsiName: string[];
    ccbaAdmin: string[];
    ccbaKdcd: string[];
    ccbaCtcd: string[];
    ccbaAsno: string[];
    ccbaCncl: string[];
    ccbaCpno: string[];
    longitude: string[];
    latitude: string[];
    regDt: string[];
  };
}

interface HeritageList {
  item: HeritageItem[];
  totalCnt: number[];
  pageUnit: number[];
  pageIndex: number[];
}
