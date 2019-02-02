import Badge from "../components/global/Badge";
import BaseAlert from "../components/global/BaseAlert";
import BaseButton from "../components/global/BaseButton";
import BaseCheckbox from "../components/global/BaseCheckbox";
import BaseInput from "../components/global/BaseInput";
import BasePagination from "../components/global/BasePagination";
import BaseProgress from "../components/global/BaseProgress";
import BaseRadio from "../components/global/BaseRadio";
import BaseSlider from "../components/global/BaseSlider";
import BaseSwitch from "../components/global/BaseSwitch";
import Card from "../components/global/Card";
import Icon from "../components/global/Icon";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Icon.name, Icon);
  }
};
