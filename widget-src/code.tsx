const { widget } = figma
const { Frame } = widget

function Widget() {
  return <Frame width={100} height={100} fill={'#C4C4C4'}></Frame>
}

widget.register(Widget)
