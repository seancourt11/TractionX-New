// Category-level product photography used when a specific SKU photo isn't on file yet.
import fabricTube from "@/assets/portable/fabric-tube-display.jpg";
import snapFrame from "@/assets/portable/snap-frame-poster-stand.jpg";
import ledLight from "@/assets/portable/led-booth-light.jpg";
import slatwall from "@/assets/portable/slatwall-shelving.jpg";
import shippingCase from "@/assets/portable/shipping-case.jpg";
import outdoorFurniture from "@/assets/portable/outdoor-furniture.jpg";
import sanitizer from "@/assets/portable/sanitizer-stand.jpg";
import bannerStand from "@/assets/portable/banner-stand.jpg";
import hangingBanner from "@/assets/portable/hanging-banner.jpg";
import stepAndRepeat from "@/assets/portable/step-and-repeat.jpg";
import tableCover from "@/assets/portable/table-cover.jpg";
import counter from "@/assets/portable/counter-kiosk.jpg";
import outdoorFlag from "@/assets/portable/outdoor-flag.jpg";

export const PORTABLE_CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "fabric-tube-displays": fabricTube,
  "snap-frames-poster-displays": snapFrame,
  "led-display-lighting": ledLight,
  "retail-slatwall-displays": slatwall,
  "display-cases-tent-frames": shippingCase,
  "outdoor-furniture-umbrellas": outdoorFurniture,
  "sanitizer-hygiene-stands": sanitizer,
  "banner-stands": bannerStand,
  "hanging-banners-towers": hangingBanner,
  "step-and-repeat-backdrops": stepAndRepeat,
  "table-covers": tableCover,
  "trade-show-counters": counter,
  "outdoor-flags-signage": outdoorFlag,
  "tension-fabric-displays": fabricTube,
  "backlit-lightbox-displays": fabricTube,
  "pop-up-displays": stepAndRepeat,
  "tablet-literature-stands": snapFrame,
  "private-enclosures": stepAndRepeat,
  "event-tents-canopies": outdoorFurniture,
  "inflatable-branding": outdoorFurniture,
};
