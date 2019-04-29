import * as React from 'react';
import { stringify } from 'qs';
import PropTypes from 'prop-types';

function buildURL(url, params) {
  if (params == null) return url;

  const serializedParams = stringify(params);
  if (!serializedParams) return url;

  return `${url}${url.indexOf('?') < 0 ? '?' : '&'}${serializedParams}`;
}

class OauthButton extends React.Component {
  render() {
    const {
      authorizeUrl,
      clientId,
      redirectUri,
      state,
      args,
      render,
      component,
      children,
    } = this.props;

    const url = buildURL(`${authorizeUrl}`, {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state: state ? JSON.stringify(state) : undefined,
      ...(args || {}),
    });

    if (component != null) {
      return React.createElement(component, { url });
    }

    if (render != null) {
      return render({ url });
    }

    if (children != null) {
      React.Children.only(children);
      return children({ url });
    }

    return null;
  }
}

OauthButton.propTypes = {
  authorizeUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
  state: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
    ]),
  ),
  args: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
    ]),
  ),
  render: PropTypes.func,
  component: PropTypes.element,
  children: PropTypes.func,
};

OauthButton.defaultProps = {
  state: null,
  args: null,
  render: null,
  component: null,
  children: null,
};

export default OauthButton;
