import { Drawer } from "antd"

const DrawerComponent = ({title = "Drawer", isOpen = false ,children,...rest}) => {
  return (
    <Drawer title={title} open={isOpen} {...rest}>
        {children}
    </Drawer>
  )
}

export default DrawerComponent