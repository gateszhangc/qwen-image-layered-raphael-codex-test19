import GoogleAnalytics from "./google-analytics";
import OpenPanelAnalytics from "./open-panel";
import Plausible from "./plausible";
import ClarityAnalytics from "./clarity";

export default function Analytics() {
  return (
    <>
      <OpenPanelAnalytics />
      <GoogleAnalytics />
      <Plausible />
      <ClarityAnalytics />
    </>
  );
}
