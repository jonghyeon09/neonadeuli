interface HeritageItem {
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
  imageUrl?: string;
}

interface HeritageList {
  item: HeritageItem[];
  totalCnt: number[];
  pageUnit: number[];
  pageIndex: number[];
}

interface HeritageDetailItem {
  ccmaName: string[];
  gcodeName: string[];
  bcodeName: string[];
  mcodeName: string[];
  scodeName: string[];
  ccbaQuan: string[];
  ccbaAsdt: string[];
  ccbaLcad: string[];
  ccceName: string[];
  ccbaPoss: string[];
  ccbaAdmin: string[];
  imageUrl: string[];
  content: string[];
  ccbaMnm1: string[];
  ccbaMnm2: string[];
}

interface HeritageDetail {
  item: HeritageDetailItem[];
  ccbaAsno: string[];
  ccbaCpno: string[];
  ccbaCtcd: string[];
  ccbaKdcd: string[];
  latitude: string[];
  longitude: string[];
}
