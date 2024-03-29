import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import getPageTitle from '@/utils/getPageTitle';
import sty from './login.less';
const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019
  </Fragment>
);

class UserLayout extends Component {
  state = {
    type:null
  }
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  
  }
  static getDerivedStateFromProps(newProps, prevState){
    return {
      type:newProps.location.pathname
    }
  }
  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    const { type } = this.state;
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <div className={styles.lang}>
          
          </div>
        {type==='/user/register'?(
        <div>
          {children}
        </div>):(
          <div className={sty.login}>
            <div className={sty.login_l}></div>
            <div className={sty.login_r}>
              {children}
            </div>
          </div>
        )}
          

          {/* <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title} />
                </Link>
              </div>
           
            </div>
            {children}
          </div> */}
          {/* <GlobalFooter copyright={copyright} /> */}
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
