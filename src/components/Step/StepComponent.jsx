import { Steps } from "antd";

const StepComponent = ({ current = 1, items = [] }) => {
  return <Steps current={current} items={items} />;
};

export default StepComponent;
