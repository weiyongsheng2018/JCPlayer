import React from 'react'
import { Tooltip } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import AppSideMenus from './side-menus.json'
import './app-sidebar.less'

interface SideMenuItem {
  key: string
  href: string
  title: string
  icon: string
}

interface State {
  activeMenuKey: string
}
const { remote } = window.require('electron')
const win = remote.getCurrentWindow()
export class AppSidebar extends React.Component<{}, State> {
  state: State = {
    activeMenuKey: AppSideMenus[0]?.key,
  }

  componentDidMount() {
    window.addEventListener('router_update', (e: any) => {
      const routeProps: PageProps = e.detail
      this.setState({ activeMenuKey: routeProps.name })
    })
  }
  exit() {
    win.close()
  }
  exitIcon = (
    <Tooltip key={uuidv4()} overlayClassName="side-menu-item-tooltip" placement="right" title="Exit">
      <a className="side-menu-item fs-24 ri-picture-in-picture-exit-fill" onClick={this.exit.bind(this)}></a>
    </Tooltip>
  )
  render() {
    return (
      <div className="app-sidebar">
        <div className="mt-24 flex center app-sidebar-header">
          <img width="50" src={$tools.APP_SVG} className="svg-image" />

          {/* <embed  width="40" src={$tools.APP_SVG} type="image/svg+xml" /> */}
        </div>

        <div className="flex column side-menu">
          {AppSideMenus.map(this.renderMenuItem)}
          {process.platform == 'win32' ? this.exitIcon : ''}
        </div>

        {/* <img src={$tools.CAT_GIF} width="80" style={{ position: 'fixed', bottom: '0', paddingLeft: '-1' }} /> */}
      </div>
    )
  }

  renderMenuItem = ({ key, icon, title, href }: SideMenuItem) => {
    const { activeMenuKey } = this.state
    const isActive = activeMenuKey === key
    // const iconProps: IconProps = { type: icon, className: 'fs-24' }
    // if (activeMenuKey === key) {
    //   iconProps.theme = 'filled'
    //   iconProps.style = { color: '#fff' }
    // }
    return (
      <Tooltip key={key} overlayClassName="side-menu-item-tooltip" placement="right" title={title}>
        <a
          className={`side-menu-item fs-24 ri-${icon}-${isActive ? 'fill' : 'line'}`}
          style={{ color: isActive ? '#fff' : '' }}
          href={href}
        ></a>
      </Tooltip>
    )
  }
} // class AppSidebar end
