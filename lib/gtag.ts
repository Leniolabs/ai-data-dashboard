interface IOptionsGA {
  measurementId: string;
  nonce?: string;
  gtagUrl?: string;
}
interface IGA {
  initialize: (options?: string | IOptionsGA) => void;
  // TODO: Improve the arguments type
  report: (...args: any[]) => void;
}

const gtag = (...args: any[]) => {
  if (typeof window === "undefined") return;
  if (typeof (window as any)?.gtag === "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function gtag() {
      (window as any).dataLayer.push(arguments);
    };
  }

  (window as any).gtag(...args);
};

class GA implements IGA {
  private _hasLoadedGA: boolean;
  private _isInitialized: boolean;
  constructor() {
    this._isInitialized = false;
    this._hasLoadedGA = false;
  }

  private _loadGA = (
    GA_ID: string,
    nonce?: string,
    gtagUrl: string = "https://www.googletagmanager.com/gtag/js"
  ) => {
    if (this._hasLoadedGA) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `${gtagUrl}?id=${GA_ID}`;
    if (nonce) {
      script.setAttribute("nonce", nonce);
    }
    document.body.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function gtag() {
      (window as any).dataLayer.push(arguments);
    };
    this._hasLoadedGA = true;
  };
  initialize = (options?: string | IOptionsGA) => {
    if (typeof window === "undefined") return;
    if (this._isInitialized) return;

    let GA_ID = "";
    let nonce: string | undefined = undefined;
    let gtagUrl: string | undefined = undefined;

    if (typeof options === "string") {
      GA_ID = options;
    }

    if (typeof options === "object") {
      GA_ID = options.measurementId;
      nonce = options.nonce;
      gtagUrl = options.gtagUrl;
    }

    if (!GA_ID) {
      console.error(
        "The measurement ID is required. You should find more info on https://developers.google.com/analytics/devguides/collection/ga4"
      );
    }
    this._loadGA(GA_ID, nonce, gtagUrl);
    gtag("js", new Date());
    gtag("config", GA_ID);

    this._isInitialized = true;
  };
  // https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag
  report = (...args: any[]) => {
    gtag(...args);
  };
}

export default new GA();
